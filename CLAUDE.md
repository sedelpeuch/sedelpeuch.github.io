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

Blog posts use frontmatter with `tags` matching navbar dropdown categories: `network`, `containerization`, `cicd`, `cloud`, `orchestration`, `monitoring`, `iac`, `scripting`, plus `devops` on every post.

Blog permalinks look like `/blog/2025/06/09/08-iac/ansible-zsh-automation` (date + folder + slug without date). Relative `.md` links only resolve within the same plugin: blog ↔ blog is fine, but a link from `docs/` to a blog post (or the reverse) must use the permalink. Never rename or move a published file (blog or docs) without a redirect — URLs are public.

Project docs live under `docs/projects/{professionnel,associatif,personnel}/`.

`sidebars.json` is minimal — Docusaurus auto-generates sidebar from filesystem structure.

## Workflow contenu en cours

Deux projets sources alimentent le blog :

- `/home/sedelpeuch/dev/perso/task_horizon` — app portfolio (Terraform, Helm, FastAPI, Docker, EKS). Chaque concept cloud / CI/CD / IaC pratiqué donne lieu à un article (`05-cloud/`, `04-ci-cd/`, `08-iac/`). Page projet : `docs/projects/personnel/task-horizon.md`.
- `/home/sedelpeuch/dev/perso/fervantfactory` — homelab GitOps Docker Compose (Traefik, Authelia, Renovate, Prometheus, sauvegardes S3…), doc complète dans ses `<stack>/<stack>.md`, `DAS.md`, `docs/pages/`. Page projet : `docs/projects/personnel/homelab.md`.

Flux : apprentissage terrain → article blog (outil ou concept isolé, impersonnel) → page projet (vue d'ensemble, résultats). Le blog est DevOps, pas homelab : on en extrait les outils et pièges réels, présentés de façon générique (`example.com`, jamais de domaine, IP, nom de personne ou matériel réels). Le lien vers le projet passe par la section finale `## Application / Projet lié`. Les notes des projets sources peuvent contenir des approximations : toujours vérifier contre la doc officielle.

Un article peut être antidaté pour combler un trou dans le rythme de publication (dates hebdomadaires cohérentes avec l'ordre des dépendances entre articles).

## Blog — objectif et ton

**Pourquoi ce blog existe :** journal de notes techniques de Sébastien, ingénieur DevOps & robotique au CATIE. Sert à la fois de référence personnelle et de vitrine professionnelle. Public cible : ingénieurs DevOps francophones, recruteurs techniques, pairs de la communauté ROS2/Kubernetes.

**Ton :** impersonnel, scientifique, sans jugement de valeur. Expose les faits et mécanismes, jamais d'opinion ni d'enthousiasme ("c'est génial", "c'est simple"). Pas de première personne. Suppose un lecteur qui sait coder et administrer des systèmes, mais découvre le sujet de l'article.

**Nommage :** titre au format `"Famille : sujet"` (`"Terraform : modules"`, `"AWS : Lambda"`, `"Traefik : Sablier"`), ou le nom seul de l'outil pour l'article d'introduction (`"Prometheus"`). Le fichier suit `AAAA-MM-JJ-famille-sujet.md` dans le dossier de sa catégorie (`2026-07-11-terraform-modules.md`).

**Frontmatter :** `title` et `description` toujours entre guillemets doubles (un `:` non quoté casse le YAML et fait tomber tout le plugin), `tags`. **Jamais de champ `authors`** : Sébastien est seul auteur, le champ afficherait sa photo sur chaque billet.

**Structure type d'un article blog :**
- Introduction d'un seul paragraphe qui pose le problème concret
- `<!--truncate-->` juste après (requis pour l'aperçu sur la liste)
- Pas de H1 dans le corps (le `title` en tient lieu), pas d'emoji dans les titres
- Sections H2/H3 progressives : concept → mécanisme → exemple pratique → pièges / limites → conclusion
- Analogies concrètes bienvenues pour illustrer les concepts abstraits
- Blocs de code toujours avec un langage ; `text` pour les schémas ASCII et pseudo-code (le langage par défaut du site est `python`). Langages Prism additionnels déclarés dans `docusaurus.config.ts` (`hcl`, `nginx`, `docker`, `ini`, `powershell`, `promql`…) ; `logql` n'existe pas dans Prism
- Liens relatifs `.md` vers les articles prérequis ou liés (maillage des séries)
- Section finale `## Application / Projet lié` → page projet concernée, avec une ligne `**Utilisation** : ...`

**Typographie :** espace simple avant `:`, apostrophes et guillemets droits, pas de « vous » / « nous ». Exception : les roadmaps annuelles (`blog/*-devops-roadmap-*.md`) sont écrites à la première personne.

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
