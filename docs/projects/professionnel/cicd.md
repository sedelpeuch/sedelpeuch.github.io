---
title: CI/CD - Workflows GitHub Actions mutualisés
tags: [ci-cd, github-actions]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div className="project-meta-grid">
  <div className="project-meta-item">📅 2024 – 2025</div>
  <div className="project-meta-item">👤 Rôle : Mainteneur principal</div>
  <div className="project-meta-item">🛠️ GitHub Actions · Python · ROS · Zephyr · Docker</div>
</div>

## Le contexte

La migration des dépôts du CATIE de GitLab vers GitHub a posé une question concrète : comment éviter que chaque équipe réécrive ses propres pipelines CI/CD de son côté ? Le risque était d'avoir autant de variantes de workflows que de projets — chacun légèrement différent, chacun à maintenir séparément. J'ai conçu et mis en place une bibliothèque de **workflows réutilisables** GitHub Actions, organisée par domaine technologique, que tous les projets de l'organisation peuvent appeler avec quelques lignes de configuration.

## L'approche : un workflow appelant, des dizaines de projets bénéficiaires

GitHub Actions propose le déclencheur `workflow_call`, qui permet à un workflow d'être appelé depuis n'importe quel autre dépôt de l'organisation. L'avantage est structurel : la logique CI/CD vit dans un seul endroit. Quand un workflow est mis à jour — nouvelle version d'un outil, correction d'un bug, ajout d'une fonctionnalité — tous les projets qui l'appellent en bénéficient au prochain déclenchement, sans toucher à leur propre code.

Les projets consommateurs n'ont qu'à préciser le workflow à appeler et quelques paramètres spécifiques à leur contexte. Le reste — étapes, configuration des runners, gestion des secrets — est centralisé.

## Les domaines couverts

<Tabs>
  <TabItem value="generic" label="Generic">
    Il couvre les besoins transverses à toute technologie : publication d'images Docker sur GHCR et Nexus, déploiement via Helm ou Docker Compose, versionnage automatique par tag, mise à jour des hooks pre-commit, synchronisation des projets avec leur template Cookiecutter via Cruft, et génération de PDF depuis Markdown avec Pandoc.
  </TabItem>
  <TabItem value="python" label="Python">
    Les workflows Python couvrent le cycle complet d'un package : tests avec pytest, publication sur un serveur SFTPGo interne, et tag automatique à partir de la version déclarée dans le manifeste. Le dépôt a évolué avec les pratiques de l'équipe : les workflows Poetry ont été remplacés par des équivalents UV au fil de la migration des projets Python.
  </TabItem>
  <TabItem value="ros" label="ROS">
    Les workflows ROS couvrent ROS 1 Noetic et plusieurs distributions ROS 2. Ils s'appuient sur les outils officiels `ros-tooling` pour la configuration de l'environnement, la compilation et les tests, ainsi qu'une étape optionnelle de lint Python. Ces workflows tournent sur les runners auto-hébergés ARC pour disposer de l'environnement ROS sans l'installer à chaque job.
  </TabItem>
  <TabItem value="zephyr" label="Zephyr">
    Ce dépôt couvre la compilation et les tests de firmwares Zephyr — applications complètes et drivers. Il gère la génération du manifest `west.yml`, le support multi-board, et l'accès aux dépôts privés de l'organisation via PAT.
  </TabItem>
</Tabs>


## Liens

- [generic_workflows](https://github.com/catie-aq/generic_workflows)
- [python_workflows](https://github.com/catie-aq/python_workflows)
- [ros_workflows](https://github.com/catie-aq/ros_workflows)
- [zephyr_workflows](https://github.com/catie-aq/zephyr_workflows)
