---
title: "Terraform"
description: "Introduction à Terraform sur AWS : structure d'une configuration, variables, outputs, VPC, RDS et intégration CI/CD."
tags: [iac, devops]
---

Terraform est un outil d'Infrastructure as Code qui permet de décrire des ressources cloud sous forme de fichiers de configuration texte, puis de les créer, modifier et supprimer via une séquence de commandes. La configuration décrit un état désiré — quelles ressources doivent exister, avec quels attributs — et Terraform calcule les opérations nécessaires pour atteindre cet état depuis la situation actuelle.

<!--truncate-->

:::info Développement local avec LocalStack
Les exemples de cet article peuvent être testés localement sans compte AWS via [LocalStack](https://localstack.dev/), un serveur qui émule les APIs AWS sur `localhost:4566`. Les outils `tflocal` et `awslocal` sont des wrappers qui redirigent automatiquement vers LocalStack :

```bash
pip install localstack terraform-local awscli-local
localstack start -d
```

Les commandes `tflocal` et `awslocal` remplacent alors `terraform` et `aws` respectivement. Le code Terraform reste identique ; seule la cible change. Note : certains services comme RDS ne sont pas disponibles dans la version gratuite de LocalStack.
:::

## Installation de Terraform

Terraform s'installe depuis le gestionnaire de paquets HashiCorp :

```bash
brew install terraform          # macOS
apt install terraform           # Ubuntu/Debian avec le dépôt HashiCorp
```

## Structure d'un fichier de configuration Terraform

Un fichier Terraform est un fichier texte avec l'extension `.tf`. Il décrit un état désiré de l'infrastructure, non une séquence d'instructions. Terraform calcule lui-même les actions nécessaires pour atteindre cet état.

### Le bloc `terraform`

Le bloc `terraform` définit les contraintes sur le moteur lui-même, notamment la version minimum requise :

```hcl
terraform {
  required_version = ">= 0.12"
}
```

Il peut également déclarer les providers requis et leur version. Maintenir ce bloc à jour garantit que l'infrastructure ne sera pas appliquée avec une version de Terraform incompatible.

### Le bloc `provider`

Le provider est le plugin qui traduit les ressources Terraform en appels API vers un cloud spécifique. Pour AWS, il faut configurer les credentials et, dans le cas de LocalStack, désactiver les validations qui s'appuient sur les serveurs AWS réels :

```hcl
provider "aws" {
  region     = "eu-west-3"
  access_key = "test"
  secret_key = "test"

  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true

  endpoints {
    s3 = "http://localhost:4566"
  }
}
```

Les trois directives `skip_*` désactivent les appels de validation que le provider AWS effectue normalement au démarrage contre les APIs IAM et STS. Sans elles, Terraform tenterait de vérifier les credentials contre les vrais serveurs AWS et échouerait. Le bloc `endpoints` redirige les appels S3 vers LocalStack au lieu d'`s3.amazonaws.com`.

En production, ce bloc ne contient pas de credentials en dur. Terraform les lit depuis les variables d'environnement `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY`, ou depuis le profil AWS configuré localement.

### Le bloc `resource`

Un bloc `resource` déclare une ressource à créer. La syntaxe est `resource "<type>" "<nom_local>"`. Le type détermine le service AWS cible ; le nom local sert uniquement à référencer la ressource depuis d'autres blocs du même fichier `.tf` :

```hcl
resource "aws_s3_bucket" "task_horizon_avatar_data" {
  bucket = "task-horizon-avatar-data"
}
```

L'attribut `bucket` est le nom réel du bucket sur AWS. Le nom local `task_horizon_avatar_data` permet d'écrire `aws_s3_bucket.task_horizon_avatar_data.arn` ailleurs dans la configuration pour récupérer l'ARN généré après création.

## Le cycle de vie d'une ressource

### `init`

```bash
tflocal init
```

`init` télécharge le provider déclaré dans la configuration et l'installe dans le répertoire `.terraform/`. Il génère également le fichier `.terraform.lock.hcl` qui fixe la version exacte du provider utilisée. Ce fichier doit être commité pour garantir que tous les membres de l'équipe utilisent la même version.

### `plan`

```bash
tflocal plan
```

`plan` est un dry run. Terraform compare l'état actuel de l'infrastructure (lu depuis le fichier d'état) avec la configuration déclarée, et affiche les actions qu'il envisage : `+ create`, `~ update`, `- destroy`. Aucune ressource n'est créée ou modifiée à ce stade.

Dans le plan, certaines valeurs apparaissent comme `(known after apply)`. Ce sont des attributs que AWS génère lui-même — ARN, identifiants uniques, URLs — et qui n'existent pas encore avant la création effective de la ressource.

### `apply`

```bash
tflocal apply
```

`apply` exécute les actions planifiées après confirmation. À la fin de l'opération, Terraform met à jour le fichier d'état avec les valeurs réelles des ressources créées, y compris les valeurs `(known after apply)` qui sont désormais connues.

La création du bucket peut être vérifiée avec `awslocal` :

```bash
awslocal s3 ls
```

## Les fichiers générés

Terraform génère trois types de fichiers qu'il faut traiter différemment selon leur rôle.

`.terraform.lock.hcl` fixe les versions exactes des providers. Il doit être commité pour assurer la reproductibilité.

`terraform.tfstate` est la mémoire de Terraform. Il contient l'état réel de l'infrastructure telle que Terraform la connaît : identifiants, ARN, attributs de chaque ressource. Sans ce fichier, Terraform ne sait plus ce qu'il a créé et tenterait de tout recréer. Ce fichier ne doit pas être commité dans Git : il peut contenir des informations sensibles, et sa gestion en fichier local ne supporte pas le travail en équipe.

`.terraform/` est le cache des providers téléchargés. Il ne doit pas être commité.

## Le fichier d'état en production

En local, le fichier d'état est stocké sur le disque. Ce mode de fonctionnement ne convient pas à un usage en équipe ou en CI/CD : deux exécutions simultanées de Terraform peuvent corrompre l'état, et un développeur travaillant sur une autre machine n'a pas accès à l'état à jour.

La solution standard est le backend remote : le fichier d'état est stocké dans un bucket S3 dédié, et un verrou distribué via DynamoDB empêche deux exécutions simultanées. Cette configuration se déclare dans le bloc `terraform` :

```hcl
terraform {
  backend "s3" {
    bucket         = "mon-projet-tfstate"
    key            = "prod/terraform.tfstate"
    region         = "eu-west-3"
    dynamodb_table = "terraform-locks"
  }
}
```

Le passage du backend local au backend remote se fait avec `terraform init -migrate-state`, qui copie l'état existant vers S3.

## Variables

Coder des valeurs en dur dans `main.tf` — nom du bucket, région, taille des instances — rend la configuration non réutilisable entre environnements. Terraform résout ce problème avec les variables, déclarées par convention dans un fichier `variables.tf` séparé :

```hcl
variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
  default     = "task-horizon-avatar-data"
}

variable "aws_region" {
  description = "The AWS region"
  type        = string
  default     = "eu-west-3"
}
```

Chaque variable expose une valeur nommée, typée, documentée, avec une valeur par défaut optionnelle. Dans `main.tf`, la variable se référence via `var.<nom>` :

```hcl
resource "aws_s3_bucket" "task_horizon_avatar_data" {
  bucket = var.bucket_name
}
```

Le même mécanisme s'applique à n'importe quel attribut d'une ressource — `region = var.aws_region` dans le bloc `provider`, `instance_class = var.db_instance_class` dans un bloc RDS, etc.

La valeur par défaut est utilisée si aucune surcharge n'est fournie. Pour surcharger sans modifier le fichier, deux méthodes coexistent. La première passe la valeur directement à la commande :

```bash
tflocal apply -var="bucket_name=prod-avatars"
```

La seconde utilise un fichier `terraform.tfvars`, chargé automatiquement par Terraform s'il est présent à la racine :

```hcl
# terraform.tfvars
bucket_name = "prod-avatars"
```

:::warning Nommage S3
S3 n'accepte pas les underscores dans les noms de buckets. Si `bucket_name` contenait un underscore et qu'on le corrige après un premier `apply`, Terraform détruirait le bucket existant pour en recréer un nouveau (`-/+` dans le plan). En production, cela signifie une perte de données. Le plan doit toujours être lu attentivement avant un `apply` sur une infrastructure existante.
:::

## Outputs

Après un `apply`, Terraform connaît toutes les valeurs générées par AWS — ARNs, URLs, identifiants — qui n'existaient pas avant la création des ressources. Les outputs les exposent de manière structurée :

```hcl
output "task_horizon_avatar_data_arn" {
  value = aws_s3_bucket.task_horizon_avatar_data.arn
}
```

La syntaxe de référence suit le pattern `<type>.<nom_local>.<attribut>`. Ici, `aws_s3_bucket.task_horizon_avatar_data.arn` récupère l'ARN du bucket après sa création.

Après l'`apply`, les outputs s'affichent dans le terminal. Ils sont également interrogeables individuellement, ce qui est utile dans les scripts :

```bash
tflocal output -raw task_horizon_avatar_data_arn
```

## Réseau et base de données

### VPC et subnets

Un VPC (Virtual Private Cloud) est un réseau isolé dans AWS. Toutes les ressources d'un projet — bases de données, instances, load balancers — vivent dans ce réseau. La plage d'adresses IP du VPC se déclare via un bloc CIDR :

```hcl
resource "aws_vpc" "task_horizon_vpc" {
  cidr_block = "10.0.0.0/16"
}
```

À l'intérieur du VPC, les subnets divisent l'espace réseau selon les niveaux d'exposition. Un subnet public reçoit les ressources accessibles depuis Internet (load balancers, ingress). Un subnet private héberge les ressources internes (base de données, nœuds Kubernetes) qui ne doivent pas être directement joignables depuis l'extérieur :

```hcl
resource "aws_subnet" "task_horizon_subnet_public" {
  vpc_id     = aws_vpc.task_horizon_vpc.id
  cidr_block = "10.0.1.0/24"
}

resource "aws_subnet" "task_horizon_subnet_private" {
  vpc_id     = aws_vpc.task_horizon_vpc.id
  cidr_block = "10.0.2.0/24"
}
```

La référence `aws_vpc.task_horizon_vpc.id` extrait l'identifiant du VPC créé précédemment. C'est le même mécanisme de référence entre ressources que celui utilisé dans les outputs — la syntaxe `<type>.<nom_local>.<attribut>` est universelle dans Terraform.

### RDS PostgreSQL

RDS exige un subnet group — un objet AWS qui liste les subnets dans lesquels l'instance de base de données peut être placée. C'est un prérequis obligatoire avant de pouvoir créer l'instance :

```hcl
resource "aws_db_subnet_group" "task_horizon_db_subnet_group" {
  name       = "task-horizon-db-subnet-group"
  subnet_ids = [aws_subnet.task_horizon_subnet_private.id]
}
```

L'instance RDS référence ensuite ce subnet group, ce qui la place dans le réseau private :

```hcl
resource "aws_db_instance" "task_horizon_db" {
  engine            = "postgres"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  db_name           = "task_horizon_db"
  username          = var.db_username
  password          = var.db_password
  skip_final_snapshot  = true
  db_subnet_group_name = aws_db_subnet_group.task_horizon_db_subnet_group.name
}
```

`skip_final_snapshot = true` indique à AWS de ne pas créer de snapshot de la base lors de la suppression. En production, ce paramètre doit être à `false` pour éviter la perte de données lors d'un `terraform destroy` accidentel.

:::warning LocalStack
LocalStack en version gratuite ne supporte pas RDS. VPC et subnets fonctionnent en local, mais l'instance RDS nécessite un vrai compte AWS. Le plan peut être validé localement ; l'`apply` doit cibler AWS directement.
:::

### Variables sensibles

Les credentials de base de données ne doivent jamais apparaître dans les fichiers de configuration ni dans les logs CI. Terraform expose le marqueur `sensitive` sur les variables pour masquer leur valeur partout où elle serait normalement affichée :

```hcl
variable "db_password" {
  type      = string
  sensitive = true
}
```

Une variable `sensitive = true` sans `default` force l'injection explicite à chaque exécution. Dans le plan et les logs, la valeur apparaît comme `(sensitive value)`. En CI/CD, elle est injectée depuis les secrets du pipeline :

```bash
terraform apply -var="db_password=${{ secrets.DB_PASSWORD }}"
```

### Le graphe de dépendances

L'ordre dans lequel les ressources sont déclarées dans les fichiers `.tf` n'a pas d'importance. Terraform analyse les références entre ressources et construit automatiquement un graphe de dépendances pour déterminer l'ordre de création :

```
aws_vpc → aws_subnet → aws_db_subnet_group → aws_db_instance
```

Les ressources sans dépendance entre elles — comme les subnets public et private — sont créées en parallèle. Cette résolution automatique évite d'avoir à gérer manuellement l'ordre des opérations, et permet à Terraform d'optimiser le temps d'exécution en parallélisant ce qui peut l'être.

L'architecture réseau résultante pour TaskHorizon :

```
VPC 10.0.0.0/16
├── subnet public  10.0.1.0/24  — Load Balancer, EKS ingress
└── subnet private 10.0.2.0/24  — RDS PostgreSQL, EKS nodes
```

## Intégration CI/CD

Les outputs sont le point de jonction naturel entre un job d'infrastructure et un job de déploiement applicatif. Le premier job crée ou met à jour les ressources cloud ; le second utilise les valeurs produites pour configurer le déploiement :

```bash
# Job 1 — infrastructure
tflocal apply -var="bucket_name=prod-avatars"
S3_ARN=$(tflocal output -raw task_horizon_avatar_data_arn)

# Job 2 — déploiement
helm upgrade taskhorizon ./helm/taskhorizon \
  --set api.env.S3_BUCKET_ARN="$S3_ARN"
```

Cette séparation garantit que les valeurs transmises au déploiement sont celles effectivement provisionnées, et non des valeurs codées en dur susceptibles de diverger entre environnements.
