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

# Télécharger le runner (vérifier la dernière version sur la page GitHub)
curl -o actions-runner-linux-x64-2.317.0.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.317.0/actions-runner-linux-x64-2.317.0.tar.gz

# Vérifier l'intégrité
echo "SHA256SUM  actions-runner-linux-x64-2.317.0.tar.gz" | shasum -a 256 -c

tar xzf ./actions-runner-linux-x64-2.317.0.tar.gz
```

Configuration et enregistrement :

```bash
./config.sh --url https://github.com/ORG/REPO --token TOKEN
```

L'assistant interactif demande le nom du runner et ses labels. Les labels permettent de cibler ce runner spécifiquement dans les workflows (`runs-on: [self-hosted, gpu]`).

## Exécution en tant que service

Lancer le runner en processus de premier plan (`./run.sh`) n'est pas adapté à la production — il s'arrête à la déconnexion de la session. L'installer comme service systemd le démarre automatiquement au boot :

```bash
sudo ./svc.sh install
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

Au niveau organisation, les runners se regroupent en **runner groups**. Un group peut être partagé avec tous les dépôts ou avec une sélection. Le label `runs-on` doit correspondre à un group ou aux labels individuels du runner.

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

Sur un runner auto-hébergé, le workspace persiste entre les jobs — contrairement aux runners GitHub qui démarrent sur une machine propre. Pour les actions qui ne tournent pas dans un container, ajouter une step de nettoyage en fin de job :

```yaml
    steps:
      # ... steps du job ...

      - name: Clean workspace
        if: always()
        run: rm -rf ${{ github.workspace }}/*
```

`if: always()` garantit l'exécution même si le job a échoué.

## Permissions Docker

Si le runner a besoin d'exécuter des commandes Docker sans `sudo`, ajouter l'utilisateur du service au groupe docker :

```bash
sudo usermod -aG docker $USER
# ou, si le socket Docker a des permissions restrictives :
sudo setfacl --modify user:runner-user:rw /var/run/docker.sock
```
