---
title: "Terraform : modules"
description: "Factoriser et réutiliser de la configuration Terraform avec les modules locaux et le registry public. Structure, inputs, outputs, sources et quand ne pas créer un module."
tags: [iac, devops]
---

Une configuration Terraform qui grandit accumule des ressources dans `main.tf` jusqu'à ce que le fichier devienne difficile à lire et à modifier. Réseau, base de données, stockage, IAM coexistent dans le même fichier sans séparation claire. Les modules permettent de découper cette configuration en blocs autonomes, réutilisables entre environnements et projets.

<!--truncate-->

## Ce qu'un module résout

Un module est un répertoire de fichiers `.tf` qui expose une interface : des variables en entrée, des outputs en sortie, et une implémentation interne que les appelants n'ont pas à connaître. L'appelant déclare un bloc `module`, passe les valeurs requises, et récupère les outputs produits.

La motivation principale n'est pas la réduction de code : c'est la séparation des responsabilités et la réutilisation. Deux environnements (dev et prod) qui ont besoin du même réseau VPC peuvent appeler le même module avec des paramètres différents plutôt que de dupliquer la configuration. Une équipe réseau peut livrer un module VPC validé que les équipes applicatives consomment sans comprendre les détails de l'implémentation.

## Structure d'un module

Un module est simplement un répertoire contenant des fichiers `.tf`. Par convention :

```
modules/
└── network/
    ├── main.tf        # ressources du module
    ├── variables.tf   # inputs déclarés
    └── outputs.tf     # valeurs exposées aux appelants
```

Il n'y a pas de fichier spécial qui déclare qu'un répertoire est un module. Tout répertoire contenant des fichiers `.tf` peut être appelé comme module.

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
    public  = { cidr = "10.0.1.0/24", az_index = 0 }
    private = { cidr = "10.0.2.0/24", az_index = 1 }
  }
}
```

Les outputs du module sont accessibles via `module.<nom>.<output>` :

```hcl
resource "aws_db_subnet_group" "main" {
  name       = "${var.project}-db-subnet-group"
  subnet_ids = [module.network.subnet_ids["private"]]
}
```

Après l'ajout d'un module, `terraform init` doit être relancé pour que Terraform installe les sources du module dans `.terraform/` :

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
  subnets  = { ... }
}

# env/prod/main.tf
module "network" {
  source   = "../../modules/network"
  vpc_cidr = "10.1.0.0/16"
  project  = "mon-projet-prod"
  subnets  = { ... }
}
```

Un correctif appliqué au module réseau se propage automatiquement aux deux environnements au prochain `apply`.

## Sources de modules

`source` accepte plusieurs formats selon l'origine du module.

**Chemin local** : un répertoire relatif sur le disque. Pas de versioning, modifications immédiates.

```hcl
source = "./modules/network"
source = "../shared-modules/vpc"
```

**Terraform Registry** : les modules publiés sur `registry.terraform.io`. Le format est `<namespace>/<module>/<provider>`, avec un attribut `version` obligatoire pour fixer la version.

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "mon-vpc"
  cidr = "10.0.0.0/16"
  azs  = ["eu-west-3a", "eu-west-3b", "eu-west-3c"]

  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
}
```

`~> 5.0` signifie "toute version >= 5.0 et < 6.0". C'est le contrainte de version recommandée : elle accepte les mises à jour mineures (correctifs) mais pas les versions majeures qui pourraient casser l'interface.

**Git** : pour des modules internes hébergés dans un dépôt privé.

```hcl
source = "git::https://github.com/mon-org/terraform-modules.git//modules/network?ref=v1.2.0"
```

Le double slash `//` sépare l'URL du dépôt du chemin dans le dépôt. `ref` fixe le tag, la branche ou le commit.

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
