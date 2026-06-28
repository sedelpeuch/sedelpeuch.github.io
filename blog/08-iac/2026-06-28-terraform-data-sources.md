---
title: "Terraform : data sources"
description: "Interroger l'infrastructure existante avec les data sources Terraform : aws_availability_zones, aws_caller_identity, aws_ami et séparation dans data.tf."
tags: [iac, devops]
---

Terraform ne gère pas toujours l'intégralité d'une infrastructure. En pratique, une configuration s'appuie sur des ressources qui existent en dehors de son périmètre : une région cloud avec ses availability zones, un compte AWS avec son identifiant, des AMIs publiées par des tiers. Les data sources permettent d'interroger ces valeurs sans en prendre la gestion.

<!--truncate-->

## Le modèle mental

Un bloc `resource` déclare une ressource que Terraform crée, modifie et détruit. Elle vit dans le state, et Terraform en est responsable pour toute sa durée de vie.

Un bloc `data` est une requête en lecture seule vers l'API du provider. Terraform interroge AWS au moment du `plan`, récupère la valeur, et l'injecte dans la configuration. Rien n'est créé, rien n'est détruit — si la ressource ciblée n'existe pas, le `plan` échoue.

```hcl
# Terraform crée ce VPC et le gère
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

# Terraform interroge AWS et lit un VPC existant
data "aws_vpc" "shared" {
  tags = {
    Name = "shared-vpc"
  }
}
```

La référence suit le même pattern que pour les ressources, avec le préfixe `data.` :

```
data.<type>.<nom>.<attribut>
```

Par convention, les data sources sont regroupés dans un fichier `data.tf` séparé — convention communautaire établie, non imposée par HashiCorp, mais qui améliore la lisibilité dès que la configuration grossit.

## Résoudre des dépendances dynamiques

Certaines valeurs ne peuvent pas être connues statiquement : les availability zones disponibles dans une région varient, et leur liste peut changer. Hardcoder `eu-west-3a` dans un subnet suppose que cette AZ est disponible au moment du déploiement, ce qui n'est pas garanti.

Le data source `aws_availability_zones` interroge AWS et retourne la liste des AZs actives dans la région configurée dans le provider :

```hcl
data "aws_availability_zones" "available" {}
```

Sans argument, il retourne toutes les AZs en état `available`. L'attribut `names` expose la liste triée — `names[0]`, `names[1]`, `names[2]` correspondent aux trois AZs de la région dans l'ordre alphabétique.

L'intérêt réel n'est pas de remplacer `eu-west-3a` par `names[0]` — c'est équivalent. C'est de répartir des ressources sur plusieurs AZs sans connaître leurs noms à l'avance :

```hcl
resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = data.aws_availability_zones.available.names[0]
}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = data.aws_availability_zones.available.names[1]
}
```

Les deux subnets atterrissent dans des AZs distinctes quelle que soit la région — la même configuration fonctionne en `eu-west-3` ou `us-east-1` sans modification.

## Consommer le contexte d'exécution

Certains data sources n'interrogent pas une ressource spécifique mais l'environnement d'exécution lui-même. `aws_caller_identity` retourne les informations du compte AWS utilisé pour l'exécution courante :

```hcl
data "aws_caller_identity" "current" {}
```

Les attributs exposés sont `account_id`, `arn` et `user_id`. L'account ID est particulièrement utile pour construire des noms de ressources uniques — les buckets S3 ont un espace de nommage global sur AWS, deux comptes différents ne peuvent pas partager le même nom :

```hcl
resource "aws_s3_bucket" "assets" {
  bucket = "${data.aws_caller_identity.current.account_id}-${var.bucket_name}"
}
```

Le nom effectif devient `123456789012-mon-bucket`. La même configuration déployée sur deux comptes AWS distincts produit deux buckets aux noms différents sans aucune modification.

:::info LocalStack
`skip_requesting_account_id = true` dans la configuration du provider LocalStack désactive la résolution de l'identité. `aws_caller_identity` retourne `000000000000` en local. Il faut également exposer le service STS dans les endpoints du provider et le démarrer via `SERVICES=sts localstack start`.
:::

## Filtrer parmi des ressources existantes

Certains data sources acceptent des critères de filtrage pour sélectionner une ressource parmi plusieurs candidates. `aws_ami` en est l'exemple le plus courant : AWS publie des centaines d'AMIs, chaque version reçoit un identifiant unique qui change à chaque mise à jour et varie selon la région.

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-*-24.04-amd64-server-*"]
  }
}
```

`most_recent = true` sélectionne la dernière version publiée parmi les résultats. `owners` restreint la recherche aux AMIs publiées par Canonical — sans ce filtre, une AMI tierce portant un nom similaire pourrait être sélectionnée. Le bloc `filter` affine par pattern de nom ; le wildcard `*` correspond à n'importe quelle date de publication.

```hcl
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
}
```

À chaque `plan`, Terraform interroge AWS et résout `data.aws_ami.ubuntu.id` contre la dernière AMI disponible. Si Canonical a publié une nouvelle version depuis le dernier déploiement, le plan signale une mise à jour de l'instance.

## Quand le plan échoue

Un data source qui ne trouve pas de résultat fait échouer le `plan` — pas l'`apply`. C'est une distinction importante : Terraform détecte l'absence avant d'exécuter quoi que ce soit.

```
Error: Your query returned no results. Please change your search criteria and try again.
```

Ce comportement est intentionnel. Si un data source cible une ressource externe qui doit exister avant le déploiement — un VPC partagé, un certificat TLS géré par une autre équipe — l'échec au `plan` signale explicitement que la précondition n'est pas remplie, plutôt que de laisser l'`apply` échouer à mi-chemin sur une ressource dépendante.
