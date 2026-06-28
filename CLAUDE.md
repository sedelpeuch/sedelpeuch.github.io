# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn install        # install deps
yarn start          # dev server (hot reload)
yarn build          # static build → ./build/
yarn serve          # serve built output locally
```

No test suite. No lint script in package.json — pre-commit handles formatting.

Pre-commit hooks: `prettier` (JS/TSX/CSS), `black` (Python), standard yaml/json checks.

## Architecture

Docusaurus 3 site (French, single locale). Deployed to GitHub Pages at `delpeuch.net`.

**Content areas:**
- `blog/` — DevOps tech articles, organized by topic subdirs (`02-network/`, `03-containerization/`, etc.)
- `docs/` — structured docs: `projects/` (professionnel/associatif/personnel), `enseignement/`, `scolarite/`
- `src/pages/` — custom React pages (`index.tsx` homepage, `about.mdx`)
- `src/components/` — shared UI components (IconTitle, SocialLinks, Svg, Tooltip, UserCard)
- `data/social.ts` — social link definitions consumed by components
- `static/` — static assets served at root

**Key config:** `docusaurus.config.ts` — navbar, plugins (KaTeX math, Mermaid diagrams, Algolia search, PWA, image zoom, SASS), theme config.

**Plugins active:** `@docusaurus/plugin-ideal-image`, `@docusaurus/plugin-pwa`, `@docusaurus/theme-mermaid`, `@docusaurus/theme-search-algolia`, `@easyops-cn/docusaurus-search-local`, `docusaurus-plugin-image-zoom`, `docusaurus-plugin-sass`.

**Math support:** remark-math + rehype-katex enabled in both blog and docs.

## Content conventions

Blog posts use frontmatter with `tags` matching navbar dropdown categories: `network`, `containerization`, `cicd`, `cloud`, `orchestration`, `monitoring`, `iac`, `scripting`.

Project docs live under `docs/projects/{professionnel,associatif,personnel}/`.

`sidebars.json` is minimal — Docusaurus auto-generates sidebar from filesystem structure.

## Workflow contenu en cours

`blog/05-cloud/` est en développement actif. Projet source : `/home/sedelpeuch/PERSO-SDE/task_horizon` (app portfolio — stack Terraform, Helm, FastAPI, Docker). Chaque concept cloud découvert pendant ce développement donne lieu à un article dans `blog/05-cloud/`. L'application elle-même sera documentée dans `docs/projects/` une fois aboutie.

Flux : apprentissage terrain (task_horizon) → article blog (concept isolé, impersonnel) → page projet (vue d'ensemble de l'app, résultats).

## Blog — objectif et ton

**Pourquoi ce blog existe :** journal de notes techniques de Sébastien, ingénieur DevOps & robotique au CATIE. Sert à la fois de référence personnelle et de vitrine professionnelle. Public cible : ingénieurs DevOps francophones, recruteurs techniques, pairs de la communauté ROS2/Kubernetes.

**Ton :** impersonnel, scientifique, sans jugement de valeur. Expose les faits et mécanismes, jamais d'opinion ni d'enthousiasme ("c'est génial", "c'est simple"). Pas de première personne. Suppose un lecteur qui sait coder et administrer des systèmes, mais découvre le sujet de l'article.

**Structure type d'un article blog :**
- Introduction courte qui pose le problème concret
- `<!--truncate-->` après le premier paragraphe (requis pour l'aperçu sur la liste)
- Sections H2/H3 progressives : concept → mécanisme → exemple pratique → conclusion
- Analogies concrètes bienvenues pour illustrer les concepts abstraits
- Blocs de code avec labels de langage, commandes shell commentées

## Projets (`docs/projects/`) — objectif et ton

**Pourquoi cette section existe :** portfolio technique de projets réels (CATIE, associatif, personnel). Chaque page documente ce qui a été construit, le contexte métier, les décisions techniques, et les résultats concrets. Sert aux recruteurs et aux clients potentiels.

**Ton :** professionnel, précis, à la première personne ("J'ai développé", "J'ai mis en place"). Orienté résultats et contraintes réelles plutôt que liste de technologies. Mettre en avant les décisions techniques non-triviales et leur justification.

**Structure type d'une page projet :**
- Frontmatter : `title`, `description` (SEO), `tags` techniques
- Bloc `project-meta-grid` : dates, rôle, stack (voir exemples existants)
- Section contexte : problème métier avant la solution
- Section réalisations : ce qui a été construit concrètement (Tabs Docusaurus si plusieurs axes)
- Section résultats : impact mesurable ou qualitatif
- Liens externes si pertinents
- MDX autorisé : `Tabs`, `TabItem`, `:::info` callouts, images avec style inline
