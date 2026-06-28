---
title: "GitHub Actions"
description: "CI/CD avec GitHub Actions : événements, workflows, jobs, steps et runners — le modèle mental complet."
tags: [cicd, devops]
---

Sans automatisation, livrer du code en production est un processus manuel : un développeur fusionne une branche, lance les tests à la main, construit l'image Docker, se connecte au serveur, déploie. Chaque étape est une occasion d'oublier quelque chose, de sauter un test, ou de déployer une version qui n'a pas été vérifiée. À mesure que l'équipe et le rythme de livraison augmentent, ce processus ne tient plus.

<!--truncate-->

## CI/CD : le problème et la solution

**L'intégration continue (CI)** répond à un problème de feedback loop. Sans CI, les développeurs travaillent en isolation pendant des jours ou des semaines, puis fusionnent — et découvrent que les branches sont incompatibles, que les tests échouent, que le build est cassé. Plus l'intégration est tardive, plus les conflits sont coûteux à résoudre. La CI force l'intégration fréquente : chaque commit est testé automatiquement, les problèmes sont détectés en minutes plutôt qu'en jours.

**Le déploiement continu (CD)** prolonge cette logique jusqu'à la production. Un commit qui passe tous les tests peut être déployé automatiquement — ou après approbation manuelle pour les environnements critiques. L'objectif est d'éliminer les déploiements manuels risqués et de rendre la livraison reproductible : le même pipeline s'exécute de la même façon à chaque fois, sur chaque environnement.

```
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

```
Événement (push, pull_request, schedule...)
  └── Workflow (.github/workflows/ci.yml)
        └── Job (build, test, deploy...)
              └── Step (checkout, run npm test, docker push...)
                    └── Runner (ubuntu-latest, self-hosted...)
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

`workflow_dispatch` est utile pour les déploiements manuels avec paramètres. `workflow_run` permet de chaîner des workflows — un déploiement qui ne se déclenche qu'après un build réussi.

## Actions du Marketplace

Une step `uses` appelle une action externe. Les actions du [GitHub Marketplace](https://github.com/marketplace?type=actions) couvrent les besoins courants : checkout, setup de langages, push Docker, déploiement Kubernetes.

```yaml
steps:
  - uses: actions/checkout@v4              # checkout du dépôt
  - uses: actions/setup-node@v4            # setup Node.js
    with:
      node-version: "20"
  - uses: docker/build-push-action@v5      # build et push d'une image Docker
    with:
      push: true
      tags: ghcr.io/org/app:latest
```

Le tag `@v4` épingle la version. Toujours épingler une version explicite — `@main` ou `@latest` exposent le workflow aux breaking changes et aux attaques de supply chain.

## Secrets et variables

Les secrets sont chiffrés côté GitHub et injectés dans les steps comme variables d'environnement. Ils ne s'affichent jamais dans les logs.

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

GitHub fournit des runners hébergés (`ubuntu-latest`, `windows-latest`, `macos-latest`) avec 2 000 minutes gratuites par mois pour les dépôts publics, illimitées pour les dépôts publics. Au-delà, chaque minute est facturée.

Les runners auto-hébergés (`self-hosted`) tournent sur des machines contrôlées — serveur on-premise, VM cloud, cluster Kubernetes via ARC. Ils ne consomment pas le quota GitHub et donnent accès à des ressources spécifiques (GPU, réseau privé, caches locaux).

```yaml
jobs:
  build:
    runs-on: self-hosted          # n'importe quel runner self-hosted
  gpu-job:
    runs-on: [self-hosted, gpu]   # runner self-hosted avec le label "gpu"
```
