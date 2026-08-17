# Refonte visuelle — docs/scolarité

## Contexte

`docs/scolarite/` regroupe les cours/TD/corrections du parcours académique
(CPBx 2017–2019, ENSEIRB 2019–2022), organisés en
`École > Semestre > Matière`. Actuellement : pages de catégorie (école,
semestre) via `DocCardList` par défaut de Docusaurus (grille de cards
neutres, sans icône ni info de contenu) ; pages de matière en listes de
liens Markdown à plat (`[TD1](...)`, `[1](...)`, tableaux bruts),
difficiles à scanner sur les pages denses (ex. `cpbx/s1/index.md` : ~50
liens plats).

Objectif : refonte du *look* uniquement. Hiérarchie de contenu, chemins de
fichiers, PDF et liens restent identiques. Réorganisation *interne* d'une
page autorisée si ça améliore la lisibilité (regroupement par type de
ressource), mais aucun contenu ne disparaît ni n'est déplacé entre pages.

Preview validée : https://claude.ai/code/artifact/04044016-b3c6-43bb-b3c7-9be21bbcde6f

## Portée

- **Dans le scope** : pages sous `docs/scolarite/**` (index école/semestre,
  pages matière). Nouveaux composants React partagés. Ajout de tokens CSS
  dans `src/css/custom.scss`.
- **Hors scope** : autres sections du site (`blog/`, `docs/projects/`,
  `docs/enseignement/`). Pas de changement de plan de fichiers/URLs. Pas
  de nouveaux PDF ni de contenu pédagogique.

Taille du chantier : 89 dossiers, 173 fichiers `.md` sous `docs/scolarite/`
— dont une partie sont des index de catégorie (auto `DocCardList`) et le
reste des pages de matière à reformater. Chantier volumineux, à découper
en lots par le plan d'implémentation (probable parallélisation par
école/semestre, fichiers indépendants).

## Design

### Palette

Aucune nouvelle palette globale — réutilisation des tokens existants de
`src/css/custom.scss` (`--ifm-color-primary` #12affa, etc., déjà adaptés
clair/sombre). Deux tokens ajoutés pour distinguer les écoles :

- `--school-cpbx: #f5a623` (ambre) — CPBx
- `--school-enseirb: var(--ifm-color-primary)` (bleu déjà existant) — ENSEIRB

Chaque token doit avoir une variante lisible en mode sombre (voir preview :
fonds de badge assombris, texte clarifié).

### Typographie

Inchangée — `misans` / `system-ui` du thème. Aucun ajout de police.

### Composants (nouveaux, partagés)

1. **`SubjectCard`** (`src/components/SubjectCard/`) — remplace le rendu
   par défaut de `DocCardList` sur les pages de catégorie. Affiche icône
   (iconify), nom, décompte de ressources ("9 cours · 9 TD · 1
   correction"), bordure gauche colorée par école. Alimenté par
   `customProps` dans `_category_.json` (icône + école) plutôt que par
   édition manuelle de chaque page — évite de toucher aux ~89 pages
   d'index une par une.
2. **`ResourceList`** (`src/components/ResourceList/`) — remplace les
   listes de liens à plat sur les pages de matière. Regroupe les
   ressources par type (Cours / TD / Correction / Projet), icône par
   groupe, compteur. Prend une liste `{ label, href, type }` en prop MDX.
3. **`DossierHeader`** (`src/components/DossierHeader/`) — bandeau en tête
   de page matière : fil d'Ariane visuel École › Semestre › Matière (onglet
   coloré par école) + responsable du cours + pills de comptage. Sert de
   repère de hiérarchie constant même sur les pages longues.

### Layout

- **Page de catégorie** (école/semestre) : grille responsive de
  `SubjectCard` (`repeat(auto-fit, minmax(220px,1fr))`), remplace
  `<DocCardList />`.
- **Page de matière** : `DossierHeader` en haut, puis un ou plusieurs blocs
  `ResourceList` groupés par type de ressource. Le regroupement par type
  remplace l'ordre de lecture à plat, mais chaque lien/PDF reste
  strictement le même.

### Accessibilité / thèmes

Les deux composants doivent respecter les tokens clair/sombre existants
(`html[data-theme='dark']` dans `custom.scss`), focus clavier visible sur
les cards et items de ressource, `prefers-reduced-motion` respecté pour les
micro-transitions (`translateY` au hover).

## Risques

- Contenu très hétérogène par matière (certaines pages ont des tableaux,
  d'autres des listes plates, d'autres des sous-titres H3 par sous-thème)
  → le regroupement par type de ressource doit être fait manuellement par
  page, pas par script générique de remplacement.
- Volume élevé (173 fichiers) → risque d'erreurs de copier-coller de liens
  PDF si fait sans vérification. Le plan d'implémentation doit prévoir une
  vérification (diff des liens avant/après) par lot.
- `_category_.json` n'existe peut-être pas encore pour tous les dossiers —
  à créer où absent.
