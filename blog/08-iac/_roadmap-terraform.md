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
- **Modules** (`2026-07-11-terraform-modules.md`) : module local (`variables.tf`, `outputs.tf`, `main.tf`), sources (local, registry, Git), quand ne pas créer un module
- **depends_on explicite et lifecycle** (`2026-07-11-terraform-depends-on-lifecycle.md`) : `prevent_destroy`, `ignore_changes`, `create_before_destroy`, cas pratiques base de données/application, certificat/listener
- **State remote S3** (`2026-07-11-terraform-remote-state.md`) : backend S3, `use_lockfile`, migration depuis local, `-backend-config`, `terraform_remote_state`
- **Multi-environnements** (`2026-07-19-terraform-multi-environnements.md`) : workspaces vs structuration par répertoires (`envs/dev`, `envs/prod`), avantages/limites, variables par environnement (`.tfvars`)

## À faire

Liste à compléter — la progression initialement prévue est terminée. Pistes possibles : provisioners et remote-exec, import de ressources existantes (`terraform import` / blocs `import`), `terraform plan` en CI (Atlantis, TFC), tests Terraform (`terraform test`), gestion des secrets (Vault, SSM), politiques as code (Sentinel/OPA).
