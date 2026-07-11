---
title: "Terraform : count, for_each, locals et expressions"
description: "Créer plusieurs ressources sans duplication avec count et for_each, calculer des valeurs intermédiaires avec locals, et transformer des collections avec les for expressions."
tags: [iac, devops]
---

Une configuration Terraform naive duplique les blocs dès qu'il faut plusieurs instances d'une même ressource. Trois subnets dans trois availability zones se traduisent par trois blocs `resource` quasi-identiques, dont la seule différence est le numéro d'AZ et la plage CIDR. Ajouter une quatrième AZ exige de copier un quatrième bloc. Retirer une AZ laisse un bloc orphelin à supprimer manuellement. Ce mode de fonctionnement produit de la configuration qui ne se maintient pas.

Terraform fournit deux métas-arguments pour éviter cette duplication (`count` et `for_each`) et le bloc `locals` pour nommer et réutiliser des valeurs calculées. Ces trois outils répondent à des problèmes distincts et se composent.

<!--truncate-->

## count

Le problème que `count` résout est simple : créer plusieurs instances identiques d'une ressource sans répéter le bloc. `count` prend un entier : Terraform instancie autant de fois la ressource que la valeur indique.

```hcl
resource "aws_subnet" "public" {
  count             = 3
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
}
```

À l'intérieur du bloc, `count.index` expose l'indice de l'instance courante (de `0` à `count - 1`). C'est ce qui permet de différencier les instances : chaque subnet reçoit un CIDR distinct (`10.0.0.0/24`, `10.0.1.0/24`, `10.0.2.0/24`) et atterrit dans une AZ différente, sans dupliquer le bloc.

Depuis l'extérieur, les instances s'adressent par leur index : `aws_subnet.public[0].id`, `aws_subnet.public[1].id`, etc. Pour extraire un attribut de toutes les instances d'un coup, l'opérateur splat `[*]` construit la liste :

```hcl
output "public_subnet_ids" {
  value = aws_subnet.public[*].id
  # ["subnet-aaa", "subnet-bbb", "subnet-ccc"]
}
```

Cet output passe directement à une ressource qui attend une liste d'IDs (un subnet group RDS, un load balancer, un cluster EKS) sans boucle explicite.

### count comme interrupteur conditionnel

`count = 0` supprime la ressource. `count = 1` la crée. Cette propriété sert à rendre une ressource optionnelle selon la valeur d'une variable booléenne, sans avoir à écrire deux configurations distinctes :

```hcl
variable "enable_rds" {
  type    = bool
  default = false
}

resource "aws_db_instance" "main" {
  count          = var.enable_rds ? 1 : 0
  engine         = "postgres"
  instance_class = "db.t3.micro"
  # ...
}
```

C'est le pattern standard pour les ressources coûteuses ou non disponibles dans certains environnements (LocalStack ne supporte pas RDS, par exemple). La même configuration fonctionne en local avec `enable_rds = false` et en production avec `enable_rds = true`.

La conséquence à anticiper : toute ressource qui dépend d'une ressource conditionnelle doit elle aussi être conditionnelle. `aws_db_subnet_group.main[0].name` plante si `aws_db_subnet_group.main` n'existe pas (`count = 0`). La solution est de propager la condition :

```hcl
resource "aws_db_subnet_group" "main" {
  count      = var.enable_rds ? 1 : 0
  name       = "main-db-subnet-group"
  subnet_ids = [aws_subnet.private[0].id]
}

resource "aws_db_instance" "main" {
  count                = var.enable_rds ? 1 : 0
  db_subnet_group_name = aws_db_subnet_group.main[0].name
  # ...
}
```

### La limite de count : la fragilité des index

`count` identifie les instances par leur position dans la liste. Si la liste change, les positions changent, et Terraform reconstruit les ressources dont l'index a bougé même si leur configuration n'a pas changé.

Exemple concret : trois subnets créés avec `count = 3`. On décide de supprimer le subnet du milieu. Terraform voit que `public[1]` doit changer (il récupère la configuration de l'ancien `public[2]`) et que `public[2]` disparaît. Il détruit `public[1]` et recrée une ressource avec la configuration de l'ancienne `public[2]`. Le résultat est fonctionnellement identique, mais deux opérations destroy/create ont eu lieu sans raison.

Pour les ressources que l'on identifie par leur nom plutôt que par leur position, `for_each` évite ce problème.

## for_each

`for_each` itère sur une **map** ou un **set de strings**. Chaque entrée produit une instance de la ressource, identifiée par sa clé et non par un index. La clé est stable : supprimer une entrée de la map ne renomme pas les autres instances.

```hcl
resource "aws_subnet" "public" {
  for_each = {
    "eu-west-3a" = "10.0.1.0/24"
    "eu-west-3b" = "10.0.2.0/24"
    "eu-west-3c" = "10.0.3.0/24"
  }

  vpc_id            = aws_vpc.main.id
  cidr_block        = each.value
  availability_zone = each.key
}
```

`each.key` est la clé de l'entrée courante (le nom de l'AZ), `each.value` est la valeur associée (le CIDR). Les trois instances créées s'appellent `aws_subnet.public["eu-west-3a"]`, `aws_subnet.public["eu-west-3b"]`, `aws_subnet.public["eu-west-3c"]`.

Si on retire `eu-west-3b` de la map, seule cette instance est détruite. Les deux autres ne sont pas touchées : elles gardent leurs clés `"eu-west-3a"` et `"eu-west-3c"`, inchangées.

Pour récupérer la liste des IDs produits, la fonction `values()` extrait les valeurs d'une map de ressources, puis le splat `[*]` en extrait un attribut :

```hcl
resource "aws_db_subnet_group" "main" {
  name       = "main-db-subnet-group"
  subnet_ids = values(aws_subnet.public)[*].id
}
```

### for_each sur un set

Quand les clés et les valeurs sont identiques (une liste de noms sans attributs supplémentaires), un `set` suffit. La fonction `toset()` convertit une liste en set. Un set garantit l'unicité et trie les éléments, ce qui est requis par `for_each`. `for_each` ne peut pas itérer directement sur une liste car les listes peuvent contenir des doublons et leur ordre peut varier entre deux plans :

```hcl
variable "environments" {
  type    = list(string)
  default = ["dev", "staging", "prod"]
}

resource "aws_s3_bucket" "env_configs" {
  for_each = toset(var.environments)
  bucket   = "myapp-config-${each.key}"
}
```

Sur un set, `each.key` et `each.value` sont identiques. Les trois buckets créés sont `aws_s3_bucket.env_configs["dev"]`, `aws_s3_bucket.env_configs["staging"]`, `aws_s3_bucket.env_configs["prod"]`.

### for_each sur une map de maps

Pour des ressources avec plusieurs attributs variables, définir une variable structurée et la passer directement à `for_each` évite d'écrire un bloc par règle :

```hcl
variable "sg_rules" {
  type = map(object({
    description = string
    port        = number
    cidr        = string
  }))
  default = {
    http = { description = "HTTP public",    port = 80, cidr = "0.0.0.0/0" }
    ssh  = { description = "SSH restreint",  port = 22, cidr = "10.0.0.0/8" }
  }
}

resource "aws_security_group_rule" "ingress" {
  for_each    = var.sg_rules
  type        = "ingress"
  description = each.value.description
  from_port   = each.value.port
  to_port     = each.value.port
  protocol    = "tcp"
  cidr_blocks = [each.value.cidr]
  security_group_id = aws_security_group.main.id
}
```

Ajouter une règle revient à ajouter une entrée dans la variable. Supprimer une règle revient à supprimer son entrée. Le bloc `resource` lui-même ne change jamais. C'est l'intérêt principal de cette approche : la logique de création est séparée des données qui varient.

## count vs for_each

Le choix entre les deux dépend de la nature des ressources :

| Critère | `count` | `for_each` |
|---------|---------|------------|
| Type d'entrée | entier | map ou set de strings |
| Identification des instances | par index (`[0]`, `[1]`) | par clé (`["nom"]`) |
| Stabilité si suppression | les index restants se décalent | seule l'instance supprimée est détruite |
| Usage typique | interrupteur on/off, nombre fixe de ressources identiques | ressources nommées, paramétrées par des données |

La règle pratique : `count` pour les interrupteurs conditionnels (`count = var.flag ? 1 : 0`) et pour des ressources réellement interchangeables. `for_each` pour tout ce qui a un nom ou des attributs distincts.

## locals

Les `locals` répondent à un problème de lisibilité et de maintenabilité. Sans eux, les expressions complexes se répètent à travers la configuration, et chaque modification exige de retrouver et de corriger chaque occurrence. Un `local` donne un nom à une valeur calculée et la rend réutilisable.

```hcl
locals {
  name_prefix = "${var.project}-${var.environment}"
  common_tags = {
    Project     = var.project
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
```

Ces deux valeurs peuvent maintenant être référencées avec `local.name_prefix` et `local.common_tags` dans n'importe quelle ressource :

```hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags       = local.common_tags
}

resource "aws_s3_bucket" "assets" {
  bucket = "${local.name_prefix}-assets"
  tags   = local.common_tags
}
```

Ajouter un tag `Owner` à tous les objets revient à modifier une seule ligne dans `locals`. Sans cette abstraction, il faudrait modifier chaque bloc `resource` individuellement.

Les `locals` ne sont pas des variables d'entrée : ils ne s'exposent pas à l'extérieur et ne peuvent pas être surchargés via `-var`. Ils existent uniquement pour nommer des calculs intermédiaires internes à la configuration.

### for expressions

Une `for` expression transforme une collection en une autre. Le besoin surgit quand les data sources retournent une structure qui ne correspond pas directement au format attendu par une ressource, ou quand il faut filtrer ou reformater des données avant de les utiliser.

La syntaxe de base pour produire une **liste** :

```hcl
[for <item> in <collection> : <expression>]
```

Pour produire une **map** :

```hcl
{ for <item> in <collection> : <clé> => <valeur> }
```

Exemple concret : un data source retourne la liste des AZs comme `["eu-west-3a", "eu-west-3b", "eu-west-3c"]`. `for_each` attend une map. Une `for` expression transforme la liste en map `{ AZ => CIDR }` :

```hcl
locals {
  az_subnet_map = {
    for i, az in data.aws_availability_zones.available.names :
    az => cidrsubnet("10.0.0.0/16", 8, i)
  }
}
```

`cidrsubnet("10.0.0.0/16", 8, i)` calcule le i-ème sous-réseau `/24` dans le bloc `/16`. Pour `i = 0`, il retourne `10.0.0.0/24`. Pour `i = 1`, `10.0.1.0/24`. Le résultat final est `{ "eu-west-3a" = "10.0.0.0/24", "eu-west-3b" = "10.0.1.0/24", "eu-west-3c" = "10.0.2.0/24" }`, prêt à être consommé par `for_each`. Si AWS ajoute une quatrième AZ demain, elle apparaît dans la map sans toucher à la configuration.

Les `for` expressions acceptent également une clause `if` pour filtrer :

```hcl
locals {
  # Garder uniquement les subnets des deux premières AZs
  limited_az_map = {
    for i, az in data.aws_availability_zones.available.names :
    az => cidrsubnet("10.0.0.0/16", 8, i)
    if i < 2
  }
}
```

### La séquence complète : data source → local → for_each

Ces trois mécanismes se composent naturellement. La configuration suivante crée autant de subnets publics que d'AZs disponibles dans la région, avec des CIDRs calculés automatiquement, sans aucune valeur codée en dur :

```hcl
data "aws_availability_zones" "available" {}

locals {
  az_subnet_map = {
    for i, az in data.aws_availability_zones.available.names :
    az => cidrsubnet("10.0.0.0/16", 8, i)
  }
}

resource "aws_subnet" "public" {
  for_each          = local.az_subnet_map
  vpc_id            = aws_vpc.main.id
  cidr_block        = each.value
  availability_zone = each.key
}
```

Le data source fournit les AZs réelles de la région. Le `local` transforme cette liste en map exploitable. `for_each` crée les ressources. Chaque couche a une responsabilité distincte.

## Organisation dans les fichiers

Par convention, les `locals` vont dans un fichier `locals.tf` séparé. Sur une configuration de taille modeste, cette séparation semble superflue. Elle devient indispensable dès que la configuration grossit : retrouver rapidement où une valeur est calculée évite de fouiller dans `main.tf` :

```
terraform/
├── main.tf        # ressources
├── variables.tf   # variables d'entrée
├── outputs.tf     # valeurs exposées
├── data.tf        # data sources
├── locals.tf      # valeurs calculées
└── providers.tf   # configuration du provider
```

Les `locals` qui dépendent de data sources ne peuvent pas être évalués avant que le `plan` ne résolve ces data sources. Ce n'est pas une contrainte à contourner : Terraform résout la séquence automatiquement, comme il le fait pour les dépendances entre ressources.
