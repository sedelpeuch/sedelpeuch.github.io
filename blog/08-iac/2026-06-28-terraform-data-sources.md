---
title: "Terraform : data sources"
description: "Interroger l'infrastructure existante avec les data sources Terraform : aws_availability_zones, aws_caller_identity, aws_ami et séparation dans data.tf."
series: terraform
tags: [iac, devops]
---

Terraform ne gère pas toujours l'intégralité d'une infrastructure. En pratique, une configuration s'appuie sur des ressources qui existent en dehors de son périmètre : une région cloud avec ses availability zones, un compte AWS avec son identifiant, des AMIs publiées par des tiers. Les data sources permettent d'interroger ces valeurs sans en prendre la gestion.

<!--truncate-->

## Le modèle mental

Un bloc `resource` déclare une ressource que Terraform crée, modifie et détruit. Elle vit dans le state, et Terraform en est responsable pour toute sa durée de vie.

Un bloc `data` est une requête en lecture seule vers l'API du provider. Terraform interroge AWS au moment du `plan`, récupère la valeur, et l'injecte dans la configuration. Rien n'est créé, rien n'est détruit : si la ressource ciblée n'existe pas, le `plan` échoue. Exception : si les arguments d'un data source dépendent d'une valeur encore inconnue (un attribut `known after apply` d'une ressource créée dans le même plan), sa lecture est reportée à l'`apply`, et tout ce qui en dépend apparaît lui aussi comme inconnu dans le plan.

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

```text
data.<type>.<nom>.<attribut>
```

Par convention, les data sources sont regroupés dans un fichier `data.tf` séparé, selon une convention communautaire établie, non imposée par HashiCorp, mais qui améliore la lisibilité dès que la configuration grossit.

## Résoudre des dépendances dynamiques

Certaines valeurs ne peuvent pas être connues statiquement : les availability zones disponibles dans une région varient, et leur liste peut changer. Hardcoder `eu-west-3a` dans un subnet suppose que cette AZ est disponible au moment du déploiement, ce qui n'est pas garanti.

Le data source `aws_availability_zones` interroge AWS et retourne la liste des AZs actives dans la région configurée dans le provider :

```hcl
data "aws_availability_zones" "available" {}
```

L'argument `state = "available"` restreint le résultat aux zones utilisables ; un filtre sur `opt-in-status` écarte les *Local Zones*, qui nécessitent une activation explicite. L'attribut `names` expose la liste triée : `names[0]`, `names[1]`, `names[2]` correspondent aux trois AZs de la région dans l'ordre alphabétique.

```hcl
data "aws_availability_zones" "available" {
  state = "available"
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}
```

Les noms d'AZ sont propres à chaque compte : AWS répartit aléatoirement la correspondance entre noms et zones physiques pour équilibrer la charge, si bien que `eu-west-3a` ne désigne pas forcément le même centre de données dans deux comptes. L'attribut `zone_ids` (`euw3-az1`, `euw3-az2`...) donne les identifiants physiques, stables d'un compte à l'autre ; ils servent lorsque des ressources de plusieurs comptes doivent être colocalisées.

L'intérêt n'est pas de remplacer `eu-west-3a` par `names[0]`, ce qui revient au même, mais de répartir des ressources sur plusieurs AZs sans connaître leurs noms à l'avance :

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

Les deux subnets atterrissent dans des AZs distinctes quelle que soit la région : la même configuration fonctionne en `eu-west-3` ou `us-east-1` sans modification.

## Consommer le contexte d'exécution

Certains data sources n'interrogent pas une ressource spécifique mais l'environnement d'exécution lui-même. `aws_caller_identity` retourne les informations du compte AWS utilisé pour l'exécution courante :

```hcl
data "aws_caller_identity" "current" {}
```

Les attributs exposés sont `account_id`, `arn` et `user_id`. L'account ID est particulièrement utile pour construire des noms de ressources uniques, car les buckets S3 ont un espace de nommage global sur AWS, deux comptes différents ne peuvent pas partager le même nom :

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
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}
```

`most_recent = true` sélectionne la dernière version publiée parmi les résultats. `owners` restreint la recherche aux AMIs publiées par Canonical ; sans ce filtre, une AMI tierce portant un nom similaire pourrait être sélectionnée. Le bloc `filter` affine par pattern de nom ; le wildcard `*` correspond à n'importe quelle date de publication. Le motif doit suivre exactement le nommage de l'éditeur : depuis Ubuntu 23.10, Canonical publie ses images sous le préfixe `hvm-ssd-gp3` (volume racine `gp3`), et un filtre sur l'ancien préfixe `hvm-ssd` ne trouve aucune image 24.04. `aws ec2 describe-images --owners 099720109477 --filters "Name=name,Values=*24.04*" --query 'Images[].Name'` permet de vérifier le motif. Canonical publie aussi l'identifiant de la dernière image dans un paramètre SSM public (`/aws/service/canonical/ubuntu/server/24.04/stable/current/amd64/hvm/ebs-gp3/ami-id`), lisible avec le data source `aws_ssm_parameter`.

```hcl
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
}
```

À chaque `plan`, Terraform interroge AWS et résout `data.aws_ami.ubuntu.id` contre la dernière AMI disponible. Si Canonical a publié une nouvelle version depuis le dernier déploiement, le plan propose de **remplacer** l'instance (`-/+`) : l'argument `ami` ne se modifie pas en place, l'instance est détruite puis recréée, avec la perte de tout ce qui n'est pas sur un volume persistant. Pour qu'une nouvelle AMI ne s'applique qu'aux instances futures, l'argument est exclu de la comparaison avec `lifecycle { ignore_changes = [ami] }`, présenté dans l'article [depends_on et lifecycle](./2026-07-11-terraform-depends-on-lifecycle.md).

## Quand le plan échoue

Un data source qui ne trouve pas de résultat fait échouer le `plan`, pas l'`apply`. La nuance compte : Terraform détecte l'absence avant d'exécuter quoi que ce soit.

```text
Error: Your query returned no results. Please change your search criteria and try again.
```

Ce comportement est intentionnel. Si un data source cible une ressource externe qui doit exister avant le déploiement (un VPC partagé, un certificat TLS géré par une autre équipe), l'échec au `plan` signale explicitement que la précondition n'est pas remplie, plutôt que de laisser l'`apply` échouer à mi-chemin sur une ressource dépendante.

Cette règle vaut pour les data sources qui désignent un objet unique (`aws_vpc`, `aws_ami`, `aws_acm_certificate`). Les data sources au pluriel (`aws_subnets`, `aws_instances`) renvoient une liste, éventuellement vide, sans erreur : une contrainte explicite (`postcondition` dans un bloc `lifecycle`, ou `length(...) > 0` dans une validation) est alors nécessaire pour transformer une absence en échec.

Les data sources permettent aussi de lire les sorties d'une autre configuration Terraform (`terraform_remote_state`), décrites dans l'article [Terraform remote state](./2026-07-11-terraform-remote-state.md).
