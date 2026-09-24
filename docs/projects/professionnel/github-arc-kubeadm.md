---
title: GitHub ARC - Runners CI/CD auto-hébergés sur Kubernetes
description: Déploiement de GitHub Actions Runner Controller (ARC) sur le cluster Kubernetes kubeadm du CATIE. Runners éphémères Docker-in-Docker de 10 à 60 pods, métriques Prometheus, caches CI partagés et correction des problèmes de MTU.
tags: [kubernetes, github-actions, cicd, helm, docker, prometheus]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src="/img/arc.png" alt="GitHub Actions Runner Controller" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2024"
  role="Ingénieur DevOps, conception et exploitation"
  domain="CI/CD, runners auto-hébergés, Kubernetes"
  stack={["Kubernetes", "GitHub ARC", "Helm", "Docker-in-Docker", "Prometheus", "Calico"]}
/>

## Contexte

Le CATIE disposait d'une infrastructure CI/CD sur GitLab. La décision de migrer l'ensemble des dépôts vers GitHub a entraîné la reconstruction complète de cette infrastructure sur la nouvelle plateforme. J'ai porté cette migration côté exécution : poser GitHub Actions comme socle CI/CD et déployer Actions Runner Controller (ARC) sur le [cluster Kubernetes interne](sonu-k8s-cluster.md), pour disposer de runners auto-hébergés, éphémères et élastiques, capables d'absorber les pipelines de l'ensemble des équipes. Les workflows eux-mêmes sont mutualisés dans une [bibliothèque de workflows réutilisables](cicd.md).

## Pourquoi ARC plutôt que des runners auto-hébergés classiques

Un runner auto-hébergé classique s'enregistre manuellement sur une machine et tourne en permanence : un runner correspond à une machine, sans élasticité, et son état se pollue d'un job à l'autre si rien ne le nettoie. ARC gère les runners comme des pods Kubernetes éphémères : un pod par job, détruit à la fin, et un nombre de runners ajusté en continu selon la file d'attente GitHub Actions. Les runners hébergés par GitHub étaient l'autre option ; ils ne donnent accès ni au réseau interne ni aux ressources matérielles du cluster, et leur coût croît avec le volume de minutes consommées.

## Architecture : contrôleur et scale set

Le déploiement repose sur les deux charts Helm officiels du mode « runner scale set » (version 0.13.0), dans deux namespaces séparés :

<Tabs>
  <TabItem value="controller" label="Contrôleur (arc-systems)">
    Le contrôleur (<code>gha-runner-scale-set-controller</code>) orchestre le cycle de vie des pods de runner : création à la réception d'un job, mise à l'échelle selon la charge, suppression après exécution. Il crée pour chaque scale set un pod <em>listener</em>, qui maintient la connexion avec l'API GitHub et reçoit les jobs en attente.
  </TabItem>
  <TabItem value="runners" label="Runners (arc-runners)">
    Le scale set (<code>gha-runner-scale-set</code>) est enregistré au niveau de l'organisation GitHub et s'authentifie via une GitHub App, dont l'identifiant, l'installation et la clé privée sont stockés dans un Secret Kubernetes. Il maintient entre 10 et 60 runners. Chaque pod de runner associe un conteneur runner, qui exécute le workflow, et un conteneur DinD (Docker-in-Docker) qui lui fournit un démon Docker isolé : les workflows peuvent lancer <code>docker build</code> sans accès au socket Docker de l'hôte.
  </TabItem>
</Tabs>

Le chart est lui-même déployé par GitHub Actions à chaque push, avec le même workflow réutilisable `deploy-helm` que les autres services du cluster.

## Observabilité

J'ai activé les métriques du listener et du contrôleur, collectées par le Prometheus du cluster : jobs démarrés et terminés par dépôt et par workflow, runners enregistrés, occupés et inactifs, nombre de runners souhaité, et histogrammes de durée de démarrage et d'exécution des jobs. Ces métriques permettent de détecter des jobs bloqués ou un pool sous-dimensionné avant que les équipes ne le constatent, et ont guidé les réglages de capacité : le plafond est passé de 20 à 40 puis 60 runners au fil de la montée en charge.

## Optimisation des performances

L'observation des durées de job a fait apparaître plusieurs goulets d'étranglement, tous situés dans le réseau et les téléchargements plutôt que dans le calcul :

- **MTU et overlay Calico.** L'overlay réseau Calico impose un MTU de 1480 octets, alors que les réseaux bridge créés à la volée par Docker dans le conteneur DinD restent à 1500. Les paquets trop grands étaient silencieusement perdus (échec de la découverte du MTU de chemin), ce qui provoquait des blocages de téléchargement difficiles à diagnostiquer. J'ai aligné le MTU du démon Docker sur celui de l'overlay et ajouté un ajustement du MSS TCP (règle `TCPMSS`) pour les réseaux que Docker crée par job.
- **Miroir de paquets.** Le miroir Ubuntu générique, non géolocalisé, était environ 200 fois plus lent depuis le réseau du CATIE que le miroir français. Une redirection DNS seule ne suffisait pas, le miroir français servant ses fichiers par hôte virtuel : chaque pod embarque un petit reverse proxy nginx qui réécrit l'en-tête `Host`. Mesuré sur un pod isolé, `apt update` suivi de l'installation de curl passe de plus de 170 s à 12,6 s.
- **Caches partagés.** Les pods passent par un cache APT (apt-cacher-ng) et un miroir de registre Docker Hub mutualisés dans le cluster, avec repli automatique vers les sources publiques si le cache est indisponible.
- **Parallélisme des téléchargements.** Le démon Docker télécharge par défaut trois couches en parallèle, ce qui bridait les images volumineuses (une image Zephyr de 4,4 Go et 11 couches demandait environ deux minutes d'initialisation). La limite est passée à dix.

## Liens

- [Documentation ARC (GitHub)](https://docs.github.com/fr/actions/hosting-your-own-runners/managing-self-hosted-runners-with-actions-runner-controller/quickstart-for-actions-runner-controller)
- [Cluster Kubernetes interne SONU](sonu-k8s-cluster.md)
- [Workflows GitHub Actions mutualisés](cicd.md)
