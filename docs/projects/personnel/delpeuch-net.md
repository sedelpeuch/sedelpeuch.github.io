---
title: "delpeuch.net"
description: "Site personnel Docusaurus (portfolio, blog DevOps, archives de scolarité) avec composants swizzlés, support KaTeX et Mermaid, PWA, analytics sans cookies et déploiement GitHub Pages planifié."
tags: [docusaurus, react, typescript, github-actions, github-pages]
---

<img src="/img/project/delpeuch.png" alt="Aperçu site delpeuch.net" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2020"
  role="Auteur et mainteneur"
  domain="Portfolio, blog technique, open source"
  stack={["Docusaurus", "TypeScript", "React", "SCSS", "GitHub Actions"]}
/>

## Contexte

Un site personnel répond à une question simple : comment centraliser ce qu'on fait sans dépendre d'une plateforme tierce ? LinkedIn pour le professionnel, GitHub pour le code, un outil de prise de notes pour le reste : chacun couvre un usage, mais aucun ne relie les projets aux articles, ni les apprentissages au parcours. delpeuch.net est cette tentative de tout mettre au même endroit, sous une forme cohérente et sous contrôle total.

Le site couvre trois axes distincts. La section **Projets** regroupe les réalisations associatives (période étudiante), personnelles (projets annexes, expérimentations) et professionnelles (projets publics du CATIE). La section **Blog** est le journal de la spécialisation DevOps : des notes d'apprentissage mises en forme. La section **Scolarité** archive les cours et ressources de l'ENSEIRB-MATMECA et du CPBx.

Le dépôt existe depuis 2020 ; la version actuelle, construite sur Docusaurus, date de janvier 2024.

## Pourquoi Docusaurus

Docusaurus est conçu pour de la documentation technique, ce qui peut sembler un choix étrange pour un site personnel. En pratique, il correspond au besoin : une arborescence de docs avec barre latérale générée depuis le système de fichiers, un blog intégré avec tags et flux RSS, le support MDX pour mélanger prose et composants React dans les articles, et TypeScript de bout en bout pour la configuration. Les alternatives demandaient soit de renoncer à la structure documentaire (un moteur de blog comme Ghost), soit de reconstruire ce que Docusaurus fournit nativement (générateurs statiques généralistes comme Hugo ou Jekyll).

## Les customisations notables

### Les composants swizzlés

Plusieurs composants Docusaurus sont remplacés localement dans `src/theme/` : le menu mobile de la navbar, les pages de tags, les blocs de code, la table des matières, la pagination entre pages de docs, la barre latérale et le pied des billets du blog, le pied des pages de docs. Le swizzling est le mécanisme natif de Docusaurus pour cela : un composant déposé au bon chemin est résolu en priorité sur sa version interne, sans fork ni patch du framework.

Le même mécanisme sert à enregistrer des composants MDX globaux : la fiche projet affichée en tête de chaque page de cette section est un composant React (`ProjectMeta`) disponible dans tout fichier MDX sans import, ce qui garantit une présentation identique d'une page à l'autre.

### Les plugins de données

Deux plugins Docusaurus maison lisent les fichiers au build et exposent des données globales aux composants. `projects-data` extrait la fiche `ProjectMeta` de chaque page projet, ce qui alimente l'index des projets et les encarts qui renvoient vers un projet depuis un billet ; il relève aussi, dans l'autre sens, les billets qui citent chaque projet, listés automatiquement en bas de sa page. `series-data` regroupe les billets par série déclarée dans leur frontmatter et par catégorie, pour la navigation entre billets. Chaque relation n'est ainsi écrite qu'à un seul endroit.

### Maths, diagrammes et PWA

Les articles du blog comme les pages de documentation peuvent intégrer des formules LaTeX via `remark-math` (analyse) et `rehype-katex` (rendu), ainsi que des diagrammes Mermaid. Le site est aussi déclaré comme PWA via `@docusaurus/plugin-pwa`, ce qui permet l'installation sur mobile et un mode hors ligne via service worker.

### Analytics sans tracking

La mesure d'audience passe par Umami, branché via un script externe, plutôt que par Google Analytics : l'outil est open source, auto-hébergeable, et fonctionne sans cookies, ce qui évite un bandeau de consentement. Le `data-website-id` figure en clair dans le code source : c'est un identifiant public, sans valeur secrète.

## Déploiement

Le site est déployé sur GitHub Pages via deux workflows GitHub Actions.

`gh-pages.yml` gère le déploiement principal, avec une logique de planification volontaire : un push pendant les heures de travail (de 8 h à 18 h UTC en semaine) ne déclenche pas de déploiement immédiat, il attend le cron de 18 h UTC. En dehors de ces plages (soir, week-end), le déploiement part immédiatement. Avant de construire, l'exécution planifiée vérifie qu'au moins un commit a été poussé dans les dernières 24 heures, pour éviter des builds inutiles. Le calcul se fait dans un script `actions/github-script` en tête de workflow, dont la sortie conditionne le job de déploiement.

`pr_preview.yml` déploie une prévisualisation pour chaque pull request, accessible à une URL dédiée (`/pr-preview/pr-<numéro>/`) et construite avec le `BASE_URL` correspondant. La prévisualisation est supprimée automatiquement à la fermeture de la pull request. Le déploiement principal exclut ce répertoire de son nettoyage (`clean-exclude`), pour ne pas effacer les prévisualisations en cours.

## Résultats

- **Un point d'entrée unique** pour le portfolio, le blog DevOps et les archives de scolarité, sur un domaine personnel et sans dépendre d'une plateforme tierce.
- **Projets et articles reliés sans double saisie** : la fiche d'un projet, son entrée dans l'index et la liste de ses articles proviennent d'une seule source.
- **Déploiements regroupés** : les pushs des heures de travail partent en un seul build en fin de journée, et aucun build planifié n'est lancé sans nouveau commit.
- **Chaque pull request prévisualisable** à sa propre URL avant fusion.
- **Mesure d'audience sans cookies**, donc sans bandeau de consentement.

## Liens

- 💻 Code source : [github.com/sedelpeuch/sedelpeuch.github.io](https://github.com/sedelpeuch/sedelpeuch.github.io)
- [Blog](/blog/)
- [Page projet du blog](delpeuch-net-blog.md)
- [Projets](../index.md)
