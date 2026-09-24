---
title: "GitHub Actions : Self-Host Runner"
description: "Installer et configurer un runner GitHub Actions auto-hébergé sur une machine Linux."
tags: [cicd, devops]
---

Les runners hébergés par GitHub (`ubuntu-latest`) sont éphémères, gérés par GitHub, et consomment le quota de minutes de l'organisation. Les runners auto-hébergés tournent sur des machines contrôlées — serveur on-premise, VM cloud, Raspberry Pi — et n'ont pas de quota. Ils donnent accès à des ressources locales : réseau privé, GPU, caches persistants, outils propriétaires.

<!--truncate-->

## Runners GitHub vs auto-hébergés

| | GitHub-hosted | Self-hosted |
|---|---|---|
| Maintenance | GitHub | Soi-même |
| Quota | 2 000 min/mois (privé) | Illimité |
| Environnement | Standardisé | Personnalisable |
| Accès réseau privé | Non | Oui |
| Coût à grande échelle | Élevé | Infrastructure propre |

## Installation d'un runner

L'installation se fait depuis *Settings → Actions → Runners → New self-hosted runner* du dépôt ou de l'organisation. GitHub génère un token d'enregistrement valable 1 heure.

```bash
mkdir actions-runner && cd actions-runner

# Version à adapter : la page "New self-hosted runner" et github.com/actions/runner/releases indiquent la dernière
RUNNER_VERSION="2.317.0"
curl -o "actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz" -L \
  "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"

# Vérifier l'intégrité (empreinte SHA-256 publiée avec la release)
echo "<sha256-publié>  actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz" | shasum -a 256 -c

tar xzf "./actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"
```

Configuration et enregistrement :

```bash
./config.sh --url https://github.com/ORG/REPO --token TOKEN
```

L'assistant interactif demande le nom du runner et ses labels. Les labels permettent de cibler ce runner spécifiquement dans les workflows (`runs-on: [self-hosted, gpu]`). Les options `--name`, `--labels` et `--unattended` rendent l'enregistrement non interactif, donc scriptable.

L'option `--ephemeral` enregistre un runner qui exécute **un seul job** puis se désenregistre. Associée à une machine ou un conteneur recréé à chaque fois, elle garantit qu'aucun état (fichiers, processus, identifiants en cache) ne persiste d'un job à l'autre : c'est le modèle appliqué par les runners hébergés par GitHub et par [ARC](./2024-12-20-github-arc.md).

## Exécution en tant que service

Lancer le runner en processus de premier plan (`./run.sh`) n'est pas adapté à la production — il s'arrête à la déconnexion de la session. L'installer comme service systemd le démarre automatiquement au boot :

```bash
# Le service s'exécute sous l'utilisateur indiqué (par défaut, celui qui a lancé config.sh)
sudo ./svc.sh install runner
sudo ./svc.sh start

# Vérifier le statut
sudo ./svc.sh status
```

## Labels et groupes

Tous les runners auto-hébergés partagent le label `self-hosted`. Des labels supplémentaires permettent de cibler des machines spécifiques :

```yaml
jobs:
  build:
    runs-on: [self-hosted, linux]        # n'importe quel runner Linux

  gpu-training:
    runs-on: [self-hosted, linux, gpu]   # uniquement les runners avec label "gpu"
```

Au niveau organisation, les runners se regroupent en **runner groups**. Un groupe peut être partagé avec tous les dépôts ou avec une sélection, ce qui contrôle quels dépôts peuvent utiliser quelles machines. Un job cible un groupe avec la clé `group`, éventuellement combinée à des labels :

```yaml
jobs:
  deploy:
    runs-on:
      group: production-runners
      labels: [linux, x64]
```

## Utilisation dans un container

Sur un runner auto-hébergé, spécifier un `container` isole le job du système hôte et garantit un environnement reproductible :

```yaml
jobs:
  test:
    runs-on: self-hosted
    container:
      image: python:3.12-slim
    steps:
      - uses: actions/checkout@v4
      - run: pip install pytest && pytest
```

Sans `container`, les steps s'exécutent directement sur la machine hôte et dépendent des outils qui y sont installés.

## Nettoyage du workspace

Sur un runner auto-hébergé non éphémère, le workspace persiste entre les jobs — contrairement aux runners GitHub qui démarrent sur une machine propre. Pour les actions qui ne tournent pas dans un container, ajouter une step de nettoyage en fin de job :

```yaml
    steps:
      # ... steps du job ...

      - name: Clean workspace
        if: always()
        run: find "${{ github.workspace }}" -mindepth 1 -delete   # inclut les fichiers cachés
```

`if: always()` garantit l'exécution même si le job a échoué. Un job exécuté dans un `container` écrit dans le workspace monté sous l'utilisateur du conteneur, souvent `root` : les fichiers laissés sont alors impossibles à supprimer par l'utilisateur du runner au job suivant, d'où l'intérêt de nettoyer depuis le conteneur lui-même ou d'y utiliser un utilisateur non-root.

## Sécurité

Un runner auto-hébergé exécute le code de tout workflow qui le cible. Sur un dépôt **public**, une pull request provenant d'un fork peut modifier le workflow et exécuter du code arbitraire sur la machine, puis y persister si le runner n'est pas éphémère. GitHub recommande de n'utiliser des runners auto-hébergés qu'avec des dépôts privés, ou d'exiger une approbation des workflows provenant de contributeurs externes. Le runner ne doit pas non plus disposer d'identifiants plus larges que nécessaire (clés cloud, accès réseau à la production).

## Permissions Docker

Si le runner a besoin d'exécuter des commandes Docker sans `sudo`, ajouter l'utilisateur du service au groupe docker :

```bash
sudo usermod -aG docker runner
sudo ./svc.sh stop && sudo ./svc.sh start   # la nouvelle appartenance au groupe n'est prise en compte qu'au redémarrage du service
# ou, si le socket Docker a des permissions restrictives :
sudo setfacl --modify user:runner:rw /var/run/docker.sock
```

L'accès au socket Docker équivaut à un accès `root` sur l'hôte : un job peut lancer `docker run -v /:/host --privileged` et modifier n'importe quel fichier du système. Sur une machine partagée, un runner éphémère dans une VM dédiée, ou un démon Docker *rootless*, limite cette exposition.
