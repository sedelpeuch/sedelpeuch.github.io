---
title: delpeuch.net
---

<img src="/img/project/delpeuch.png" alt="Aperçu site delpeuch.net" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">📅 Depuis 2021</div>
  <div className="project-meta-item">📖 Portfolio · Veille · Open source</div>
  <div className="project-meta-item">🔧 Docusaurus · TypeScript · React · SCSS</div>
</div>

## Le contexte

Un site personnel répond à une question simple : comment centraliser ce qu'on fait sans dépendre d'une plateforme tierce ? LinkedIn pour le professionnel, GitHub pour le code, Notion pour les notes — tout ça existe, mais rien ne relie vraiment les projets aux articles, les apprentissages au parcours. delpeuch.net est cette tentative de tout mettre au même endroit, sous une forme cohérente et sous contrôle total.

Le site couvre trois axes distincts. La section **Projets** regroupe les réalisations associatives (période étudiante), personnelles (side projects, expérimentations), et professionnelles (projets publics du CATIE). La section **Blog** est le journal de la spécialisation DevOps — des notes d'apprentissage mises en forme. La section **Scolarité** archive les cours et ressources de l'ENSEIRB-MATMECA et du CPBx.

## Pourquoi Docusaurus

Docusaurus est conçu pour de la documentation technique, ce qui peut sembler un choix étrange pour un site personnel. En pratique, ça colle exactement au besoin : une arborescence de docs avec sidebar configurable, un blog intégré avec tags et flux RSS, le support MDX pour mélanger prose et composants React dans les articles, et TypeScript de bout en bout pour la configuration. Les alternatives auraient demandé soit de sacrifier la structure (un blog classique type Ghost), soit de réinventer ce que Docusaurus donne nativement (Hugo, Jekyll).

## Les customisations notables

### Le plugin blog enrichi

Docusaurus expose les métadonnées du blog uniquement dans les pages blog. Pour afficher le nombre d'articles et de tags sur la page d'accueil, j'ai wrappé le plugin officiel `@docusaurus/plugin-content-blog` : au moment du chargement du contenu, un appel à `setGlobalData` pousse les statistiques vers le contexte global React. N'importe quelle page peut ensuite les consommer via `useGlobalData` sans passer par des props ou des imports statiques.

### Les composants swizzlés

Plusieurs composants Docusaurus sont remplacés localement dans `src/theme/` : la navbar, le layout principal, les pages de tags, les blocs de code, la table des matières. Le swizzling est le mécanisme natif de Docusaurus pour ça : on dépose le composant dans le bon chemin, le framework le résout en priorité sur sa version interne. Pas de fork, pas de patch — juste une surcharge propre.

### Support des maths et PWA

Les articles peuvent intégrer des formules LaTeX via `remark-math` (parsing) et `rehype-katex` (rendu). Le site est aussi déclaré comme PWA via `@docusaurus/plugin-pwa`, ce qui permet l'installation sur mobile et un mode hors-ligne via service worker.

### Analytics sans tracking

Umami est branché via un script externe. C'est une alternative à Google Analytics : open source, auto-hébergeable, sans cookies tiers, sans revente de données. Le `data-website-id` est dans le code source en clair — il n'y a rien de sensible côté analytics.

## Déploiement

Le site est déployé sur GitHub Pages via deux workflows GitHub Actions.

`gh-pages.yml` gère le déploiement principal, avec une logique de scheduling intentionnelle : un push pendant les heures de travail (8h–18h en semaine) ne déclenche pas de déploiement immédiat — il attend le cron de 18h00. En dehors de ces plages (soir, week-end), le déploiement part immédiatement. Le cron vérifie avant de s'exécuter qu'il y a eu au moins un commit dans les dernières 24h, pour éviter des builds inutiles.

`pr_preview.yml` déploie une prévisualisation pour chaque pull request, accessible à une URL dédiée (`/pr-preview/pr-{numéro}/`), construite avec le bon `BASE_URL`. La preview est nettoyée automatiquement à la fermeture de la PR.

## Liens

- [github.com/sedelpeuch/sedelpeuch.github.io](https://github.com/sedelpeuch/sedelpeuch.github.io)
- [Blog](/blog/)
- [Projets](/docs/projects)
