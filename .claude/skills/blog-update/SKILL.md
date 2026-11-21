---
name: blog-update
description: Passage "blog update" — lire le blog et les contributions GitHub de Seb (sedelpeuch, catie-aq) depuis le dernier passage, proposer des candidats d'articles DevOps, puis rédiger ceux qu'il valide. À utiliser quand Seb demande un passage, des idées d'articles tirées de son travail récent, ou /blog-update.
---

# Passage "blog update"

Objectif : alimenter le blog à partir du travail réel de Seb, sans fuite d'information client. La rédaction suit les skills `blog-article` (articles) et `page-projet` (pages projet), et les conventions techniques du `CLAUDE.md` du dépôt.

## Règles

- **Sources** : GitHub uniquement, comptes `sedelpeuch` et organisation `catie-aq`. Pas de lecture des dépôts locaux.
- **Contributions** : commits, PR et issues dont Seb est l'auteur ; dans `catie-aq`, seulement les dépôts où il a contribué.
- **Focus DevOps** : catégories du blog (network, containerization, cicd, cloud, orchestration, monitoring, iac, scripting, git, security). Robotique (ROS2, Jetson…) acceptée si l'angle est l'outillage (CI, images, déploiement, bancs de test), pas l'algorithmie.
- **Projets clients** : lecture autorisée. Un travail fait sur un projet client (ex. déploiement en prod Scaleway avec Terraform) peut devenir un article, à condition qu'**aucun lecteur ne puisse deviner le projet ni le client** : pas de nom, de domaine, de métier reconnaissable, de chiffre ou d'architecture distinctive ; seul l'outil ou le mécanisme est gardé. Le signaler comme projet client dans la liste de candidats. Si l'anonymisation paraît impossible sans vider le sujet, le dire plutôt que de le proposer.
- **Interne CATIE non client** (noms de nœuds, IP, architecture) : utilisable sans demander, mais toujours rendu générique dans l'article (`example.com`, IP fictives, `node-1`, modèles de matériel remplacés).
- **Applicatif perso hors DevOps** (arr, Recallarr, body_analysis, ytdl-sub-ui…) : écarté.
- **Seuil d'un sujet** : un candidat porte un article entier qui apprend quelque chose à un ingénieur DevOps extérieur : un outil mis en place, un mécanisme compris en le pratiquant, un problème non trivial résolu, avec un objectif, une solution et des contreparties à exposer. Test : quelqu'un qui ne connaît pas les dépôts de Seb chercherait-il ce titre ? Ne sont pas des sujets : un réglage, un correctif, un ajustement de seuil ou d'alerte, une option de plus sur un outil déjà couvert, le détail d'une config, un tutoriel d'installation.
- **Volume** : de zéro à trois candidats par passage. Une fenêtre sans candidat est un résultat normal : Seb ne fait pas un chantier structurant chaque semaine.
- **Sujet déjà partiellement couvert** : une suite ou un article de série seulement s'il passe le seuil ci-dessus, jamais une réécriture (le blog est une timeline, un ancien article ne se corrige pas).
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
5. **Livrer la liste** dans le chat : au plus trois candidats classés (titre au format `Famille : sujet`, catégorie, dépôt source, ce que l'article cherche à faire, comment, contreparties), puis sujets à venir, écartés et questions client éventuelles. Pas de rubrique « candidats faibles » : ce qui ne passe pas le seuil va dans les écartés, en une ligne. Sans candidat, le dire en deux lignes. Ne rien rédiger avant validation.
6. **Rédiger** chaque candidat validé avec le skill `blog-article` (structure, voix, code, relectures). Spécifique au passage :
   - un écart trouvé dans la config réelle en rédigeant ne se recopie pas dans l'article, et ne se remonte pas à Seb : ce dépôt écrit sur la tech, il ne la répare pas ;
   - dates hebdomadaires ou tous les ~3 jours après le dernier billet, dans l'ordre des dépendances entre articles, jamais dans le futur ;
   - mettre à jour la page projet concernée avec le skill `page-projet` (lien par permalien, limites devenues fausses retirées) ;
   - rattacher l'article à un sujet de `data/roadmap.ts`.
7. **Vérifier** sans build (il déclenche des OOM sur le poste de Seb) : contrôles légers du skill `blog-article`, et rendu sur le serveur de dev seulement s'il tourne déjà.
8. **Noter le passage** dans [history.md](history.md) : fenêtre, volume, rédigés, refusés, à venir.
9. **Commit / push** uniquement sur demande de Seb, en ne prenant que les fichiers du passage.
