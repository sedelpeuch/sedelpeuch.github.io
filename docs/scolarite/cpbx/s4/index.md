---
title: Cycle Préparatoire De Bordeaux - Semestre 4
---

import DossierHeader from "@site/src/components/DossierHeader";
import MatiereSection from "@site/src/components/MatiereSection";
import ResourceList from "@site/src/components/ResourceList";

<DossierHeader school="cpbx" crumbs={["CPBx", "Semestre 4"]} />

<MatiereSection icon="💻" title="Informatique" responsable={{ name: "Frantisek Kardos", href: "https://www.labri.fr/index.php?n=Annuaires.Profile&id=Kardos_ID1346656366" }}>

Au semestre 4 le cours d'informatique propose de mettre en place un jeu de votre
choix (dont le thème change chaque année !). Pour ces qui sont les plus
intéressé (souvent les ENSEIRB-Info) c'est une occasion de réaliser un projet
complet en informatique. Ne foncez surtout pas tête baissée, prenez le temps de
réflechir à comment va s'organiser les fichiers, les fonctions etc. Amusez vous !

</MatiereSection>

<MatiereSection icon="📐" title="Mathématiques">

### Calcul différentiel

Responsable : [Patrick Fisher](https://www.math.u-bordeaux.fr/~pfischer/Welcome.html)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Notes de cours", href: require("./maths/diff.pdf").default },
      { label: "Fiche — Séries de Fourier", href: require("./maths/fourier.pdf").default },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./maths/diff-td.pdf").default }],
  },
]} />

### Calcul Intégral

Responsable : [Nicolas Popoff](https://www.math.u-bordeaux.fr/~npopoff/)

Attention, les notes de TD ne sont plus à jour.

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Notes de cours", href: require("./maths/int.pdf").default },
      { label: "Fiche", href: require("./maths/int-fiches.pdf").default },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./maths/int-td.pdf").default }],
  },
]} />

### Probabilité

Responsable : Hervé Joint

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: require("./maths/proba.pdf").default }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./maths/proba-td.pdf").default }],
  },
]} />

</MatiereSection>

<MatiereSection icon="🌀" title="Physique">

### Physique Quantique & Relativité

Responsable : Daniel Blaudez

Le sujet du DM change chaque année, la version fournie est indicative.

<ResourceList groups={[
  {
    type: "td",
    title: "Travaux dirigés",
    items: [
      { label: "Notes de TD", href: require("./physique/rel-quant.pdf").default },
      { label: "DM", href: require("./physique/dm.pdf").default },
    ],
  },
]} />

### Mécanique des fluides

Responsable : Jean Stéphane Baste

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Fiche", href: require("./physique/meca.pdf").default },
      { label: "Prise de notes", href: require("./physique/meca-cours.pdf").default },
    ],
  },
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "Premiers exercices", href: require("./physique/meca-td.pdf").default }],
  },
]} />

### Optique

Responsable : [Pierre Langot](https://www.loma.cnrs.fr/pierre-langot/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Fiche", href: require("./physique/Optique-fiches.pdf").default }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./physique/opt-td.pdf").default }],
  },
]} />

</MatiereSection>

<MatiereSection icon="🗂️" title="Projet">

Au semestre 4 le projet est un élément central. Ils peuvent totalement sauver
le semestre car ils fournissent des notes en LCO, Anglais mais aussi dans l'UE
projet (coefficient 6). Voici quelques exemples de projet qui ont marché les
années précendentes, vous pouvez les parcourir pour voir ce qui est attendu ou
juste par curiosité. Les différents professeurs ont différentes attentes qu'il
faut respecter.

**L'utilisation des Interfaces Cerveau-Machine dans la communication écrite**

<ResourceList groups={[
  {
    type: "projet",
    title: "Documents du projet",
    items: [
      { label: "Article Scientifique", href: require("./projet/article.pdf").default },
      { label: "Avant projet diaporama", href: require("./projet/article-diap.pdf").default },
      { label: "Avant projet", href: require("./projet/avant-projet.pdf").default },
      { label: "Avant synthèse", href: require("./projet/avant-synthese.pdf").default },
      { label: "Avant synthèse diaporama", href: require("./projet/avant-synthese-diap.pdf").default },
      { label: "Corpus", href: require("./projet/corpus.pdf").default },
      { label: "Rédaction", href: require("./projet/redac.pdf").default },
      { label: "Mémoire", href: require("./projet/memoire.pdf").default },
      { label: "Soutenance", href: require("./projet/soutenance.pdf").default },
      { label: "Questions", href: require("./projet/questions.pdf").default },
    ],
  },
]} />

</MatiereSection>
