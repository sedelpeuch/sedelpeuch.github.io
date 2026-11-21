---
name: page-projet
description: Création ou mise à jour d'une page projet (docs/projects/{professionnel,associatif,personnel}/*.md) - fiche ProjectMeta, contexte, décisions, résultats, limites, liens vers le blog. À utiliser dès qu'une page projet est à créer, à compléter après un nouveau chantier ou un nouvel article, ou à relire, y compris depuis les skills blog-update et blog-article.
---

# Page projet : création et mise à jour

Une page projet est un portfolio technique lu par des recruteurs et des clients : ce qui a été construit, pourquoi, avec quelles décisions, quels résultats et quelles limites. Elle est écrite à la première personne (« J'ai mis en place… »), sur un ton professionnel et factuel. Les conventions du `CLAUDE.md` (section Projets) s'appliquent ; ce skill les précise.

## Règle des faits

Chaque fait de la page (outil, chiffre, date, alerte, test, résultat, limite, membre de l'équipe) vient d'une source : la demande de Seb, le dépôt du projet, ses issues et PR (`gh`), un article du blog, ou la page elle-même. Avant d'écrire, dresser la liste des faits disponibles avec leur source.

Un fait absent de cette liste ne s'écrit pas : ni outil supposé (un CNI, un fournisseur de stockage), ni alerte ou test supposés, ni résultat (« aucun échec depuis »), ni limite imaginée. Les questions ouvertes sont posées à Seb en une liste à la fin du travail, et la page reste muette sur ces points en attendant.

## La fiche `<ProjectMeta />`

`plugins/projects-data` la lit par expression régulière : props en chaînes entre guillemets doubles, `stack={[...]}` en JSON valide (guillemets doubles, pas de virgule finale). Sans `start`, la page disparaît des index.

```mdx
<ProjectMeta start="2024" role="Conception et exploitation" domain="Infrastructure" stack={["Kubernetes", "Helm"]} />
```

- `end` absent : projet en cours ou toujours maintenu (un outil en service n'a pas de `end`).
- `end` posé : projet arrêté ou livré et plus touché ; `end` égal à `start` : événement ponctuel (compétition, mission courte).
- `status="en pause"` : projet suspendu.
- `stack` : technologies structurantes, nommées comme dans `src/components/techIcons.ts` pour avoir une icône (un nom absent s'affiche en texte, c'est permis).

## Création

Dans cet ordre :

1. Frontmatter : `title`, `description` (une à deux phrases pour le référencement, sans énumération), `tags` techniques.
2. Image d'illustration facultative (`<img>` avec style inline, comme les pages récentes), puis `<ProjectMeta />`.
3. `## Contexte` : le problème métier ou le besoin avant la solution, les solutions existantes écartées et pourquoi, la période et mon rôle. Un à trois paragraphes.
4. Le corps, selon la taille du projet :
   - petit projet : `## Réalisations` ;
   - projet plus riche : `## Architecture` (diagramme Mermaid si les composants sont nombreux), puis une section H2 par axe, ou des `Tabs` (un onglet par axe ou par capture d'écran).
   Chaque choix structurant est justifié par son mécanisme et l'alternative écartée (« J'ai retenu X parce que…, Y a été écarté car… »). Un projet riche en choix peut les regrouper dans `## Décisions techniques`.
5. Projet professionnel en équipe : `## Mon rôle` ou `## Équipe`, avec la part de chacun ; les collègues sont anonymisés (« un collègue », « deux stagiaires »), les parts chiffrées quand elles sont mesurables (« 320 des 420 commits »).
6. `## Résultats` : ce qui a changé, mesuré quand c'est possible, en phrases. Pas de liste à libellés en gras, pas de chiffre déjà donné dans le corps, pas de résultat non vérifié.
7. `## Limites connues` : ce qui ne marche pas encore ou ne marchera pas, ce qui reste à faire. Facultatif pour un projet clos sans limite notable.
8. `## Liens` : dépôts, articles, sites, en liste. Dépôt privé : le dire (« Le dépôt est privé. »). Suivre l'usage des pages de la même catégorie pour les emoji en préfixe.

Pas de section de liste de technologies (`tech-list`, « Stack technique ») qui répète la fiche : une technologie se cite là où son choix est expliqué.

Professionnel : aucun nom de client, de donnée ou d'architecture client qui ne soit déjà public ; un client se décrit par son métier (« une entreprise de contrôle automatisé »). Associatif : page courte (Contexte, Réalisations, Résultats, Liens), crédits nominatifs déjà présents conservés.

## Mise à jour

Une page se tient à jour comme une documentation, pas comme un journal :

- **Où** : le nouveau travail s'insère dans la section thématique qu'il concerne (ou une nouvelle section H2 si c'est un nouvel axe), jamais en bas de page en changelog.
- **Ce qui remplace** : décrire l'état actuel, puis l'ancien état en une phrase avec la raison du changement (« Jusqu'en septembre 2026, chaque service avait… ; je l'ai remplacé par… parce que… »).
- **Dates** : seulement pour un changement d'état du projet, et pas en tête de chaque paragraphe ; au-delà de trois ou quatre « En octobre 2026, j'ai… », reformuler.
- **À revoir à chaque mise à jour** : `description` et `stack` si une technologie entre ou sort, le diagramme d'architecture, `## Résultats`, et chaque point de `## Limites connues` : retirer ce qui est devenu faux, dater ce qui reste ouvert.
- **Périmètre** : une mise à jour réécrit les passages qu'elle concerne, plus `## Résultats` et `## Limites connues` ; les défauts du texte existant ailleurs dans la page (avertissements du script compris) se signalent dans le compte rendu sans être corrigés, sauf demande de Seb.
- **Article lié** : lien par permalien `/blog/AAAA/MM/JJ/<dossier>/<slug>`, texte du lien = titre de l'article, intégré à une phrase qui dit ce que l'article approfondit. Les pages projets entre elles se lient en relatif `.md`.

## Ton et tics à proscrire

Première personne pour ce que j'ai fait, sujet impersonnel pour ce que fait le système. Pas d'enthousiasme ni de vocabulaire commercial (`significatif`, `robuste`, `livré en une journée` comme argument). À proscrire aussi :

- les aphorismes en fin de paragraphe (« Une sauvegarde non restaurée n'est qu'une hypothèse ») ;
- les contrastes « pas X mais Y » ;
- les formules répétées (« Le détail est dans l'article… » à chaque section) ;
- le gras d'emphase au milieu des phrases et des puces ;
- les tirets cadratins.

Une liste de décisions en `**Choix.** justification` reste permise (modèle : `professionnel/crob.md`).

## Exemples de référence

`professionnel/crob.md` (rôle, décisions justifiées, limites datées), `professionnel/minipock.md` (parts mesurables, équipe), `personnel/colis-tracker.md` (contexte, alternatives écartées, limites honnêtes).

## Relectures (obligatoires, dans cet ordre)

1. **Faits** : relire la page en face de la liste des faits ; tout ce qui n'y figure pas est retiré ou passe dans les questions à Seb.
2. **Contrôles mécaniques** : `python3 -I .claude/skills/page-projet/check.py <page>`. Corriger les erreurs ; chaque avertissement est soit corrigé, soit justifié dans le compte rendu (une `end` voulue, une icône manquante acceptée).
3. **Humanizer** : skill `humanizer` en mode fichier sur les passages écrits ou modifiés, en lui rappelant : première personne, ton professionnel, ne toucher ni au frontmatter, ni à `<ProjectMeta />`, ni aux composants MDX, ni aux cibles de liens.
4. **Pas de build** (OOM sur le poste) : rendu vérifié seulement si un serveur de dev tourne déjà.
5. **Compte rendu** : ce qui a changé, les avertissements gardés, les questions à Seb.
