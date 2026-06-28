---
title: "GitHub Actions : ARC"
description: "Déployer Actions Runner Controller (ARC) sur Kubernetes pour des runners GitHub Actions auto-hébergés et autoscalables."
tags: [cicd, devops]
---

Un runner auto-hébergé classique est une machine fixe qui exécute les jobs séquentiellement. Si dix workflows se déclenchent simultanément, neuf attendent. Actions Runner Controller (ARC) est un opérateur Kubernetes qui provisonne des pods runner à la demande — un pod par job — et les supprime à la fin de l'exécution. La capacité s'adapte automatiquement à la charge.

<!--truncate-->

## Architecture

ARC repose sur deux composants déployés dans le cluster :

- **Le controller** (`arc-systems`) — surveille l'API GitHub, détecte les jobs en attente, et pilote la création et la suppression des pods runner.
- **Les runner scale sets** (`arc-runners`) — ensembles de pods éphémères, un par job en cours d'exécution. Chaque pod contient le binaire runner GitHub Actions et, optionnellement, un sidecar Docker-in-Docker pour les jobs qui construisent des images.

```
GitHub Actions
      ↓ job en attente
ARC Controller (arc-systems)
      ↓ crée un pod
Runner Pod (arc-runners)
  ├── container: runner (exécute le job)
  └── container: dind (Docker-in-Docker, optionnel)
      ↓ job terminé → pod supprimé
```

## Prérequis

- Cluster Kubernetes opérationnel
- Helm 3.x installé
- Application GitHub enregistrée au niveau de l'organisation (pour l'authentification)

## Installation

**1. Déployer le controller :**

```bash
helm install arc \
  --namespace arc-systems \
  --create-namespace \
  oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set-controller
```

**2. Créer le secret d'authentification :**

ARC s'authentifie auprès de l'API GitHub via une GitHub App. Les identifiants se récupèrent depuis *Settings → Developer settings → GitHub Apps* de l'organisation :

```bash
kubectl create secret generic arc-github-app-secret \
  --namespace arc-runners \
  --from-literal=github_app_id=APP_ID \
  --from-literal=github_app_installation_id=INSTALLATION_ID \
  --from-literal=github_app_private_key='PRIVATE_KEY_PEM'
```

**3. Déployer un runner scale set :**

```yaml
# values.yaml
githubConfigUrl: "https://github.com/ORG"
githubConfigSecret: arc-github-app-secret

minRunners: 0
maxRunners: 10

runnerGroup: "default"

template:
  spec:
    containers:
      - name: runner
        image: ghcr.io/actions/actions-runner:latest
        resources:
          requests:
            cpu: 500m
            memory: 512Mi
          limits:
            cpu: 2
            memory: 2Gi
```

```bash
helm install arc-runners \
  --namespace arc-runners \
  --create-namespace \
  -f values.yaml \
  oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set
```

:::warning Nommage
Le nom d'installation Helm (`arc-runners` ici) devient l'identifiant du runner dans GitHub. C'est la valeur à utiliser dans `runs-on` des workflows. Choisir un nom stable — le renommer casse tous les workflows qui le référencent.
:::

## Utilisation dans un workflow

```yaml
jobs:
  build:
    runs-on: arc-runners    # nom du scale set installé
    steps:
      - uses: actions/checkout@v4
      - run: make build
```

ARC crée un pod runner pour ce job au moment où il est déclenché, et le supprime à la fin.

## Cache Docker partagé

Par défaut, chaque pod runner démarre avec un daemon Docker vide — les layers Docker sont téléchargés à chaque job. Pour partager le cache entre pods, monter les répertoires overlay2 de l'hôte dans le container DinD :

```yaml
template:
  spec:
    containers:
      - name: dind
        image: docker:dind
        volumeMounts:
          - name: docker-overlay2
            mountPath: /var/lib/docker/overlay2
          - name: docker-image-overlay2
            mountPath: /var/lib/docker/image/overlay2
    volumes:
      - name: docker-overlay2
        hostPath:
          path: /var/lib/docker/overlay2
      - name: docker-image-overlay2
        hostPath:
          path: /var/lib/docker/image/overlay2
```

Les builds ultérieurs réutilisent les layers déjà présents sur le nœud, réduisant significativement le temps de build.

## Vérification du déploiement

```bash
# État du controller
kubectl get pods -n arc-systems

# État des runner scale sets
kubectl get pods -n arc-runners

# Runners enregistrés sur GitHub
# Settings → Actions → Runners de l'organisation
```

Déclencher un workflow et observer la création du pod :

```bash
watch kubectl get pods -n arc-runners
```

Un pod apparaît au moment où le job démarre et disparaît quelques secondes après sa fin.
