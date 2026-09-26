---
title: Standards Python - Template Cookiecutter
tags: [python, standards, cookiecutter, uv, ruff, pytest, github-actions]
description: "Template Cookiecutter Python normalisé pour l'organisation CATIE : trois types de projets (script, module, application), uv, Ruff, pre-commit, pytest, CI/CD GitHub Actions et synchronisation des projets par Cruft."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<ProjectMeta
  start="Décembre 2023"
  role="Auteur principal et mainteneur"
  domain="Standardisation des projets Python"
  stack={["Python", "uv", "Ruff", "pytest", "Cookiecutter", "GitHub Actions"]}
/>

## Contexte

Sans convention partagée, chaque nouveau projet Python démarre différemment : l'un utilise Poetry, l'autre `setup.py`, un troisième n'a pas de tests, un quatrième a une CI qui lui est propre. Le code fonctionne, mais la maintenance à l'échelle de l'organisation devient coûteuse, chaque projet étant un cas particulier. J'ai mis en place un template Cookiecutter qui impose une structure cohérente dès la création, avec la stack et les workflows qui vont avec.

## Trois types de projets, une seule base

Le template distingue trois niveaux de complexité correspondant aux cas réels rencontrés dans les projets CATIE :

<Tabs>
  <TabItem value="script" label="Script">
    Un point d'entrée unique, pas de tests obligatoires, logging basique. Pour les outils utilitaires et les automatisations simples qui ne justifient pas une structure de package complète, mais bénéficient quand même d'un environnement propre et d'un devcontainer.
  </TabItem>
  <TabItem value="module" label="Module">
    Structure en <code>src/</code>, suite de tests pytest avec couverture, versionnage automatique par tag Git, publication en wheel et en archive source. C'est le type destiné aux bibliothèques réutilisables et aux outils en ligne de commande (Click). La CI publie automatiquement sur le serveur interne à chaque tag.
  </TabItem>
  <TabItem value="application" label="Application">
    Tout ce que contient le module, plus un Dockerfile multi-étapes, un fichier Docker Compose pour le développement local, un chart Helm et une CI/CD complète qui construit, teste, publie l'image et déploie via Helm ou Docker Compose. Pour les services de longue durée et les API.
  </TabItem>
</Tabs>

## Choix techniques

**uv** remplace Poetry. La résolution et l'installation des dépendances sont nettement plus rapides, et l'outil couvre aussi la gestion des versions de Python. La migration depuis Poetry a été faite en cours de vie du template, avec mise à jour des projets existants via Cruft, et les [workflows Python mutualisés](cicd.md) ont reçu leurs équivalents uv.

**Ruff** remplace le trio Black, isort et flake8 : un seul outil, une seule configuration, une exécution nettement plus rapide. Il couvre le formatage, le tri des imports et le linting.

**pre-commit** exécute les vérifications localement avant chaque commit, pas seulement en CI, ce qui avance la détection des erreurs dans le cycle.

## La maintenance dans le temps

Un template qui n'évolue pas devient vite obsolète. Cruft propage les mises à jour du template vers les projets qui en sont issus, en ouvrant automatiquement une pull request de synchronisation ; le workflow `cruft` du dépôt `generic_workflows` s'en charge. Quand une dépendance ou une configuration évolue dans le template, les projets qui en sont issus intègrent la mise à jour sans repartir de zéro.

## Limites connues

L'adoption de Cruft n'est pas universelle : certains projets anciens ne l'ont pas activé, ce qui crée une dérive progressive avec le template. Les projets de type script n'ont pas de tests par convention, ce qui peut encourager la mauvaise habitude de ne jamais en écrire même quand ça serait utile. La frontière entre « module » et « application » n'est pas toujours évidente pour les contributeurs, ce qui génère parfois des choix de type inadaptés.

## Liens

Le dépôt du template est privé à l'organisation `catie-aq`. Page liée :

- [Workflows GitHub Actions mutualisés](cicd.md)
