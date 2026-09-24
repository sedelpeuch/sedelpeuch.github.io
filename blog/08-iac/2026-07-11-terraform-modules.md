---
title: "Terraform : modules"
description: "Factoriser et réutiliser de la configuration Terraform avec les modules locaux et le registry public. Structure, inputs, outputs, sources et quand ne pas créer un module."
series: terraform
tags: [iac, devops]
---

Une configuration Terraform qui grandit accumule des ressources dans `main.tf` jusqu'à ce que le fichier devienne difficile à lire et à modifier. Réseau, base de données, stockage, IAM coexistent dans le même fichier sans séparation claire. Les modules permettent de découper cette configuration en blocs autonomes, réutilisables entre environnements et projets.

<!--truncate-->

## Ce qu'un module résout

Un module est un répertoire de fichiers `.tf` qui expose une interface : des variables en entrée, des outputs en sortie, et une implémentation interne que les appelants n'ont pas à connaître. L'appelant déclare un bloc `module`, passe les valeurs requises, et récupère les outputs produits.

La motivation principale n'est pas la réduction de code : c'est la séparation des responsabilités et la réutilisation. Deux environnements (dev et prod) qui ont besoin du même réseau VPC peuvent appeler le même module avec des paramètres différents plutôt que de dupliquer la configuration. Une équipe réseau peut livrer un module VPC validé que les équipes applicatives consomment sans comprendre les détails de l'implémentation.

## Structure d'un module

Un module est simplement un répertoire contenant des fichiers `.tf`. Par convention :

```text
modules/
└── network/
    ├── main.tf        # ressources du module
    ├── variables.tf   # inputs déclarés
    └── outputs.tf     # valeurs exposées aux appelants
```

Il n'y a pas de fichier spécial qui déclare qu'un répertoire est un module. Tout répertoire contenant des fichiers `.tf` peut être appelé comme module ; la configuration dans laquelle `terraform` est exécuté est elle-même le *module racine*.

Un module réutilisable ne contient pas de bloc `provider` : il hérite de la configuration du provider définie dans le module racine. Il déclare en revanche les providers dont il a besoin et les versions qu'il supporte, dans un bloc `terraform { required_providers { ... } }` (souvent dans un fichier `versions.tf`), pour que Terraform puisse vérifier la compatibilité avec la version choisie par l'appelant.

### variables.tf : définir l'interface d'entrée

Les variables du module décrivent ce dont il a besoin pour fonctionner. Elles ne doivent exposer que les paramètres qui varient légitimement entre les appelants. Les valeurs internes qui ne changent jamais restent codées dans `main.tf`.

```hcl
# modules/network/variables.tf
variable "vpc_cidr" {
  description = "Plage CIDR du VPC"
  type        = string
}

variable "project" {
  description = "Nom du projet, utilisé dans les tags"
  type        = string
}

variable "subnets" {
  description = "Map des subnets à créer : nom => { cidr, az_index }"
  type = map(object({
    cidr     = string
    az_index = number
  }))
}
```

### main.tf : l'implémentation

Le `main.tf` du module utilise `var.<nom>` pour accéder aux inputs, exactement comme dans une configuration racine :

```hcl
# modules/network/main.tf
data "aws_availability_zones" "available" {}

resource "aws_vpc" "this" {
  cidr_block = var.vpc_cidr
  tags = {
    Name    = "${var.project}-vpc"
    Project = var.project
  }
}

resource "aws_subnet" "this" {
  for_each = var.subnets

  vpc_id            = aws_vpc.this.id
  cidr_block        = each.value.cidr
  availability_zone = data.aws_availability_zones.available.names[each.value.az_index]

  tags = {
    Name    = "${var.project}-subnet-${each.key}"
    Project = var.project
  }
}
```

Le nom local `this` est une convention pour la ressource principale d'un module. Il évite la redondance (`aws_vpc.network` dans un module qui s'appelle déjà `network`).

### outputs.tf : exposer les résultats

Les outputs sont l'interface de sortie du module. Ils exposent uniquement ce que les appelants ont besoin de savoir : les IDs des ressources créées, pas les détails internes.

```hcl
# modules/network/outputs.tf
output "vpc_id" {
  description = "ID du VPC créé"
  value       = aws_vpc.this.id
}

output "subnet_ids" {
  description = "Map des IDs de subnets : nom => ID"
  value       = { for k, s in aws_subnet.this : k => s.id }
}
```

## Appeler un module

Un module local s'appelle avec `source = "./modules/network"` (chemin relatif depuis la configuration racine) :

```hcl
# main.tf (configuration racine)
module "network" {
  source = "./modules/network"

  vpc_cidr = "10.0.0.0/16"
  project  = var.project
  subnets = {
    public    = { cidr = "10.0.1.0/24", az_index = 0 }
    private_a = { cidr = "10.0.2.0/24", az_index = 0 }
    private_b = { cidr = "10.0.3.0/24", az_index = 1 }
  }
}
```

Les outputs du module sont accessibles via `module.<nom>.<output>` :

```hcl
resource "aws_db_subnet_group" "main" {
  name = "${var.project}-db-subnet-group"
  subnet_ids = [
    module.network.subnet_ids["private_a"],
    module.network.subnet_ids["private_b"],   # RDS exige au moins deux AZ
  ]
}
```

Seuls les outputs sont visibles de l'extérieur : `module.network.aws_vpc.this` n'est pas une référence valide depuis le module racine. Dans le state, les ressources du module sont adressées avec leur préfixe, par exemple `module.network.aws_subnet.this["private_a"]`.

Après l'ajout d'un module, `terraform init` doit être relancé pour que Terraform installe les sources du module dans `.terraform/modules/` (pour un module local, il enregistre simplement son chemin) :

```bash
terraform init
```

## Réutiliser le même module pour plusieurs environnements

L'intérêt principal se manifeste quand plusieurs environnements ont besoin du même réseau. Sans module, dev et prod auraient deux copies quasi-identiques de la configuration réseau. Avec un module, ils appellent le même code avec des paramètres différents :

```hcl
# env/dev/main.tf
module "network" {
  source   = "../../modules/network"
  vpc_cidr = "10.0.0.0/16"
  project  = "mon-projet-dev"
  subnets  = { /* ... */ }
}

# env/prod/main.tf
module "network" {
  source   = "../../modules/network"
  vpc_cidr = "10.1.0.0/16"
  project  = "mon-projet-prod"
  subnets  = { /* ... */ }
}
```

Avec une source locale, un correctif appliqué au module réseau se propage aux deux environnements au prochain `apply` de chacun, y compris une éventuelle régression. Une source versionnée (tag Git ou version du registry) permet au contraire de valider une nouvelle version du module en dev avant de modifier la référence de la prod. L'article [multi-environnements](./2026-07-19-terraform-multi-environnements.md) détaille cette organisation par répertoires.

## Sources de modules

`source` accepte plusieurs formats selon l'origine du module.

**Chemin local** : un répertoire relatif sur le disque. Pas de versioning, modifications immédiates.

```hcl
source = "./modules/network"
source = "../shared-modules/vpc"
```

**Terraform Registry** : les modules publiés sur `registry.terraform.io`. Le format est `<namespace>/<module>/<provider>`, avec un attribut `version` facultatif mais indispensable en pratique : sans lui, chaque `terraform init -upgrade` peut installer une nouvelle version majeure.

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 6.0"

  name = "mon-vpc"
  cidr = "10.0.0.0/16"
  azs  = ["eu-west-3a", "eu-west-3b", "eu-west-3c"]

  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
}
```

`~> 6.0` signifie « toute version >= 6.0 et < 7.0 ». C'est la contrainte de version la plus courante : elle accepte les versions mineures et correctives, censées rester compatibles selon le versionnement sémantique, mais pas les versions majeures qui peuvent casser l'interface. `~> 6.0.0` restreindrait aux seules versions correctives (6.0.x). La version majeure 6 de ce module accompagne la version 6 du provider AWS ; les versions de module et de provider doivent être choisies ensemble.

**Git** : pour des modules internes hébergés dans un dépôt privé.

```hcl
source = "git::https://github.com/mon-org/terraform-modules.git//modules/network?ref=v1.2.0"
```

Le double slash `//` sépare l'URL du dépôt du chemin dans le dépôt. `ref` fixe le tag, la branche ou le commit. L'attribut `version` ne s'applique pas aux sources Git : seul `ref` fixe la révision, et un tag reste modifiable par les mainteneurs du dépôt, contrairement à un SHA de commit.

## Déplacer des ressources existantes dans un module

Extraire des ressources existantes du module racine vers un module change leur adresse dans le state (`aws_vpc.main` devient `module.network.aws_vpc.this`). Sans précaution, Terraform planifie la destruction de l'ancienne adresse et la création de la nouvelle, c'est-à-dire le remplacement du VPC. Un bloc `moved` déclare la correspondance :

```hcl
moved {
  from = aws_vpc.main
  to   = module.network.aws_vpc.this
}

moved {
  from = aws_subnet.private_a
  to   = module.network.aws_subnet.this["private_a"]   # une instance précise du for_each
}
```

Le plan indique alors `has moved to` au lieu d'une destruction ; une fois appliqué, le bloc `moved` peut rester dans le code pour les autres copies de la configuration qui n'ont pas encore été migrées.

## Quand ne pas créer un module

Un module introduit une indirection : pour comprendre ce qu'une configuration fait, il faut naviguer dans le répertoire du module. Cette complexité est justifiée quand le module est réutilisé ou quand il masque une implémentation complexe. Elle ne l'est pas pour une ressource utilisée une seule fois dans un seul endroit.

Deux signaux qui indiquent qu'un module est prématuré :

**Une seule instance.** Si le module n'est appelé qu'une fois dans toute la codebase, la factorisation n'apporte rien. La configuration directe dans `main.tf` est plus lisible.

**Un module avec une seule ressource.** Encapsuler `aws_vpc` seul dans un module n'ajoute pas de valeur. Un module utile regroupe plusieurs ressources qui ont un sens ensemble : VPC + subnets + route tables + internet gateway forment un réseau : c'est un module cohérent.

La règle pratique : créer un module quand il sera appelé au moins deux fois, ou quand il regroupe un ensemble de ressources suffisamment complexe pour mériter une interface documentée.

## Récapitulatif

| Concept | Rôle |
|---------|------|
| `variables.tf` | Interface d'entrée : ce que l'appelant doit fournir |
| `outputs.tf` | Interface de sortie : ce que l'appelant peut consommer |
| `source = "./modules/x"` | Module local (chemin relatif) |
| `source = "namespace/module/provider"` | Module du registry public |
| `version = "~> x.y"` | Contrainte de version pour les modules registry |
| `module.<nom>.<output>` | Accéder aux outputs d'un module depuis la racine |
