---
title: Standards Python - Template Cookiecutter
tags: [python, standards]
description: "Template Cookiecutter Python normalisé pour l'organisation CATIE. Poetry, pre-commit, pytest, CI GitHub Actions et documentation automatique."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div className="project-meta-grid">
  <div className="project-meta-item">📅 2024 – en cours</div>
  <div className="project-meta-item">👤 Rôle : Auteur principal</div>
  <div className="project-meta-item">🛠️ Python · uv · Ruff · pytest · Cookiecutter · GitHub Actions</div>
</div>

## Le problème

Sans convention partagée, chaque nouveau projet Python démarre différemment : l'un utilise Poetry, l'autre setup.py, un troisième n'a pas de tests, un quatrième a une CI qui lui est propre. Le code fonctionne, mais la maintenance à l'échelle de l'organisation devient coûteuse — chaque projet est un cas particulier. J'ai mis en place un template Cookiecutter qui impose une structure cohérente dès la création, avec la stack et les workflows qui vont avec.

## Trois types de projets, une seule base

Le template distingue trois niveaux de complexité correspondant aux cas réels rencontrés dans les projets CATIE :

<Tabs>
  <TabItem value="script" label="Script">
    Un point d'entrée unique, pas de tests obligatoires, logging basique. Pour les outils utilitaires et les automatisations simples qui ne méritent pas une structure de package complet, mais bénéficient quand même d'un environnement propre et d'un devcontainer pour le développement.
  </TabItem>
  <TabItem value="module" label="Module">
    Structure en `src/`, suite de tests pytest, versioning automatique par git tag, publication en wheel et source. C'est le type pour les bibliothèques réutilisables et les outils CLI. La CI publie automatiquement sur le serveur interne à chaque tag.
  </TabItem>
  <TabItem value="application" label="Application">
    Tout ce que le module contient, plus un Dockerfile multi-stage, un docker-compose pour le développement local, et une CI/CD complète qui build, teste, publie l'image et déploie via Helm. Pour les services long-running et les APIs.
  </TabItem>
</Tabs>

## Les choix techniques

**uv** remplace Poetry. La gestion des dépendances est significativement plus rapide, l'outil est activement maintenu et s'est imposé comme le standard de facto en 2024. La migration depuis Poetry a été faite en cours de vie du template, avec mise à jour des projets existants via Cruft.

**Ruff** remplace le trio Black + isort + flake8. Un seul outil, une seule configuration, des performances nettement supérieures. Il couvre le formatage, le tri des imports et le linting.

**pre-commit** garantit que les vérifications tournent localement avant chaque commit, pas seulement en CI. Ça déplace la détection d'erreurs au plus tôt dans le cycle.

## La maintenance dans le temps

Un template qui n'évolue pas devient obsolète rapidement. Cruft permet de propager les mises à jour du template vers les projets qui en sont issus en ouvrant automatiquement une pull request de synchronisation. Le workflow `cruft` du repo `generic_workflows` s'en charge. En pratique, quand une dépendance ou une configuration évolue dans le template, les dizaines de projets qui l'utilisent peuvent intégrer la mise à jour sans repartir de zéro.

## Ce qui reste imparfait

L'adoption de Cruft n'est pas universelle — certains projets anciens ne l'ont pas activé, ce qui crée une dérive progressive avec le template. Les projets de type script n'ont pas de tests par convention, ce qui peut encourager la mauvaise habitude de ne jamais en écrire même quand ça serait utile. La frontière entre "module" et "application" n'est pas toujours évidente pour les contributeurs, ce qui génère parfois des choix de type inadaptés.

## Liens

- [cookiecutter_python-package (catie-aq)](https://github.com/catie-aq/cookiecutter_python-package)
