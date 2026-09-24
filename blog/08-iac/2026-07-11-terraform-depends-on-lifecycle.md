---
title: "Terraform : depends_on et lifecycle"
description: "Contrôler l'ordre de création avec depends_on et le comportement lors des modifications avec lifecycle : prevent_destroy, ignore_changes et create_before_destroy."
tags: [iac, devops]
---

Terraform calcule automatiquement l'ordre de création des ressources en analysant les références entre elles (voir le graphe de dépendances dans l'article [Terraform](./2026-06-21-terraform.md)). La plupart du temps, ce graphe de dépendances implicites suffit. Il existe cependant des situations où les dépendances ne se lisent pas dans le code HCL, ou où le comportement par défaut lors d'une modification ou d'une destruction est dangereux. Deux mécanismes permettent de prendre le contrôle dans ces cas : `depends_on` et le bloc `lifecycle`.

<!--truncate-->

## depends_on

### Le graphe de dépendances implicites

Terraform construit un graphe de dépendances en lisant les références entre ressources. Quand un attribut d'une ressource A référence une ressource B, Terraform crée automatiquement l'arête `B → A` dans le graphe : B doit exister avant A.

```hcl
resource "aws_db_subnet_group" "main" {
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]  # références → dépendances implicites
}
```

Terraform sait que les subnets doivent être créés avant `aws_db_subnet_group.main` parce qu'il voit les références `aws_subnet.private_a.id` et `aws_subnet.private_b.id`. Aucune déclaration manuelle n'est nécessaire.

### Quand les dépendances ne sont pas visibles dans le code

Le problème survient quand une dépendance existe dans la réalité mais n'apparaît pas sous forme de référence HCL. Deux cas fréquents :

**Les permissions consommées au démarrage.** Une instance EC2 reçoit un *instance profile* qui porte un rôle IAM, et une politique autorisant la lecture d'un bucket S3 est attachée à ce rôle par une ressource distincte. L'instance référence l'instance profile, qui référence le rôle, mais aucune référence ne la relie à l'attachement de la politique : Terraform peut créer l'instance avant que la politique soit attachée. Le script de démarrage (`user_data`), qui télécharge sa configuration depuis S3, échoue alors avec un `AccessDenied`.

**Les ressources liées à un service externe.** Une instance applicative a besoin que la base de données soit accessible avant de démarrer sa configuration. Si l'instance référence le hostname de la base via une variable et non via `aws_db_instance.main.address`, Terraform ne voit aucune dépendance et peut créer les deux en parallèle.

`depends_on` déclare explicitement qu'une ressource doit attendre la création complète d'une autre avant d'être créée, même sans référence directe :

```hcl
resource "aws_iam_role_policy" "s3_read" {
  name   = "s3-read-config"
  role   = aws_iam_role.app.id
  policy = data.aws_iam_policy_document.s3_read.json
}

resource "aws_iam_instance_profile" "app" {
  role = aws_iam_role.app.name
}

resource "aws_instance" "app" {
  ami                  = data.aws_ami.ubuntu.id
  instance_type        = "t3.micro"
  iam_instance_profile = aws_iam_instance_profile.app.name
  user_data            = file("bootstrap.sh")   # lit sa configuration dans S3 au démarrage

  # L'instance ne référence pas la politique : la dépendance doit être déclarée
  depends_on = [aws_iam_role_policy.s3_read]
}
```

L'instance n'est créée qu'une fois la politique attachée au rôle. `depends_on` ordonne les opérations, mais ne compense pas la cohérence à terme d'IAM : une permission tout juste créée peut mettre quelques secondes à être effective. Le provider AWS réessaie la plupart des appels concernés ; un script de démarrage robuste réessaie lui aussi ses premiers accès.

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

`depends_on` est une déclaration manuelle qui contourne le système de résolution automatique de Terraform. Chaque dépendance explicite ajoute une arête au graphe, réduit le parallélisme et rend le graphe plus difficile à lire. Elle a aussi un effet moins visible : un data source doté d'un `depends_on` vers une ressource modifiée dans le plan voit sa lecture reportée à l'`apply`, et toutes les valeurs qui en dérivent deviennent `known after apply`. Un `depends_on` placé sur un module entier propage ce report à tous les data sources du module, ce qui peut transformer de simples mises à jour en remplacements dans le plan.

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

Trois arguments du bloc `lifecycle` couvrent l'essentiel des besoins, chacun répondant à un problème distinct : `prevent_destroy`, `ignore_changes` et `create_before_destroy`. Le bloc accepte aussi `replace_triggered_by`, présenté plus loin, ainsi que des conditions `precondition` et `postcondition`.

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

```text
Error: Instance cannot be destroyed
  Resource aws_db_instance.main has lifecycle.prevent_destroy set,
  but the plan calls for this resource to be destroyed.
```

La protection n'est pas absolue : pour détruire la ressource intentionnellement, il faut d'abord retirer `prevent_destroy` de la configuration, appliquer ce changement, puis relancer le destroy. Ce workflow forcé évite la suppression par inadvertance tout en restant réversible.

`prevent_destroy` protège contre les suppressions accidentelles dues à une modification de configuration. Sa portée a deux limites. Il est lu dans la configuration : si le bloc `resource` entier est supprimé du code, l'argument disparaît avec lui et Terraform planifie la destruction sans objection. Et il ne protège pas contre la corruption des données à l'intérieur de la ressource : c'est le rôle des snapshots et des sauvegardes. Pour une protection indépendante de Terraform, les ressources AWS proposent leurs propres garde-fous (`deletion_protection = true` sur RDS, `disable_api_termination` sur EC2), vérifiés par l'API elle-même.

### ignore_changes

Le **drift** désigne un écart entre l'infrastructure réelle et ce que Terraform a enregistré dans le state, par exemple après une modification manuelle dans la console. À chaque `plan`, Terraform rafraîchit le state à partir de l'API, compare le résultat à la configuration, et planifie la correction de tout écart. La plupart du temps, c'est le comportement voulu. Mais certaines ressources ont des attributs qui évoluent légitimement en dehors de Terraform, et corriger ce drift serait incorrect.

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

Terraform propage ce comportement aux ressources dont dépend la ressource concernée : si A, configurée en `create_before_destroy`, dépend de B, B est implicitement traitée de la même façon lors d'un remplacement, faute de quoi l'ordre des opérations deviendrait impossible à satisfaire.

### replace_triggered_by

Certaines ressources doivent être remplacées lorsqu'une autre change, sans qu'aucun de leurs propres arguments ne soit modifié. `replace_triggered_by` (Terraform 1.2) déclare ce lien :

```hcl
resource "aws_instance" "app" {
  # ...
  lifecycle {
    # Recréer l'instance à chaque nouvelle version du modèle de lancement
    replace_triggered_by = [aws_launch_template.app.latest_version]
  }
}
```

Toute modification de l'attribut référencé (ou de la ressource entière, si la référence ne vise pas d'attribut) déclenche le remplacement de l'instance. `terraform apply -replace=aws_instance.app` produit le même effet ponctuellement, depuis la ligne de commande.

## Combiner plusieurs attributs lifecycle

Les arguments se combinent dans un seul bloc `lifecycle` :

```hcl
resource "aws_db_instance" "main" {
  identifier        = "app-db"
  engine            = "postgres"
  instance_class    = var.db_instance_class
  allocated_storage = 20
  username          = var.db_username
  password          = var.db_password
  # ...

  lifecycle {
    prevent_destroy = true
    ignore_changes  = [password]
  }
}
```

Ici : la base ne peut pas être détruite accidentellement, et les changements de mot de passe gérés en dehors de Terraform sont ignorés. `create_before_destroy` n'aurait pas de sens sur cette ressource : un remplacement implique toujours la destruction de l'ancienne instance, que `prevent_destroy` interdit, et deux instances RDS ne peuvent pas porter le même `identifier` pendant la transition. Toute modification qui forcerait un remplacement fait donc échouer le plan, ce qui est précisément le comportement recherché pour une base de production : une migration de données doit être organisée explicitement (snapshot, restauration, bascule).

## Récapitulatif

| Attribut | Problème résolu | Effet |
|----------|-----------------|-------|
| `depends_on` | Dépendance réelle non visible dans le code | Force l'ordre de création |
| `prevent_destroy` | Suppression accidentelle d'une ressource critique | Fait échouer tout plan qui détruirait la ressource |
| `ignore_changes` | Drift intentionnel géré en dehors de Terraform | Terraform n'essaie pas de corriger les attributs listés |
| `create_before_destroy` | Interruption de service lors du remplacement | Crée la nouvelle ressource avant de supprimer l'ancienne |
| `replace_triggered_by` | Remplacement lié au changement d'une autre ressource | Remplace la ressource quand la référence change |
