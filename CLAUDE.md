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

**Composants et plugins maison :** `src/components/` (ProjectMeta, ProjectIndex, ProjectLink, ProjectArticles, Series, CategoryNav, scolarite/*), enregistrés globalement pour le MDX dans `src/theme/MDXComponents/index.tsx` (aucun import nécessaire). `plugins/projects-data` et `plugins/series-data` exposent des données globales construites à partir des fichiers. Thème surchargé : pied des pages projets (articles du blog qui y renvoient, relation inverse des `<ProjectLink>`), paginateur (anneaux reliés, pagination limitée à une section de docs), sidebar du blog (icône de catégorie et mois), pied de billet (série ou catégorie). Vocabulaire visuel commun : anneau 14 px et rail 2,5 px bleus (timeline de la page d'accueil), pointillés = en cours / à venir, icônes monochromes teintées de la couleur primaire. Attention : Babel compile `[...new Set()]` de façon incorrecte (mode loose), utiliser `Array.from(new Set())`.

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
- Section finale `## Application / Projet lié` contenant un encart par projet concerné :
  ```mdx
  <ProjectLinks>
    <ProjectLink to="/docs/projects/personnel/homelab" title="HomeLab">Ce que l'article met en pratique dans ce projet.</ProjectLink>
  </ProjectLinks>
  ```
  (plusieurs `<ProjectLink>` → grille de cartes ; période et stack sont lues dans la fiche du projet)
- Série : un parcours pensé pour être lu dans l'ordre (Homelab, Terraform, AWS) se déclare par `series: <id>` dans le frontmatter (ordre = date, `series_order` pour départager une même date). Le billet affiche alors la piste de série ; sinon, une navigation précédent / suivant dans sa catégorie (dossier). Une catégorie n'est pas une série. Libellés des séries : `plugins/series-data/index.js`.

**Typographie :** espace simple avant `:`, apostrophes et guillemets droits, pas de « vous » / « nous ». Exception : les roadmaps annuelles (`blog/*-devops-roadmap-*.md`) sont écrites à la première personne.

## Scolarité (`docs/scolarite/`)

Pages d'index : `<CourseTimeline />` (page Scolarité et pages d'école : frise des semestres avec leurs matières) et `<CourseGrid />` (semestres et matières : une tuile par sous-page, description du frontmatter, nombre de pages), tous deux lus depuis la sidebar. Icônes de matière au trait déduites du libellé (`src/components/scolarite/icons.ts`, ordre du plus spécifique au plus générique), surchargeables par `sidebar_custom_props.icon`.

Pages de matière : les liens de ressources sont regroupés par type dans des `<ResourceList type="cours|td|tp|correction|projet|support" title="…" ordered>` contenant une liste markdown (ligne vide après la balise ouvrante et avant la fermante, sinon MDX ne parse pas la liste ; pas de tableau dedans). `ordered` (défaut pour `cours`) affiche la séquence en rail d'anneaux. Toute modification de ces blocs doit préserver les cibles de liens.

## Projets (`docs/projects/`) — objectif et ton

**Pourquoi cette section existe :** portfolio technique de projets réels (CATIE, associatif, personnel). Chaque page documente ce qui a été construit, le contexte métier, les décisions techniques, et les résultats concrets. Sert aux recruteurs et aux clients potentiels.

**Ton :** professionnel, précis, à la première personne ("J'ai développé", "J'ai mis en place"). Orienté résultats et contraintes réelles plutôt que liste de technologies. Mettre en avant les décisions techniques non-triviales et leur justification.

**Structure type d'une page projet :**
- Frontmatter : `title`, `description` (SEO), `tags` techniques
- Bloc `project-meta-grid` : dates, rôle, stack (voir exemples existants)
- Section contexte : problème métier avant la solution
- Section réalisations : ce qui a été construit concrètement (Tabs Docusaurus si plusieurs axes)
- Section résultats : impact mesurable ou qualitatif
- La fiche en tête de page est le composant global `<ProjectMeta start="2023" end="2025" role="…" domain="…" stack={["Docker", "Traefik"]} />` (pas de `end` = en cours ; `end` égal à `start` = ponctuel ; `status="en pause"` si besoin). Elle est la source unique : `plugins/projects-data` en extrait les props (chaînes entre guillemets doubles et tableau `stack`, format à respecter) pour l'index `<ProjectIndex />` des pages d'index et pour les encarts `<ProjectLink>` du blog. Icônes de stack : `src/components/techIcons.ts` (simple-icons monochromes ; un nom absent s'affiche sans icône).
- Liens externes si pertinents
- MDX autorisé : `Tabs`, `TabItem`, `:::info` callouts, images avec style inline
