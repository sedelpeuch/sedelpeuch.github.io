---
title: GitHub ARC - Runners CI/CD auto-hébergés sur Kubernetes
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src="/img/arc.png" alt="GitHub Actions Runner Controller" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">📅 2024 – 2025</div>
  <div className="project-meta-item">👤 Rôle : Ingénieur DevOps</div>
  <div className="project-meta-item">🛠️ Kubernetes · GitHub ARC · Helm · Docker-in-Docker</div>
</div>

## Le contexte

Le CATIE disposait d'une infrastructure CI/CD sur GitLab. La décision de migrer l'ensemble des dépôts vers GitHub a entraîné la reconstruction complète de cette infrastructure sur la nouvelle plateforme. Ce projet, c'est cette migration : poser GitHub Actions comme socle CI/CD et déployer Actions Runner Controller (ARC) sur le cluster Kubernetes interne pour disposer de runners auto-hébergés, éphémères et scalables — capables d'absorber la parallélisation des pipelines de l'ensemble des équipes sans contention.

## Pourquoi ARC plutôt que des runners self-hosted classiques

Les runners self-hosted classiques s'enregistrent manuellement sur une machine et tournent en permanence. C'est simple mais pas scalable : un runner = une machine, pas d'élasticité, et l'état du runner se pollue d'un job à l'autre si on ne fait pas attention. ARC résout ça en gérant les runners comme des pods Kubernetes éphémères : il démarre un pod par job, le détruit à la fin, et ajuste dynamiquement le nombre de runners en fonction de la file d'attente GitHub Actions.

## L'architecture : contrôleur et runners

Le déploiement repose sur deux composants Helm distincts, dans deux namespaces séparés :

<Tabs>
  <TabItem value="controller" label="Contrôleur (arc-systems)">
    Le contrôleur surveille l'API GitHub et orchestre le cycle de vie des pods de runner : création à la réception d'un job, scaling selon la charge, suppression après exécution. Il s'authentifie auprès de GitHub via une GitHub App enregistrée au niveau de l'organisation CATIE, dont la clé privée est stockée comme secret Kubernetes.
  </TabItem>
  <TabItem value="runners" label="Runners (arc-runners)">
    Chaque runner est un pod composé de deux conteneurs : un conteneur runner qui reçoit et exécute le workflow GitHub Actions, et un conteneur DinD (Docker-in-Docker) qui lui fournit un démon Docker isolé. Ce mode conteneur permet d'exécuter des commandes <code>docker build</code> dans les workflows sans exposer le socket Docker de l'hôte.
  </TabItem>
</Tabs>

## Observabilité

J'ai configuré l'exposition de métriques Prometheus sur le listener ARC pour suivre l'état de la file d'attente et le taux d'utilisation des runners. Ça permet de détecter des jobs bloqués ou un sous-dimensionnement du pool avant que ça ne devienne un problème visible par les équipes.

## Liens

- [helm_github-arc (catie-aq)](https://github.com/catie-aq/helm_github-arc)
- [Documentation ARC (GitHub)](https://docs.github.com/fr/actions/hosting-your-own-runners/managing-self-hosted-runners-with-actions-runner-controller/quickstart-for-actions-runner-controller)
