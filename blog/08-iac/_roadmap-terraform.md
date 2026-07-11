---
title: Roadmap Terraform
description: Progression pédagogique Terraform, un article par notion, pratiqué sur task_horizon.
tags: [iac, devops]
---

Progression prévue pour la série d'articles Terraform. Chaque étape = une notion pratiquée sur task_horizon + un article de blog rédigé.

<!--truncate-->

## Fait

- **Bases** (`2026-06-21-terraform.md`) : installation, cycle de vie, variables, outputs, VPC, RDS, CI/CD
- **Data sources** (`2026-06-28-terraform-data-sources.md`) : `aws_availability_zones`, `aws_caller_identity`, `aws_ami`, séparation `data.tf`
- **count, for_each, locals** (`2026-07-11-terraform-count-foreach-locals.md`) : interrupteur conditionnel, itération sur map/set, for expressions, `cidrsubnet`, `locals.tf`

## À faire

### Modules

Factoriser et réutiliser des blocs de configuration. Créer un module local, puis consommer un module du registry public (ex. `terraform-aws-modules/vpc`). Structure d'un module (`variables.tf`, `outputs.tf`, `main.tf`).

### depends_on explicite et lifecycle

Contrôler l'ordre de création quand les dépendances implicites ne suffisent pas. `prevent_destroy`, `ignore_changes`, `create_before_destroy`. Cas pratiques : base de données avant application, certificat avant listener.

### State remote (S3 + DynamoDB lock)

Backend S3 pour stocker le state, DynamoDB pour le verrouillage concurrent. Pourquoi ne pas garder le state en local en équipe. Migration d'un state local vers remote.

### Multi-environnements

Workspaces Terraform ou structuration par répertoires (`envs/dev`, `envs/prod`). Avantages et limites de chaque approche. Variables par environnement.
