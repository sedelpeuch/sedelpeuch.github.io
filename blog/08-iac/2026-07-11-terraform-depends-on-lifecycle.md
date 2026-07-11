---
title: "Terraform : depends_on et lifecycle"
description: "Contrôler l'ordre de création avec depends_on et le comportement lors des modifications avec lifecycle : prevent_destroy, ignore_changes et create_before_destroy."
tags: [iac, devops]
---

Terraform calcule automatiquement l'ordre de création des ressources en analysant les références entre elles. La plupart du temps, ce graphe de dépendances implicites suffit. Mais il existe des situations où les dépendances ne se lisent pas dans le code HCL, ou où le comportement par défaut lors d'une modification ou d'une destruction est dangereux. Deux mécanismes permettent de prendre le contrôle dans ces cas : `depends_on` et le bloc `lifecycle`.

<!--truncate-->

## depends_on

### Le graphe de dépendances implicites

Terraform construit un graphe de dépendances en lisant les références entre ressources. Quand un attribut d'une ressource A référence une ressource B, Terraform crée automatiquement l'arête `B → A` dans le graphe : B doit exister avant A.

```hcl
resource "aws_db_subnet_group" "main" {
  subnet_ids = [aws_subnet.private.id]  # référence explicite → dépendance implicite
}
```

Terraform sait que `aws_subnet.private` doit être créé avant `aws_db_subnet_group.main` parce qu'il voit la référence `aws_subnet.private.id`. Pas besoin de le déclarer manuellement.

### Quand les dépendances ne sont pas visibles dans le code

Le problème survient quand une dépendance existe dans la réalité mais n'apparaît pas sous forme de référence HCL. Deux cas fréquents :

**Les politiques IAM.** Une bucket policy S3 autorise un rôle IAM à écrire dans le bucket. Si Terraform crée le bucket et la politique en parallèle, la politique peut être appliquée avant que le rôle IAM soit complètement propagé dans AWS, ce qui produit une erreur `NoSuchEntity`. La référence au rôle existe dans la politique, mais l'ordre de création ne garantit pas que le rôle est *utilisable* au moment où la politique est appliquée.

**Les ressources liées à un service externe.** Une instance applicative a besoin que la base de données soit accessible avant de démarrer sa configuration. Si l'instance référence le hostname de la base via une variable et non via `aws_db_instance.main.address`, Terraform ne voit aucune dépendance et peut créer les deux en parallèle.

`depends_on` déclare explicitement qu'une ressource doit attendre la création complète d'une autre avant d'être créée, même sans référence directe :

```hcl
resource "aws_iam_role_policy" "s3_write" {
  name   = "s3-write"
  role   = aws_iam_role.app.id
  policy = data.aws_iam_policy_document.s3_write.json
}

resource "aws_s3_bucket_policy" "main" {
  bucket = aws_s3_bucket.main.id
  policy = data.aws_iam_policy_document.bucket_policy.json

  depends_on = [aws_iam_role_policy.s3_write]
}
```

La bucket policy attend que la politique IAM soit entièrement appliquée avant d'être créée. Sans `depends_on`, les deux seraient créées en parallèle.

### depends_on sur un module

`depends_on` fonctionne aussi sur les modules. Quand un module crée plusieurs ressources qui doivent toutes être prêtes avant qu'une autre ressource externe puisse démarrer, déclarer `depends_on` sur le module entier est plus propre que de lister chaque ressource individuellement :

```hcl
module "database" {
  source = "./modules/database"
  # ...
}

resource "aws_ecs_service" "app" {
  name    = "app"
  cluster = aws_ecs_cluster.main.id
  # ...

  depends_on = [module.database]
}
```

### Quand ne pas utiliser depends_on

`depends_on` est une déclaration manuelle qui contourne le système de résolution automatique de Terraform. Chaque dépendance explicite désactive les optimisations de parallélisme pour les ressources concernées et rend le graphe plus difficile à lire.

La règle : si une référence directe entre ressources est possible, l'utiliser. `depends_on` est réservé aux cas où la dépendance existe dans la réalité AWS mais ne peut pas être exprimée par une référence.

## lifecycle

Le bloc `lifecycle` contrôle le comportement de Terraform lors des opérations de modification et de suppression d'une ressource. Il se place à l'intérieur du bloc `resource` qu'il concerne.

```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-project-data"

  lifecycle {
    prevent_destroy = true
  }
}
```

Trois attributs composent le bloc `lifecycle`, chacun répondant à un problème distinct.

### prevent_destroy

Par défaut, `terraform apply` peut détruire une ressource si la configuration le demande, et `terraform destroy` supprime tout sans discrimination. Pour les ressources critiques (bases de données, buckets S3 contenant des données, certificats TLS en production), une suppression accidentelle peut être catastrophique et difficile à annuler.

`prevent_destroy = true` fait échouer tout plan qui impliquerait la destruction de la ressource, qu'il vienne d'un `apply` ou d'un `destroy` :

```hcl
resource "aws_db_instance" "main" {
  engine            = "postgres"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  # ...

  lifecycle {
    prevent_destroy = true
  }
}
```

```
Error: Instance cannot be destroyed
  Resource aws_db_instance.main has lifecycle.prevent_destroy set,
  but the plan calls for this resource to be destroyed.
```

La protection n'est pas absolue : pour détruire la ressource intentionnellement, il faut d'abord retirer `prevent_destroy` de la configuration, appliquer ce changement, puis relancer le destroy. Ce workflow forcé évite la suppression par inadvertance tout en restant réversible.

`prevent_destroy` protège contre les suppressions accidentelles dues à une modification de configuration. Il ne protège pas contre la corruption des données à l'intérieur de la ressource : c'est le rôle des snapshots et des sauvegardes.

### ignore_changes

Terraform détecte le **drift** : toute différence entre l'état enregistré dans le state et la configuration actuelle déclenche un plan de correction. La plupart du temps, c'est le comportement voulu. Mais certaines ressources ont des attributs qui évoluent légitimement en dehors de Terraform, et corriger ce drift serait incorrect.

Exemple classique : un Auto Scaling Group dont le `desired_capacity` est géré dynamiquement par AWS en fonction de la charge. Si Terraform a déclaré `desired_capacity = 2` et qu'AWS l'a monté à `5` sous charge, le prochain `terraform apply` ramènerait la valeur à `2`, annulant le travail de l'autoscaler.

`ignore_changes` liste les attributs que Terraform doit ignorer lors de la détection du drift :

```hcl
resource "aws_autoscaling_group" "app" {
  name               = "app-asg"
  min_size           = 1
  max_size           = 10
  desired_capacity   = 2
  # ...

  lifecycle {
    ignore_changes = [desired_capacity]
  }
}
```

Avec cette configuration, Terraform ne planifie jamais de modification sur `desired_capacity`, quelle que soit la valeur dans AWS. La valeur `2` dans le code sert uniquement à la création initiale.

`ignore_changes` accepte aussi le mot-clé `all` pour ignorer tous les attributs d'une ressource. Cette option est rare et risquée : Terraform continue à créer et supprimer la ressource, mais n'applique plus aucune modification. Elle est utile pour des ressources entièrement gérées par un autre système après leur création initiale.

Autres cas courants d'`ignore_changes` :
- `tags` sur des ressources AWS taguées automatiquement par des systèmes externes (Config, Security Hub)
- `ami` sur une instance EC2 dont l'AMI est mise à jour par un pipeline de golden image
- `password` sur une base de données dont le mot de passe est roulé par AWS Secrets Manager

### create_before_destroy

Le comportement par défaut de Terraform lors du remplacement d'une ressource est de la détruire, puis d'en créer une nouvelle. Pour certaines ressources, cet ordre produit une interruption de service.

Exemple : un certificat TLS attaché à un listener ALB. Si le certificat doit être remplacé (renouvellement, changement de domaine), Terraform détache et supprime l'ancien certificat, puis crée le nouveau. Entre les deux opérations, le listener n'a plus de certificat valide et les connexions HTTPS échouent.

`create_before_destroy = true` inverse l'ordre : Terraform crée d'abord la nouvelle ressource, met à jour toutes les références vers elle, puis supprime l'ancienne :

```hcl
resource "aws_acm_certificate" "main" {
  domain_name       = "example.com"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}
```

Avec ce comportement, le nouveau certificat existe et est attaché avant que l'ancien soit supprimé. La transition est sans interruption.

`create_before_destroy` a une contrainte : la nouvelle ressource doit pouvoir coexister avec l'ancienne pendant la transition. Si deux ressources ne peuvent pas partager le même nom ou la même configuration en même temps, `create_before_destroy` échoue. Dans ce cas, il faut introduire un changement de nom (via une variable) pour permettre la coexistence temporaire.

Les ressources qui dépendent d'une ressource avec `create_before_destroy` héritent implicitement de ce comportement : Terraform propage la contrainte dans le graphe de dépendances.

## Combiner plusieurs attributs lifecycle

Les trois attributs se combinent dans un seul bloc `lifecycle` :

```hcl
resource "aws_db_instance" "main" {
  engine            = "postgres"
  instance_class    = var.db_instance_class
  allocated_storage = 20
  username          = var.db_username
  password          = var.db_password
  # ...

  lifecycle {
    prevent_destroy       = true
    ignore_changes        = [password]
    create_before_destroy = true
  }
}
```

Ici : la base ne peut pas être détruite accidentellement, les changements de mot de passe gérés en dehors de Terraform sont ignorés, et si l'instance doit être remplacée (changement de `engine` ou de `engine_version`), la nouvelle est créée avant que l'ancienne soit supprimée.

## Récapitulatif

| Attribut | Problème résolu | Effet |
|----------|-----------------|-------|
| `depends_on` | Dépendance réelle non visible dans le code | Force l'ordre de création |
| `prevent_destroy` | Suppression accidentelle d'une ressource critique | Fait échouer tout plan qui détruirait la ressource |
| `ignore_changes` | Drift intentionnel géré en dehors de Terraform | Terraform n'essaie pas de corriger les attributs listés |
| `create_before_destroy` | Interruption de service lors du remplacement | Crée la nouvelle ressource avant de supprimer l'ancienne |
