---
name: blog-article
description: Rédaction ou reprise d'un article du blog (blog/**/AAAA-MM-JJ-*.md) - structure, voix impersonnelle, place du code, titres, relectures humanizer et lecteur neuf. À utiliser dès qu'un article de blog est à écrire, réécrire ou relire avant livraison, y compris depuis le skill blog-update.
---

# Rédiger un article du blog

Un article explique un mécanisme à un ingénieur DevOps qui sait coder et administrer des systèmes mais découvre le sujet. Il répond toujours à trois questions : ce qu'on cherche à obtenir, comment l'outil ou la technique l'obtient, ce que cela coûte (limites, pièges, alternatives écartées). Ce n'est ni un tutoriel ni une fiche de configuration : le lecteur doit comprendre assez pour décider et configurer seul avec la documentation officielle.

Les conventions du `CLAUDE.md` (frontmatter, nommage, séries, liens, typographie) s'appliquent ; ce skill les précise et les fait respecter.

## Avant d'écrire

- **Le sujet tient un article** : un outil, un mécanisme ou un problème non trivial, avec des contreparties à exposer. Un réglage, une option ou un correctif isolé n'en sont pas.
- **Les faits viennent de la doc officielle**, vérifiée pour chaque valeur par défaut, nom d'option et comportement cité. Les notes des projets sources contiennent des approximations. Sans accès web, lister dans le compte rendu les affirmations non vérifiées : l'article n'est pas livrable tant qu'elles ne le sont pas.
- **Les faits du projet viennent du projet** : l'article ne décrit comme réalisé que ce que le dépôt, la page projet ou Seb attestent.
- **Anonymisation** : `example.com`, IP fictives, `node-1`, aucun nom de cluster, de client, de personne, de matériel, de gist ou d'URL réelle dans le corps. Un projet client ne doit pas être devinable. Seule exception : le `title` d'un `<ProjectLink>` reprend tel quel le titre de la page projet, déjà publique.
- **Lire deux articles de référence** avant le premier jet pour caler le ton : `blog/11-security/2026-10-27-docker-in-docker-securite.md`, `blog/03-containerization/2026-10-31-docker-cache-buildkit.md` (autres bons exemples : `10-git/2026-10-29-github-rulesets.md`, `06-orchestration/2026-10-20-kubernetes-sauvegarde-cronjob.md`, `07-monitoring/2026-10-23-linux-kdump-watchdog.md`).

## Place dans le blog

À décider avant le premier jet, et à dire dans le compte rendu avec la raison :

- **Déjà couvert ?** Chercher le sujet dans le blog (`grep -ril`) : un article qui recoupe une section existante l'approfondit et le dit, sinon il n'a pas lieu d'être.
- **Catégorie** : le dossier (`06-orchestration/`…) est la catégorie principale et fixe l'URL ; il ne change plus après publication. Entre deux catégories plausibles, prendre celle de l'objet que l'outil manipule (Velero sauvegarde un cluster : orchestration, même si la cible est S3). Les `tags` reprennent la catégorie du dossier, celles que l'article traite vraiment (pas celles qu'il mentionne en passant), et `devops`.
- **Série** : une série couvre un outil trop vaste pour un seul article, lu dans l'ordre (liste dans `LABELS` de `plugins/series-data/index.js`, catalogue sur `/blog/series`). L'article y entre s'il fait partie du parcours de cet outil ; un outil voisin reste hors série (Longhorn ou Kured ne sont pas dans la série Kubernetes, qui en couvre les fondamentaux). Une nouvelle série s'ouvre seulement pour un outil qui demandera plusieurs articles, avec son libellé et sa présentation dans `LABELS` et `DESCRIPTIONS`. Jamais de série par domaine ni par projet. Dans une série, la date suit l'ordre du parcours ; `series_order` départage deux articles du même jour. Un article qui élargit le périmètre d'une série met sa présentation (`DESCRIPTIONS`) à jour.
- **Voisins** : quand l'article s'appuie sur un article précédent de sa série ou de sa catégorie, une phrase y renvoie (lien relatif `.md` dans le blog). Pas de lien vers un brouillon ou un article daté dans le futur.
- **Roadmap** : rattacher l'article à un sujet de `data/roadmap.ts` avec le skill `roadmap`.

## La forme d'un article

Dans cet ordre :

1. **Frontmatter** : `title` au format `"Famille : sujet"` (ou le nom seul de l'outil pour un article d'introduction), `description` en une ou deux phrases de 250 caractères au plus qui posent le problème et la réponse sans énumérer les sections, `tags` et `series` tels que décidés plus haut. `title` et `description` entre guillemets doubles. Jamais de champ `authors`.
2. **Introduction** : un seul paragraphe de 70 à 150 mots, en trois temps : une situation concrète, ce qui coince avec l'approche naïve, ce que l'outil ou la technique apporte. Puis `<!--truncate-->`.
3. **Corps** en sections H2 (H3 si besoin), de 1 200 à 2 500 mots au total, qui couvrent dans l'ordre :
   - le concept et le problème précis qu'il résout ;
   - le mécanisme : ce qui se passe réellement (qui décide, quand, avec quel état) ;
   - la mise en œuvre décrite en prose : les choix à faire et ce que chaque réglage change (`--lock-ttl` libère un verrou orphelin après…), pas la recette ;
   - les contreparties : ce qui casse, les cas où l'outil ne convient pas, ce qu'il coûte en exploitation ;
   - les alternatives écartées, chacune avec la raison de l'écarter dans ce contexte.
   La section des contreparties s'appelle `Limites` ou `Pièges et limites`.
4. **Conclusion** : un paragraphe qui dit dans quels cas la technique vaut sa contrepartie. Elle ne récapitule pas le plan.
5. **`## Ressources utiles`** (facultatif) : documentation officielle et sources, en liste de liens.
6. **`## Application / Projet lié`** avec `<ProjectLinks><ProjectLink to="/docs/projects/…" title="…">…</ProjectLink></ProjectLinks>` : une phrase par projet sur ce que l'article y met en pratique (plusieurs `<ProjectLink>` donnent une grille de cartes ; période et stack sont lues dans la fiche du projet). La page projet elle-même se met à jour avec le skill `page-projet`.

## Titres

Le titre et les intertitres nomment le contenu, sobrement : `La fenêtre de maintenance`, `Un nœud à la fois : le verrou`, `Drain et volumes à copie unique`. Une affirmation est bienvenue quand elle porte l'idée de la section.

Ne s'écrivent pas : les questions racoleuses (`Pourquoi votre cluster est en danger ?`), les majuscules d'emphase (`CE que ça doit faire`), les promesses (`Tout savoir sur`, `Le guide ultime`, `expliqué simplement`), les superlatifs, les emoji, les sections de tutoriel (`Prérequis`, `Installation`, `Étape 1`, `Utilisation`, `Bonnes pratiques`, `Exemple complet`, `Configuration complète`).

## Voix

Impersonnel et factuel. Le sujet des phrases est l'outil, le mécanisme, l'administrateur ou la commande. Aucun « je », « tu », « vous », « nous », « on ». Aucun jugement de valeur ni enthousiasme (`simple`, `puissant`, `génial`, `indispensable`) : la contrepartie chiffrée ou décrite remplace l'adjectif. Une analogie concrète au plus par article, si elle éclaire un concept abstrait.

## Code

Le texte explique, le code n'illustre qu'une syntaxe. Un bloc de code montre l'extrait dont parle la phrase qui le précède, quand la syntaxe elle-même est le point expliqué (une indentation qui change le sens d'une règle, le format d'une expression, la ligne qui active une option). **Chaque bloc fait 5 lignes au plus, et l'article en compte une vingtaine de lignes en tout au plus.** Les options, champs et commandes isolés se citent en code inline dans une phrase.

N'entrent pas dans un article : manifeste Kubernetes, `values.yaml`, workflow, unité systemd, Dockerfile ou script complets, sortie de commande, commande d'installation, bloc suivi d'une paraphrase ligne à ligne. Un fichier de configuration se réduit aux quelques lignes qui portent le mécanisme.

Un seul schéma est permis s'il montre un flux ou une séquence que la prose rend mal : bloc `text` ou Mermaid. Un bloc `text` qui contient une configuration, des options, une expression régulière ou une commande est du code et compte comme tel. Les tableaux comparatifs sont permis. Tout bloc porte un langage (`text` pour un schéma ASCII ou un langage absent de Prism).

## Tics à proscrire

- listes dont chaque puce commence par une phrase ou un libellé en gras (`- **Sondes de santé.** …`) : écrire des phrases sans gras. Seule exception, une liste d'options ou de valeurs dont le libellé est le nom en code (`- **`mode=max`** : …`) ;
- contrastes « pas X mais Y », « X, pas Y » en série ;
- tiret cadratin ou demi-cadratin ;
- description de frontmatter qui énumère toutes les sections ;
- conclusion qui répète le plan, formules `En résumé`, `Il est important de noter` ;
- la même tournure de contrepartie répétée (`au prix de`, `en contrepartie`).

## Relectures (obligatoires, dans cet ordre)

1. **Contrôles mécaniques** : `python3 -I .claude/skills/blog-article/check.py <article>`. Corriger tout ce qui est signalé.
2. **Humanizer** : invoquer le skill `humanizer` en mode fichier sur l'article, en lui rappelant : voix impersonnelle sans pronom personnel, blog technique, ne toucher ni au frontmatter, ni aux blocs de code, ni aux cibles de liens, ni aux composants MDX.
3. **Lecteur neuf** : lancer un sous-agent sans contexte (modèle Opus) avec le prompt ci-dessous, puis appliquer les retours fondés et relancer les contrôles mécaniques. Verdict « à reprendre » : après la reprise, relancer un nouveau lecteur. Si un sous-agent ne peut pas être lancé, le dire dans le compte rendu : la relecture n'est pas faite.

   > Tu es un ingénieur DevOps expérimenté qui ne connaît pas ce sujet. Lis l'article `<chemin>` en entier comme un lecteur de blog technique, sans complaisance. Réponds en français, en moins de 300 mots : (1) Après l'introduction, as-tu envie de lire la suite ? Pourquoi ? (2) Qu'as-tu appris que la documentation officielle ne dit pas aussi clairement ? (3) L'objectif, le mécanisme et les contreparties sont-ils clairs ? Qu'est-ce qui manque ? (4) Cite les passages qui sonnent comme un tutoriel, une plaquette commerciale, du remplissage ou un texte généré, et les blocs de code qui ne servent pas la compréhension. (5) Verdict : publiable tel quel, à retoucher (dis où), ou à reprendre.

4. **Pas de build** (il provoque des OOM sur le poste) : rendu vérifié seulement si un serveur de dev tourne déjà.

## Reprise d'un article existant

Le blog est une timeline : un article publié ne se corrige pas pour suivre l'état actuel d'un projet, sauf demande explicite. Un brouillon (`_` en préfixe) ou un article non publié se reprend avec ce skill comme un nouvel article.
