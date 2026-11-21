---
name: roadmap
description: Suivi de la roadmap DevOps (data/roadmap.ts, src/pages/roadmap/AAAA.mdx) au fil de l'année - point d'avancement face aux objectifs, travail imprévu à intégrer, nouvelle idée à ranger, rétrospective de décembre, objectifs de janvier. À utiliser dès que Seb parle de sa roadmap, de ses objectifs de l'année, d'une idée d'apprentissage ou de projet, de bilan ou de rétrospective, ou demande où il en est.
---

# Roadmap : suivi au fil de l'année

La roadmap montre ce que Seb pratique, domaine par domaine, et ce qu'il vise chaque année. Les sujets et leur état viennent de `data/roadmap.ts` et des articles ; chaque page `src/pages/roadmap/AAAA.mdx` porte les objectifs écrits en janvier et la rétrospective écrite en décembre, à la première personne. Les conventions du `CLAUDE.md` (section Roadmap) s'appliquent.

Le skill sert cinq moments. Tous commencent par l'état réel :

```bash
python3 -I .claude/skills/roadmap/status.py [AAAA] [--today AAAA-MM-JJ]
```

Le script lit les mêmes sources que le site : articles publiés et programmés de l'année, articles non commités (comptés en local, absents du site en ligne), sujets travaillés par domaine (objectif ou hors objectif), sujets encore à venir dans les domaines visés, articles rattachés à aucun sujet, références cassées. L'état « en cours » d'un sujet veut seulement dire que son dernier article a moins de deux mois : il ne dit rien de l'avancement d'un objectif.

Le [journal](journal.md) garde ce qui ne se voit ni dans le dépôt ni dans le blog : idées, intentions, travail sans article, verdicts de Seb. Chaque moment y ajoute une entrée datée de quelques lignes, écrite après la réponse de Seb (une question restée sans réponse y figure comme « en attente ») ; la rétrospective et les objectifs de janvier partent de lui.

## Règles communes

- **Les objectifs de janvier ne se réécrivent pas.** Un objectif abandonné, dépassé ou réorienté se dit dans la rétrospective. Seule la `description` du frontmatter suit l'état de la page.
- **Faits sourcés** : un article, une page projet, un dépôt, le journal ou Seb. Une rétrospective ne cite que ce qui est publié (commité, date passée).
- **Le nommage est un choix de Seb** : nouveau sujet, nouveau libellé, regroupement, nouveau domaine se proposent avant d'être écrits. Rattacher un article à un sujet existant n'en est pas un : quand Seb demande une mise à jour, cela se fait directement.
- **Sources du travail réel** : pages projets, journal, articles, et l'historique git des projets sources nommés dans le `CLAUDE.md` sur la période, dont on ne garde que le DevOps.
- **Logiciels libres ou gratuits** : une piste payante (certification, formation, service) se signale comme telle, sans la recommander.
- Pas de ratio ni de pourcentage d'avancement, pas de build.

## Point d'avancement (à tout moment)

1. Lancer le script, lire la page de l'année et le journal.
2. Rendre un point court, objectif par objectif : fait, en cours, pas commencé, avec la preuve (article, page projet). Puis le travail hors objectif en une ligne par domaine, et les anomalies du script (orphelins, références cassées).
3. Proposer, sans les faire, les mises à jour qui s'imposent (voir Imprévu) et noter dans le journal ce que Seb tranche.

Le point tient en une quinzaine de lignes : pas de tableau qui recopie la sortie du script.

## Imprévu

Travail réel qui n'était pas dans les objectifs ou qui n'a pas d'article :

- **Avec article** : le rattacher à un sujet existant de `data/roadmap.ts` ; si aucun sujet ne convient, proposer un libellé dans le domaine qui va.
- **Sans article** mais pratiqué pour de vrai (outil en production, chantier livré) : proposer un sujet avec `status: "acquis"` et `since`, ou `status: "en cours"`. Sans année sûre, demander à Seb.
- **Simple essai** ou lecture : rien dans la roadmap, une ligne dans le journal.
- Toujours une entrée au journal : c'est la matière de la rétrospective.

## Nouvelle idée

Seb a une envie (un outil, une certification, un projet) :

1. **Situer** : le sujet existe-t-il déjà dans `data/roadmap.ts`, à venir ou pratiqué ? Dans quel domaine irait-il sinon ? Une certification ou un projet n'est pas un sujet : il sert un ou plusieurs sujets.
2. **Terrain** : sur quel projet réel (pages `docs/projects/`) l'idée se pratiquerait, et ce qu'elle y changerait. Une idée sans terrain se dit telle quelle.
3. **Coût et dépendances** : ce qu'elle suppose d'abord (un autre sujet, une migration), ce qu'elle coûte (argent, temps d'exploitation), ce qu'elle débloque.
4. **Ranger** : cette année si elle sert un objectif en cours et que l'année laisse le temps de la pratiquer, sinon candidate pour janvier. Noter l'idée au journal avec la conclusion. Un nouveau sujet « à venir » se propose seulement si Seb veut l'afficher dès maintenant.

Avis franc, en quelques lignes : une idée qui disperse ou qui duplique un sujet déjà couvert se dit.

## Rétrospective (décembre)

1. Lancer le script, relire les objectifs de la page, les entrées de l'année du journal et les pages projets concernées.
2. **Poser à Seb, avant d'écrire**, une seule liste de questions : son verdict sur chaque objectif dont le script ne dit pas tout (atteint, partiel, abandonné, et pourquoi), ce qu'il retient de l'année, les domaines hors objectif qui méritent un mot, les points absents des sources. Un article non commité reste hors du texte tant qu'il n'est pas en ligne. Écrire sans réponse donne un texte qui résume les pages projets.
3. Écrire, sur le modèle de `2025.mdx` :
   - remplacer la phrase d'attente par une à trois phrases qui donnent le bilan d'ensemble ;
   - un `<Retro domain="NN">` par domaine visé, plus les domaines hors objectif que Seb a retenus ; deux à quatre phrases chacun : ce qui a été fait face à l'objectif, sur quel projet (lien), ce qui manque et pourquoi, l'imprévu marquant ;
   - pas de chiffre ni de liste d'articles que le composant affiche déjà, pas de détail technique qui relève de la page projet ;
   - mettre à jour la `description` (« objectifs … et rétrospective de l'année »).
4. Humanizer en mode fichier (première personne, ne toucher ni aux composants MDX ni aux liens), puis entrée au journal.

## Objectifs (janvier)

La demande arrive souvent en décembre avec la rétrospective : les candidats se préparent alors, la page se crée quand Seb a choisi.

1. Rassembler les candidats : idées et intentions du journal, objectifs non atteints de la rétrospective, sujets à venir, limites connues des pages projets. Un candidat sans terrain dans un projet réel est présenté comme tel, en fin de liste.
2. **Les présenter à Seb** en liste courte, chacun avec son domaine, son terrain et son coût. Seb choisit : aucun objectif n'est écrit à sa place, même au conditionnel.
3. Créer `src/pages/roadmap/AAAA.mdx` sur le modèle de l'année précédente : frontmatter (`description` qui nomme les objectifs), `<YearSummary>`, un paragraphe d'intention, un `<Objective domain="NN">` par domaine visé (le composant affiche les sujets du domaine sous l'encart, donc deux objectifs d'un même domaine partagent un encart), une ou deux phrases concrètes par objectif avec le projet qui servira de terrain, puis la section Rétrospective avec sa phrase d'attente et `<Retrospective year={AAAA} />`.
4. Navigation : `RoadmapYears` (`src/components/Roadmap/Year.tsx`) liste les années jusqu'à l'année en cours au moment du build. Une page créée en décembre pour l'année suivante n'apparaît donc qu'au premier build de janvier, et le lien de l'année en cours mène à une 404 tant que sa page n'existe pas : la créer dès janvier.
5. Humanizer, puis entrée au journal.

## Compte rendu

Ce qui a été lu, ce qui est proposé, ce qui a été écrit, les questions à Seb. Rien n'est commité sans sa demande.
