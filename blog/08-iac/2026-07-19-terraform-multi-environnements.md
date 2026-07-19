---
title: "Terraform : multi-environnements"
description: "Gérer dev, staging et prod avec Terraform : workspaces natifs vs structuration par répertoires. Avantages, limites, et gestion des variables par environnement."
tags: [iac, devops]
---

Une infrastructure ne reste jamais réduite à un seul environnement. Dev, staging et prod partagent la même architecture (réseau, base de données, application) mais diffèrent sur des paramètres précis : taille des instances, plage CIDR, nombre de réplicas, niveau de logging. Terraform propose deux approches pour gérer cette variation sans dupliquer intégralement la configuration : les workspaces natifs et la structuration par répertoires.

<!--truncate-->

## Le problème

Une configuration Terraform unique produit une infrastructure unique par état (state). Appliquer la même configuration pour dev et prod avec un seul state écraserait l'un avec l'autre : le state ne peut représenter qu'une seule réalité à la fois. Il faut donc autant de states distincts que d'environnements, tout en réutilisant la même définition de ressources.

Deux mécanismes répondent à ce besoin. Les workspaces isolent plusieurs states derrière une seule configuration. La structuration par répertoires duplique l'arborescence des configurations racines, chacune avec son propre state, et fait appel aux mêmes modules pour éviter la duplication du code.

## Workspaces Terraform

Un workspace est un state nommé, isolé des autres workspaces, associé à la même configuration `.tf`. Par défaut, toute configuration a un workspace `default`.

```bash
terraform workspace list
terraform workspace new dev
terraform workspace new prod
terraform workspace select dev
```

Le workspace actif détermine quel state Terraform lit et écrit lors du prochain `plan` ou `apply`. Avec un backend S3, chaque workspace correspond à un chemin distinct sous la même `key`, géré automatiquement par Terraform (`env:/<workspace>/<key>`).

La variable `terraform.workspace` expose le nom du workspace actif à l'intérieur de la configuration. Elle sert à faire varier des valeurs selon l'environnement sans dupliquer les fichiers `.tf` :

```hcl
locals {
  instance_size = {
    dev  = "db.t4g.micro"
    prod = "db.r6g.large"
  }
}

resource "aws_db_instance" "main" {
  instance_class = local.instance_size[terraform.workspace]
  # ...
}
```

### Limites des workspaces

Les workspaces isolent le state, mais pas la configuration : dev et prod exécutent exactement le même code, avec les mêmes providers, les mêmes versions, la même structure de ressources. Toute différence doit passer par des conditions (`terraform.workspace == "prod" ? ... : ...`) ou des maps comme ci-dessus, ce qui devient illisible dès que plusieurs paramètres varient.

Le risque le plus concret est l'erreur humaine : un `terraform apply` lancé sans vérifier le workspace actif applique la configuration au mauvais environnement. `terraform.workspace` est une simple chaîne de caractères dans un fichier de code ; rien n'empêche structurellement de mélanger les credentials AWS de prod avec un workspace `dev` sélectionné par erreur.

Les workspaces conviennent à des variations mineures entre environnements proches (une plage CIDR, une taille d'instance) sur un projet de taille modeste. Ils ne conviennent pas quand les environnements doivent diverger sur leur structure (prod avec Multi-AZ, dev sans) ou quand l'isolation doit être garantie au niveau de l'infrastructure d'exécution (comptes AWS séparés, credentials distincts).

## Structuration par répertoires

L'alternative consiste à donner à chaque environnement son propre répertoire de configuration racine, avec son propre state, ses propres fichiers de variables, et éventuellement son propre backend. Le code partagé (les ressources elles-mêmes) reste factorisé dans des modules, appelés différemment par chaque environnement.

```
.
├── modules/
│   ├── network/
│   └── database/
└── envs/
    ├── dev/
    │   ├── main.tf
    │   ├── backend.tf
    │   └── dev.tfvars
    └── prod/
        ├── main.tf
        ├── backend.tf
        └── prod.tfvars
```

Chaque répertoire est une configuration Terraform indépendante : `terraform init` et `terraform apply` s'y exécutent séparément, avec leur propre state.

Le `backend.tf` ci-dessous code le `bucket` et la `key` en dur pour rester lisible, mais une équipe qui veut éviter de dupliquer ces valeurs peut laisser le backend en configuration partielle (`backend "s3" {}`) et injecter les paramètres à l'init via `-backend-config`. C'est l'approche décrite dans l'article sur le [state remote S3](./2026-07-11-terraform-remote-state.md) ; elle se combine naturellement avec la structuration par répertoires, chaque environnement fournissant son propre fichier `.tfbackend`.

```hcl
# envs/prod/backend.tf
terraform {
  backend "s3" {
    bucket       = "mon-projet-tfstate"
    key          = "prod/terraform.tfstate"
    region       = "eu-west-3"
    encrypt      = true
    use_lockfile = true
  }
}

# envs/prod/main.tf
module "network" {
  source   = "../../modules/network"
  vpc_cidr = "10.1.0.0/16"
  project  = "mon-projet-prod"
}

module "database" {
  source         = "../../modules/database"
  instance_class = "db.r6g.large"
  multi_az       = true
}
```

```hcl
# envs/dev/main.tf
module "network" {
  source   = "../../modules/network"
  vpc_cidr = "10.0.0.0/16"
  project  = "mon-projet-dev"
}

module "database" {
  source         = "../../modules/database"
  instance_class = "db.t4g.micro"
  multi_az       = false
}
```

`prod` peut activer Multi-AZ et `dev` non : la divergence structurelle est possible parce que chaque environnement a son propre `main.tf`, contrairement aux workspaces où toute la configuration est partagée.

Chaque répertoire ayant son propre bloc `provider`, il peut aussi cibler un compte AWS, une région ou un rôle distinct. C'est le mécanisme qui garantit l'isolation d'exécution : `dev` et `prod` ne partagent pas les mêmes credentials.

```hcl
# envs/prod/provider.tf
provider "aws" {
  region  = "eu-west-3"
  profile = "mon-projet-prod"   # profil AWS CLI dédié à la prod
}
```

```hcl
# envs/dev/provider.tf
provider "aws" {
  region  = "eu-west-3"
  profile = "mon-projet-dev"    # compte ou profil distinct
}
```

Avec des workspaces, ce découpage n'est pas possible : le bloc `provider` est unique et partagé par tous les workspaces. Le ciblage du compte devrait passer par une conditionnelle sur `terraform.workspace`, ce qui ramène le risque d'erreur évoqué plus haut.

### Avantages et limites

**Isolation réelle.** Deux répertoires distincts peuvent pointer vers deux comptes AWS différents, deux régions différentes, ou deux versions de provider différentes. Aucune variable globale ne relie les deux environnements : se tromper de répertoire (`cd envs/dev`) est une erreur bien plus visible que sélectionner le mauvais workspace.

**Divergence structurelle possible.** Un environnement peut avoir des ressources que l'autre n'a pas (un WAF en prod, absent en dev) sans conditionnelle dans le code des modules.

**Duplication du code racine.** Chaque `envs/<nom>/main.tf` répète les mêmes appels de modules avec des paramètres différents. Cette duplication reste limitée si les modules concentrent la complexité, mais elle grandit avec le nombre d'environnements. Des outils tiers comme Terragrunt existent spécifiquement pour réduire cette duplication en générant les fichiers racine à partir d'un modèle commun.

**Pas de garantie automatique de cohérence.** Rien n'empêche `envs/dev/main.tf` et `envs/prod/main.tf` de diverger involontairement (un module ajouté dans un environnement et oublié dans l'autre). La discipline de revue de code est nécessaire pour éviter cette dérive.

## Variables par environnement

Que ce soit avec des workspaces ou des répertoires séparés, les valeurs qui varient (taille d'instance, CIDR, nombre de réplicas) se regroupent généralement dans un fichier `.tfvars` par environnement plutôt que d'être codées en dur dans `main.tf`.

```hcl
# envs/prod/prod.tfvars
instance_class = "db.r6g.large"
multi_az       = true
vpc_cidr       = "10.1.0.0/16"
```

```hcl
# envs/dev/dev.tfvars
instance_class = "db.t4g.micro"
multi_az       = false
vpc_cidr       = "10.0.0.0/16"
```

Un fichier `.tfvars` nommé n'est pas chargé automatiquement : Terraform n'auto-charge que `terraform.tfvars` et les fichiers `*.auto.tfvars`. Tout autre fichier doit être passé explicitement à `plan` et `apply` :

```bash
terraform apply -var-file="prod.tfvars"
```

Cette approche fonctionne aussi bien avec des workspaces qu'avec des répertoires séparés. Avec des répertoires, chaque environnement contient son propre `.tfvars`. Avec des workspaces, il n'existe pas de sélection automatique du fichier selon `terraform.workspace` : le bon fichier doit être passé à la main, par exemple `terraform apply -var-file="$(terraform workspace show).tfvars"`. Dans les deux cas, cette approche centralise les valeurs qui changent dans un seul fichier lisible, plutôt que dispersées dans des conditionnelles au milieu du code HCL.

## Comparaison

| Critère | Workspaces | Répertoires séparés |
|---------|-----------|---------------------|
| Isolation du state | Oui | Oui |
| Isolation de la configuration | Non — même code pour tous | Oui — code indépendant par environnement |
| Comptes / credentials AWS distincts | Non — `provider` partagé | Oui — un `provider` par répertoire |
| Divergence structurelle entre environnements | Difficile (conditionnelles) | Native |
| Risque d'erreur (mauvais environnement ciblé) | Élevé (sélection implicite) | Faible (répertoire explicite) |
| Duplication de code | Aucune | Boilerplate racine dupliqué |
| Cas d'usage adapté | Environnements proches, projet modeste | Environnements divergents, production critique |

La structuration par répertoires est l'approche la plus répandue dès qu'un environnement de production est en jeu : l'isolation explicite réduit le risque d'appliquer une modification destinée à dev sur prod, et la possibilité de cibler des comptes AWS distincts limite l'ampleur d'une erreur. Les workspaces couvrent un besoin plus restreint — des environnements éphémères de test (une stack par pull request, par exemple), où la légèreté de `terraform workspace new` compense l'absence de divergence structurelle et le partage des credentials.
