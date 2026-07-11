---
title: "Terraform : state remote avec S3"
description: "Stocker le state Terraform dans S3 et verrouiller les exécutions concurrentes avec use_lockfile : pourquoi le state local ne suffit pas en équipe ou en CI/CD, et comment migrer."
tags: [iac, devops]
---

Le fichier `terraform.tfstate` est la mémoire de Terraform. Il contient l'état réel de l'infrastructure telle que Terraform la connaît : identifiants, ARN, attributs de chaque ressource créée. Sans lui, Terraform ne sait plus ce qu'il a créé et tenterait de tout recréer depuis zéro. Stocker ce fichier localement fonctionne pour un développeur seul, mais pose des problèmes structurels dès qu'une équipe ou un pipeline CI/CD entre en jeu.

<!--truncate-->

## Les problèmes du state local

**Pas de partage.** Le state local vit sur le disque de la machine qui a lancé `terraform apply`. Un second développeur qui travaille depuis une autre machine n'a pas accès à cet état. Son prochain `plan` compare la configuration avec un state vide et planifie de recréer toutes les ressources qui existent déjà.

**Pas de verrouillage.** Deux exécutions simultanées de `terraform apply` (deux développeurs, deux jobs CI) écrivent dans le même state sans coordination. Le résultat est une corruption : le state final reflète une version partielle des deux exécutions, et l'infrastructure réelle n'est plus alignée avec ce que Terraform croit avoir créé.

**Des données sensibles en clair dans Git.** Le state contient les valeurs réelles de tous les attributs, y compris ceux marqués `sensitive` dans la configuration. Commiter `terraform.tfstate` dans Git expose les mots de passe, les clés d'API et les ARN dans l'historique, y compris après suppression du fichier.

Le backend remote résout les trois problèmes : le state est stocké dans un emplacement partagé, accessible à tous, avec un mécanisme de verrouillage pour éviter les exécutions simultanées.

## Le backend S3

AWS S3 est le backend remote standard pour les configurations Terraform qui ciblent AWS. Le state y est stocké comme un objet, versionné et chiffré. La configuration se déclare dans le bloc `terraform` :

```hcl
terraform {
  backend "s3" {
    bucket       = "mon-projet-tfstate"
    key          = "prod/terraform.tfstate"
    region       = "eu-west-3"
    encrypt      = true
    use_lockfile = true
  }
}
```

- `bucket` : nom du bucket S3 qui stocke le state. Ce bucket doit exister avant que `terraform init` soit lancé.
- `key` : chemin de l'objet dans le bucket. Plusieurs configurations peuvent coexister dans le même bucket si elles utilisent des `key` distincts (`infra/network.tfstate`, `infra/database.tfstate`, `app/prod.tfstate`).
- `encrypt = true` : active le chiffrement côté serveur (SSE-S3) sur l'objet. Sans cette option, le state est stocké en clair dans S3.
- `use_lockfile = true` : active le verrouillage natif S3 via un fichier `.tflock` stocké dans le même bucket. Disponible depuis Terraform 1.10.

## Le verrouillage avec use_lockfile

S3 seul ne peut pas verrouiller l'accès à un objet pendant une opération d'écriture. Deux exécutions simultanées de `terraform apply` liraient le même state, calculeraient leurs plans indépendamment, et écriraient leurs states finaux en se chevauchant, le second écrasant le premier.

`use_lockfile = true` résout ce problème sans infrastructure supplémentaire. Terraform crée un fichier `.tflock` dans le même bucket S3, à côté du state, au début de chaque opération. Ce fichier sert de verrou : si une autre exécution détecte le fichier, elle attend ou abandonne avec une erreur explicite. À la fin de l'opération, le fichier est supprimé.

```
Acquiring state lock. This may take a few moments...
```

Avant Terraform 1.10, le verrouillage nécessitait une table DynamoDB dédiée (`dynamodb_table = "terraform-locks"`). `use_lockfile` simplifie le bootstrap en éliminant cette dépendance : un seul bucket S3 suffit.

Si une exécution se termine anormalement sans supprimer le fichier de verrou (crash, interruption réseau), le verrou reste en place. La commande pour le forcer à la main reste la même :

```bash
terraform force-unlock <LOCK_ID>
```

L'ID du verrou est visible dans le message d'erreur que Terraform affiche quand il détecte un verrou existant.

## Migrer d'un state local vers S3

Le bucket S3 doit exister avant de configurer le backend — il peut être créé manuellement via la console AWS ou avec `aws s3 mb s3://mon-projet-tfstate`. Une fois créé, la migration se fait en deux étapes.

**Étape 1 :** Ajouter le bloc `backend` dans la configuration principale :

```hcl
terraform {
  backend "s3" {
    bucket       = "mon-projet-tfstate"
    key          = "prod/terraform.tfstate"
    region       = "eu-west-3"
    encrypt      = true
    use_lockfile = true
  }
}
```

**Étape 2 :** Lancer `terraform init` avec le flag de migration :

```bash
terraform init -migrate-state
```

Terraform détecte que le backend a changé, lit le state local existant, et le copie dans S3. À la fin de l'opération, le fichier local `terraform.tfstate` peut être supprimé : il n'est plus utilisé.

```
Initializing the backend...
Do you want to copy existing state to the new backend?
  Pre-existing state was found while migrating the previous "local" backend to the
  newly configured "s3" backend. No existing state was found in the newly configured
  "s3" backend. Do you want to copy this state to the new backend?

  Enter a value: yes

Successfully configured the backend "s3"!
```

## Configuration partielle avec -backend-config

Coder les valeurs du backend directement dans `main.tf` pose un problème : le nom du bucket ou la région peuvent varier selon l'environnement (dev, staging, prod), mais les backends Terraform ne supportent pas les variables d'input ni les expressions HCL. Seules des valeurs littérales sont acceptées.

La configuration partielle contourne cette limite. Le bloc `backend` dans le code ne contient que les paramètres stables :

```hcl
terraform {
  backend "s3" {}
}
```

Les paramètres variables sont injectés à l'initialisation via un fichier ou des flags :

```bash
# Avec un fichier de configuration par environnement
terraform init -backend-config=env/prod.s3.tfbackend

# Avec des flags directs
terraform init \
  -backend-config="bucket=mon-projet-prod-tfstate" \
  -backend-config="key=prod/terraform.tfstate" \
  -backend-config="region=eu-west-3" \
  -backend-config="use_lockfile=true"
```

```ini
# env/prod.s3.tfbackend
bucket       = "mon-projet-prod-tfstate"
key          = "prod/terraform.tfstate"
region       = "eu-west-3"
encrypt      = true
use_lockfile = true
```

Cette approche est la plus courante en CI/CD : le pipeline injecte les paramètres du backend selon l'environnement cible sans modifier le code Terraform.

## Partager des outputs entre configurations

Une infrastructure réelle est souvent découpée en plusieurs configurations Terraform indépendantes : une pour le réseau (VPC, subnets), une pour la base de données, une pour l'application. La configuration applicative a besoin de l'ID du VPC et des IDs des subnets créés par la configuration réseau.

Le data source `terraform_remote_state` lit les outputs d'une autre configuration depuis son state S3 :

```hcl
data "terraform_remote_state" "network" {
  backend = "s3"
  config = {
    bucket = "mon-projet-tfstate"
    key    = "prod/network.tfstate"
    region = "eu-west-3"
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "main-db-subnet-group"
  subnet_ids = data.terraform_remote_state.network.outputs.private_subnet_ids
}
```

Pour que cela fonctionne, la configuration réseau doit exposer les valeurs via des outputs :

```hcl
# Dans la configuration réseau
output "private_subnet_ids" {
  value = values(aws_subnet.private)[*].id
}
```

`terraform_remote_state` crée un couplage fort entre les deux configurations : si les outputs changent de nom dans la configuration réseau, la configuration applicative casse. Une alternative plus souple est de stocker les valeurs partagées dans AWS SSM Parameter Store ou Secrets Manager, et de les lire avec des data sources AWS standard. Les deux approches coexistent en pratique selon le degré de couplage acceptable.

## Récapitulatif

| Problème | Solution |
|----------|----------|
| State non partagé entre développeurs | Backend S3 |
| Exécutions concurrentes qui corrompent le state | `use_lockfile = true` |
| Données sensibles dans Git | Chiffrement S3 + ne pas commiter le state |
| State perdu suite à une erreur | Versioning S3 |
| Paramètres du backend variables selon l'env | Configuration partielle + `-backend-config` |
| Partager des valeurs entre configurations | `terraform_remote_state` ou SSM Parameter Store |
