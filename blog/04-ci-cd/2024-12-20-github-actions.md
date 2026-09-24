---
title: "GitHub Actions"
description: "CI/CD avec GitHub Actions : événements, workflows, jobs, steps et runners — le modèle mental complet."
tags: [cicd, devops]
authors: sedelpeuch
---

Sans automatisation, livrer du code en production est un processus manuel : un développeur fusionne une branche, lance les tests à la main, construit l'image Docker, se connecte au serveur, déploie. Chaque étape est une occasion d'oublier quelque chose, de sauter un test, ou de déployer une version qui n'a pas été vérifiée. À mesure que l'équipe et le rythme de livraison augmentent, ce processus ne tient plus.

<!--truncate-->

## CI/CD : le problème et la solution

**L'intégration continue (CI)** répond à un problème de feedback loop. Sans CI, les développeurs travaillent en isolation pendant des jours ou des semaines, puis fusionnent — et découvrent que les branches sont incompatibles, que les tests échouent, que le build est cassé. Plus l'intégration est tardive, plus les conflits sont coûteux à résoudre. La CI force l'intégration fréquente : chaque commit est testé automatiquement, les problèmes sont détectés en minutes plutôt qu'en jours.

**Le déploiement continu (CD)** prolonge cette logique jusqu'à la production. Un commit qui passe tous les tests peut être déployé automatiquement — ou après approbation manuelle pour les environnements critiques. L'objectif est d'éliminer les déploiements manuels risqués et de rendre la livraison reproductible : le même pipeline s'exécute de la même façon à chaque fois, sur chaque environnement.

```text
Commit
  → tests automatiques (CI)
    → build de l'artefact
      → déploiement staging automatique
        → approbation manuelle
          → déploiement production (CD)
```

Les bénéfices ne sont pas que techniques. Un pipeline CI/CD rend les déploiements fréquents et peu risqués — ce qui encourage des releases plus petites, plus ciblées, plus faciles à déboguer si quelque chose tourne mal. C'est un changement de pratique autant que d'outillage.

## GitHub Actions

GitHub Actions est le système d'automatisation intégré à GitHub — les workflows vivent dans le dépôt, s'exécutent en réponse à des événements Git, et accèdent nativement aux secrets et aux artefacts du projet.

## Le modèle mental

GitHub Actions repose sur cinq concepts qui s'emboîtent :

```text
Événement (push, pull_request, schedule...)
  └── Workflow (.github/workflows/ci.yml)
        └── Job (build, test, deploy...)  ── exécuté sur un Runner (ubuntu-latest, self-hosted...)
              └── Step (checkout, run npm test, docker push...)
```

Un **événement** déclenche un ou plusieurs **workflows**. Chaque workflow contient un ou plusieurs **jobs**, exécutés en parallèle par défaut. Chaque job est une suite de **steps** qui s'exécutent séquentiellement sur un **runner** — une machine virtuelle éphémère fournie par GitHub ou une machine auto-hébergée.

## Anatomie d'un workflow

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install dependencies
        run: pip install -e ".[dev]"

      - name: Run tests
        run: pytest
```

`on` définit les événements déclencheurs. `jobs` liste les jobs et leur runner. Chaque step exécute soit une **action** (`uses`), soit une commande shell (`run`).

## Événements déclencheurs

```yaml
on: push                          # raccourci : tous les pushs

on:
  push:
    branches: [main, develop]     # pushs sur ces branches uniquement
    paths: ["src/**", "tests/**"] # uniquement si ces chemins changent

  pull_request:
    types: [opened, synchronize]  # PR ouverte ou mise à jour

  schedule:
    - cron: "0 6 * * 1"          # chaque lundi à 6h UTC

  workflow_dispatch:               # déclenchement manuel depuis l'UI GitHub
    inputs:
      environment:
        description: "Target environment"
        required: true
        default: "staging"

  workflow_run:                    # déclenché par la fin d'un autre workflow
    workflows: ["CI"]
    types: [completed]
```

`workflow_dispatch` est utile pour les déploiements manuels avec paramètres. `workflow_run` permet de chaîner des workflows, avec deux particularités : il se déclenche à la fin du workflow observé **quel que soit son résultat**, et la définition utilisée est celle de la branche par défaut. Un déploiement conditionné à un build réussi doit donc tester la conclusion :

```yaml
jobs:
  deploy:
    if: github.event.workflow_run.conclusion == 'success'
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh
```

## Actions du Marketplace

Une step `uses` appelle une action externe. Les actions du [GitHub Marketplace](https://github.com/marketplace?type=actions) couvrent les besoins courants : checkout, setup de langages, push Docker, déploiement Kubernetes.

```yaml
steps:
  - uses: actions/checkout@v4              # checkout du dépôt
  - uses: actions/setup-node@v4            # setup Node.js
    with:
      node-version: "22"
  - uses: docker/build-push-action@v6      # build et push d'une image Docker
    with:
      push: true
      tags: ghcr.io/org/app:latest
```

Le tag `@v4` désigne une version majeure. Une référence de branche comme `@main` expose le workflow aux changements incompatibles, mais un tag Git reste lui aussi mobile : le mainteneur d'une action, ou un attaquant ayant compromis son dépôt, peut le déplacer vers un autre commit. C'est ce qui s'est produit en mars 2025 avec `tj-actions/changed-files`, dont les tags ont été redirigés vers un commit qui exfiltrait les secrets dans les logs. Seul l'épinglage sur le SHA complet d'un commit est immuable :

```yaml
steps:
  # SHA complet du commit, version lisible en commentaire (mis à jour par Dependabot ou Renovate)
  - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
```

L'usage courant consiste à épingler par SHA les actions tierces et à conserver des tags pour les actions publiées par GitHub (`actions/*`) ou par des éditeurs vérifiés.

## Secrets et variables

Les secrets sont chiffrés côté GitHub et injectés dans les steps comme variables d'environnement. Leur valeur exacte est masquée (`***`) dans les logs ; une valeur transformée (encodée en base64, découpée, JSON contenant le secret) n'est en revanche pas reconnue et apparaît en clair. Les workflows déclenchés par un `pull_request` provenant d'un fork ne reçoivent pas les secrets du dépôt.

```yaml
steps:
  - name: Deploy
    env:
      API_TOKEN: ${{ secrets.API_TOKEN }}
    run: ./deploy.sh
```

Les secrets se configurent dans *Settings → Secrets and variables → Actions* du dépôt ou de l'organisation. Le token `GITHUB_TOKEN` est généré automatiquement pour chaque exécution — il donne accès à l'API GitHub avec des permissions limitables :

```yaml
permissions:
  contents: read
  packages: write
```

Dès qu'un bloc `permissions` est présent, toute permission non listée passe à `none`. Sans ce bloc, le jeton reçoit les permissions par défaut configurées au niveau du dépôt ou de l'organisation (lecture seule pour les dépôts récents).

Une expression `${{ }}` est substituée dans le texte du script **avant** son exécution par le shell. Interpoler directement une donnée contrôlée par un tiers, comme le titre d'une pull request, permet donc d'injecter des commandes. Passer la valeur par une variable d'environnement neutralise ce risque :

```yaml
# Vulnérable : un titre contenant "; curl ... | sh" est exécuté
- run: echo "${{ github.event.pull_request.title }}"

# Sûr : la valeur n'est jamais interprétée comme du code shell
- env:
    PR_TITLE: ${{ github.event.pull_request.title }}
  run: echo "$PR_TITLE"
```

## Dépendances entre jobs

Par défaut, les jobs s'exécutent en parallèle. `needs` impose un ordre d'exécution :

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "build"

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "test"

  deploy:
    needs: [build, test]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: echo "deploy"
```

`if` conditionne l'exécution d'un job ou d'une step. Ici, `deploy` ne s'exécute que sur la branche `main` et seulement si `build` et `test` ont réussi.

## Runners

GitHub fournit des runners hébergés (`ubuntu-latest`, `windows-latest`, `macos-latest`). Leur usage est gratuit et illimité pour les dépôts publics (runners standard). Pour les dépôts privés, chaque plan inclut un quota mensuel (2 000 minutes sur le plan Free) ; les minutes Windows et macOS sont décomptées avec un multiplicateur (×2 et ×10), et le dépassement est facturé à la minute.

Les runners auto-hébergés (`self-hosted`) tournent sur des machines contrôlées — serveur on-premise, VM cloud, cluster Kubernetes via ARC. Ils ne consomment pas le quota de minutes des runners hébergés et donnent accès à des ressources spécifiques (GPU, réseau privé, caches locaux). Les articles [runner auto-hébergé](./2024-12-20-self-host-runner.md) et [Actions Runner Controller](./2024-12-20-github-arc.md) détaillent leur mise en place, et l'article [GitHub Actions : Workflow](./2024-12-20-workflow.md) les primitives avancées d'un workflow (matrix, artefacts, conteneurs).

```yaml
jobs:
  build:
    runs-on: self-hosted          # n'importe quel runner self-hosted
  gpu-job:
    runs-on: [self-hosted, gpu]   # runner self-hosted avec le label "gpu"
```
