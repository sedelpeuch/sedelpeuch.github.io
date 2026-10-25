---
name: blog-update
description: Passage "blog update" — lire le blog et les contributions GitHub de Seb (sedelpeuch, catie-aq) depuis le dernier passage, proposer des candidats d'articles DevOps, puis rédiger ceux qu'il valide. À utiliser quand Seb demande un passage, des idées d'articles tirées de son travail récent, ou /blog-update.
---

# Passage "blog update"

Objectif : alimenter le blog à partir du travail réel de Seb, sans fuite d'information client. Les conventions d'écriture (ton, nommage, frontmatter, structure, `## Application / Projet lié`) sont dans le `CLAUDE.md` du dépôt et s'appliquent telles quelles.

## Règles

- **Sources** : GitHub uniquement, comptes `sedelpeuch` et organisation `catie-aq`. Pas de lecture des dépôts locaux.
- **Contributions** : commits, PR et issues dont Seb est l'auteur ; dans `catie-aq`, seulement les dépôts où il a contribué.
- **Focus DevOps** : catégories du blog (network, containerization, cicd, cloud, orchestration, monitoring, iac, scripting, git, security). Robotique (ROS2, Jetson…) acceptée si l'angle est l'outillage (CI, images, déploiement, bancs de test), pas l'algorithmie.
- **Projets clients** : lecture autorisée. Un travail fait sur un projet client (ex. déploiement en prod Scaleway avec Terraform) peut devenir un article, à condition qu'**aucun lecteur ne puisse deviner le projet ni le client** : pas de nom, de domaine, de métier reconnaissable, de chiffre ou d'architecture distinctive ; seul l'outil ou le mécanisme est gardé. Le signaler comme projet client dans la liste de candidats. Si l'anonymisation paraît impossible sans vider le sujet, le dire plutôt que de le proposer.
- **Interne CATIE non client** (noms de nœuds, IP, architecture) : utilisable sans demander, mais toujours rendu générique dans l'article (`example.com`, IP fictives, `node-1`, modèles de matériel remplacés).
- **Applicatif perso hors DevOps** (arr, Recallarr, body_analysis, ytdl-sub-ui…) : écarté.
- **Sujet déjà partiellement couvert** : proposer une suite ou un article de série, jamais une réécriture (le blog est une timeline, un ancien article ne se corrige pas).
- **Exploration** : libre, sans demander. Le MCP GitHub peut être en panne : `gh` suffit.

## Déroulé

1. **Fenêtre** : du dernier passage noté dans [history.md](history.md) à aujourd'hui (à défaut, depuis la date du dernier article publié).
2. **Lire le blog** : titres de tous les billets (`blog/**/20*.md`), `blog/_idea.md` et les roadmaps `_*.md`, pour exclure ce qui est couvert.
3. **Collecter les contributions** :
   ```bash
   gh api -X GET search/commits -f q="author:sedelpeuch author-date:>=AAAA-MM-JJ" --jq .total_count
   gh search commits --author=sedelpeuch --author-date='AAAA-MM-JJ..AAAA-MM-JJ' --limit 200 \
     --json repository,commit --jq '.[] | "\(.commit.author.date[:10]) \(.repository.fullName) \(.commit.message|split("\n")[0])"'
   gh search prs --author=sedelpeuch --created='>=AAAA-MM-JJ' --json repository,title
   gh search issues --author=sedelpeuch --created='>=AAAA-MM-JJ' --json repository,title
   ```
   La recherche plafonne par requête : découper la fenêtre en tranches de dates si le total dépasse ~200. Sous zsh, ne pas écrire `echo ==` (expansion `=cmd`).
4. **Creuser** les dépôts prometteurs : README, `CHANTIERS.md`, specs `docs/`, diffs des commits clés (`gh api repos/<o>/<r>/commits/<sha>`). Un chantier non réalisé n'est pas un candidat : le noter « à venir ».
5. **Livrer la liste** dans le chat : tableau classé (titre au format `Famille : sujet`, catégorie, dépôt source, contenu et pièges), puis candidats faibles, sujets à venir, écartés, et questions client éventuelles. Ne rien rédiger avant validation.
6. **Rédiger** les candidats validés :
   - vérifier chaque affirmation technique contre la doc officielle (les notes et README internes contiennent des approximations ; signaler à Seb les écarts trouvés) ;
   - passer chaque article et chaque page projet modifiée au skill `humanizer` une fois rédigés (voir « Relecture » dans le `CLAUDE.md`) ;
   - relire la config réelle avec un œil critique : un bug trouvé en route se signale à Seb, il ne se recopie pas dans l'article ;
   - dates hebdomadaires ou tous les ~3 jours après le dernier billet, dans l'ordre des dépendances entre articles, jamais dans le futur ;
   - liens relatifs `.md` vers les articles prérequis ;
   - mettre à jour la page projet concernée (première personne, liens par permalien `/blog/AAAA/MM/JJ/<dossier>/<slug>`), en retirant les limites devenues fausses.
7. **Vérifier** : `node_modules/.bin/docusaurus build` doit passer sans lien cassé. Si `yarn` est introuvable : `corepack enable --install-directory ~/.cache/yarnshim yarn` puis `PATH=~/.cache/yarnshim:$PATH`.
8. **Noter le passage** dans [history.md](history.md) : fenêtre, volume, rédigés, refusés, à venir.
9. **Commit / push** uniquement sur demande de Seb, en ne prenant que les fichiers du passage.
