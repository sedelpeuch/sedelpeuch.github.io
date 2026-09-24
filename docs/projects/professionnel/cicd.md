---
title: CI/CD - Workflows GitHub Actions mutualisés
tags: [cicd, github-actions, python, ros, zephyr, docker, helm]
description: Bibliothèque de workflows GitHub Actions réutilisables (générique, Python, ROS, Zephyr) appelée par plusieurs dizaines de dépôts de l'organisation CATIE, du test au déploiement Helm ou Compose.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<ProjectMeta
  start="2024"
  role="Concepteur et mainteneur principal"
  domain="CI/CD mutualisée, standardisation"
  stack={["GitHub Actions", "Docker", "Helm", "Python", "ROS", "Zephyr"]}
/>

## Contexte

La migration des dépôts du CATIE de GitLab vers GitHub a posé une question concrète : comment éviter que chaque équipe réécrive ses propres pipelines CI/CD ? Le risque était d'obtenir autant de variantes de workflows que de projets, chacune légèrement différente et à maintenir séparément. J'ai conçu et mis en place une bibliothèque de **workflows réutilisables** GitHub Actions, organisée par domaine technologique, que tous les projets de l'organisation peuvent appeler avec quelques lignes de configuration.

## Approche : un workflow central, des dizaines de projets appelants

GitHub Actions propose le déclencheur `workflow_call`, qui permet à un workflow d'être appelé depuis un autre dépôt. La logique CI/CD vit ainsi à un seul endroit : quand un workflow est mis à jour (nouvelle version d'un outil, correction d'un bug, ajout d'une fonctionnalité), tous les projets qui l'appellent sur la branche principale en bénéficient au prochain déclenchement, sans toucher à leur propre code. La contrepartie est qu'une régression se propage aussi vite qu'une correction : aucun tag de version n'est publié et tous les projets suivent la branche principale, ce qui fait de la revue par pull request le principal garde-fou.

Les projets consommateurs n'ont qu'à préciser le workflow à appeler et quelques paramètres propres à leur contexte. Le reste (étapes, choix des runners, gestion des secrets) est centralisé. Les jobs s'exécutent sur les [runners auto-hébergés ARC](github-arc-kubeadm.md) du cluster interne.

## Les domaines couverts

<Tabs>
  <TabItem value="generic" label="Generic">
    Le dépôt générique couvre les besoins transverses à toute technologie : publication d'images Docker sur GHCR et Nexus, déploiement via Helm ou Docker Compose, versionnage automatique par tag, exécution et mise à jour des hooks pre-commit, synchronisation des projets avec leur [template Cookiecutter](standards-python.md) via Cruft, et génération de PDF depuis Markdown avec Pandoc.
  </TabItem>
  <TabItem value="python" label="Python">
    Les workflows Python couvrent le cycle de vie d'un package : tests avec pytest, publication sur un serveur SFTPGo interne, et tag automatique à partir de la version déclarée dans le manifeste. Le dépôt a évolué avec les pratiques de l'équipe : des équivalents uv des workflows Poetry ont été ajoutés au fil de la migration des projets Python.
  </TabItem>
  <TabItem value="ros" label="ROS">
    Les workflows ROS couvrent ROS 1 Noetic et plusieurs distributions ROS 2. Ils s'appuient sur les outils officiels `ros-tooling` pour la configuration de l'environnement, la compilation et les tests, ainsi qu'une étape optionnelle de lint Python. Ces workflows tournent sur les runners auto-hébergés ARC pour disposer de l'environnement ROS sans l'installer à chaque job.
  </TabItem>
  <TabItem value="zephyr" label="Zephyr">
    Ce dépôt couvre la compilation et les tests de firmwares Zephyr : applications, bibliothèques, drivers, cartes et shields. Il gère la génération du manifeste `west.yml`, le support multi-cartes et l'accès aux dépôts privés de l'organisation via un jeton d'accès personnel. Je le co-maintiens avec un collègue de l'équipe embarquée, principal contributeur des workflows propres à Zephyr.
  </TabItem>
</Tabs>

## Résultats

En septembre 2026, la recherche de code GitHub recense plus de 70 dépôts de l'organisation qui appellent `generic_workflows`, près de 90 pour `zephyr_workflows`, une trentaine pour `python_workflows` et 17 pour `ros_workflows`. Le déploiement de tous les services du [cluster Kubernetes interne](sonu-k8s-cluster.md) passe par le même workflow `deploy-helm`.

## Liens

- [generic_workflows](https://github.com/catie-aq/generic_workflows)
- [ros_workflows](https://github.com/catie-aq/ros_workflows)
- [zephyr_workflows](https://github.com/catie-aq/zephyr_workflows)
- [GitHub Actions : Workflow](/blog/2024/12/20/04-ci-cd/workflow)
- [GitHub Actions : architecture CI/CD réutilisable](/blog/2024/12/20/04-ci-cd/exemple)
- [GitHub Actions : déploiement Docker Compose](/blog/2026/08/23/04-ci-cd/github-actions-deploiement-compose)
