---
title: "GitHub Actions : ARC"
description: "Déployer Actions Runner Controller (ARC) sur Kubernetes pour des runners GitHub Actions auto-hébergés et autoscalables."
tags: [cicd, devops]
---

Un [runner auto-hébergé](./2024-12-20-self-host-runner.md) classique est une machine fixe qui exécute les jobs séquentiellement. Si dix workflows se déclenchent simultanément, neuf attendent. Actions Runner Controller (ARC) est un opérateur Kubernetes qui provisionne des pods runner à la demande — un pod par job — et les supprime à la fin de l'exécution. La capacité s'adapte automatiquement à la charge.

<!--truncate-->

## Architecture

ARC (mode *runner scale sets*, chart `gha-runner-scale-set`) repose sur trois composants déployés dans le cluster :

- **Le controller** (`arc-systems`) — réconcilie les ressources personnalisées d'ARC (`AutoscalingRunnerSet`, `EphemeralRunnerSet`, `EphemeralRunner`) et crée les pods correspondants.
- **Le listener** (`arc-systems`) — un pod par scale set, qui maintient une session de long polling auprès du service GitHub Actions. Il reçoit les messages « job disponible » et ajuste le nombre de runners désiré, entre `minRunners` et `maxRunners`.
- **Les runners éphémères** (`arc-runners`) — un pod par job. Chaque pod s'enregistre comme runner *just-in-time*, exécute un seul job puis se termine. Il contient le binaire runner GitHub Actions et, optionnellement, un sidecar Docker-in-Docker pour les jobs qui construisent des images.

```text
GitHub Actions
      ↓ message « job disponible » (long polling)
Listener (arc-systems)
      ↓ met à jour le nombre de runners désiré
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
- Application GitHub installée sur l'organisation (recommandé) ou Personal Access Token, pour l'authentification

## Installation

**1. Déployer le controller :**

```bash
helm install arc \
  --namespace arc-systems \
  --create-namespace \
  oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set-controller
```

**2. Créer le secret d'authentification :**

ARC s'authentifie auprès de l'API GitHub via une GitHub App. Les identifiants se récupèrent depuis *Settings → Developer settings → GitHub Apps* de l'organisation. Le secret doit exister dans le namespace des runners avant l'installation du scale set :

```bash
kubectl create namespace arc-runners

kubectl create secret generic arc-github-app-secret \
  --namespace arc-runners \
  --from-literal=github_app_id=APP_ID \
  --from-literal=github_app_installation_id=INSTALLATION_ID \
  --from-file=github_app_private_key=./private-key.pem   # clé PEM téléchargée depuis la GitHub App
```

Avec un Personal Access Token, le secret contient une seule clé `github_token`.

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
        command: ["/home/runner/run.sh"]   # requis dès que le template est personnalisé
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
  -f values.yaml \
  oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set
```

:::warning Nommage
Le nom d'installation Helm (`arc-runners` ici), sauf surcharge par la valeur `runnerScaleSetName`, devient l'identifiant du scale set dans GitHub. C'est la valeur à utiliser dans `runs-on` des workflows. Choisir un nom stable — le renommer casse tous les workflows qui le référencent.
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

## Docker-in-Docker et cache de build

Le mode Docker-in-Docker s'active avec une seule valeur du chart, qui ajoute au pod un conteneur `docker:dind` privilégié et partage son socket avec le conteneur runner :

```yaml
containerMode:
  type: "dind"
```

Toute personnalisation plus poussée (image, ressources du sidecar) impose de laisser `containerMode` vide et de décrire le sidecar dans `template`.

Chaque pod runner démarre avec un daemon Docker vide : les couches sont téléchargées et reconstruites à chaque job. Monter le répertoire `/var/lib/docker` d'un nœud (via `hostPath`) dans plusieurs sidecars DinD n'est pas une solution fiable : le démon Docker suppose un accès exclusif à son répertoire de données, et deux pods programmés sur le même nœud corrompent les métadonnées de stockage. Le cache se déporte plutôt hors du démon, dans un emplacement conçu pour être partagé :

```yaml
- uses: docker/build-push-action@v6
  with:
    push: true
    tags: ghcr.io/org/app:${{ github.sha }}
    # Cache de couches stocké dans le registry, réutilisable par tous les runners
    cache-from: type=registry,ref=ghcr.io/org/app:buildcache
    cache-to: type=registry,ref=ghcr.io/org/app:buildcache,mode=max
```

Le mode `max` exporte aussi les couches des étapes intermédiaires d'un build multi-stage. Pour les pulls d'images de base, un registry miroir (*pull-through cache*) dans le cluster évite de retélécharger les mêmes couches depuis Internet.

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

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/github-arc-kubeadm" title="GitHub ARC - Runners CI/CD auto-hébergés sur Kubernetes">Déploiement d'ARC en mode runner scale set (charts Helm officiels 0.13.0) sur le cluster kubeadm du CATIE, avec authentification par GitHub App et runners éphémères Docker-in-Docker maintenus entre 10 et 60 pods.</ProjectLink>
</ProjectLinks>
