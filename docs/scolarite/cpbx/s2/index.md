---
title: Cycle Préparatoire De Bordeaux - Semestre 2
---

import DossierHeader from "@site/src/components/DossierHeader";
import MatiereSection from "@site/src/components/MatiereSection";
import ResourceList from "@site/src/components/ResourceList";

<DossierHeader school="cpbx" crumbs={["CPBx", "Semestre 2"]} />

<MatiereSection icon="🧪" title="Chimie">

### Chimie Inorganique

Responsable : [Dany Carlier-Larregaray](https://www.icmcb-bordeaux.cnrs.fr/carlier-larregaray-dany/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Notions fondamentales 1", href: require("./chimie/inorga/diapo/1.pdf").default },
      { label: "Notions fondamentales 2", href: require("./chimie/inorga/diapo/2.pdf").default },
      { label: "Empilements compacts", href: require("./chimie/inorga/diapo/3.pdf").default },
      { label: "Sites interstitiels", href: require("./chimie/inorga/diapo/4.pdf").default },
      { label: "Limite de la stabilité", href: require("./chimie/inorga/diapo/5.pdf").default },
      { label: "Notes de cours", href: require("./chimie/inorga/cours.pdf").default },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "TD", href: require("./chimie/inorga/td.pdf").default }],
  },
]} />

### Chimie Organique

Responsable : [Denis Deffieux](http://www.sasn.u-bordeaux1.fr/annuaire/deffieux.html)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Partie A", href: require("./chimie/orga/1.pdf").default },
      { label: "Partie B", href: require("./chimie/orga/2.pdf").default },
      { label: "Partie C", href: require("./chimie/orga/3.pdf").default },
      { label: "Aide de cours", href: require("./chimie/orga/aide.pdf").default },
      { label: "Notes de cours", href: require("./chimie/orga/cours.pdf").default },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [
      { label: "TD — énoncé", href: require("./chimie/orga/td-enonce.pdf").default },
      { label: "TD — prise de note", href: require("./chimie/orga/td.pdf").default },
    ],
  },
]} />

</MatiereSection>

<MatiereSection icon="📐" title="Mathématiques">

### Analyse

Responsable : [Mouez Dimassi](https://www.math.u-bordeaux.fr/~mdimassi/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: require("./maths/ncours.pdf").default }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./maths/ntd.pdf").default }],
  },
]} />

### Algèbre

Responsable : [Eric Charpentier](https://www.math.u-bordeaux.fr/~echarpen/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: require("./maths/gcours.pdf").default }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./maths/gtd.pdf").default }],
  },
]} />

</MatiereSection>

<MatiereSection icon="🌀" title="Physique">

### Electrocinétique

Responsable : Mourad Aiche

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Régime Transitoire", href: require("./physique/elec/1.pdf").default },
      { label: "AOP", href: require("./physique/elec/2.pdf").default },
      { label: "Circuits électriques en régime transitoires", href: require("./physique/elec/3.pdf").default },
      { label: "Cours", href: require("./physique/elec/cours.pdf").default },
      { label: "Fiche", href: require("./physique/elec/fiche.pdf").default },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "TD — sujet", href: require("./physique/elec/td-sujet.pdf").default }],
  },
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "TD — correction", href: require("./physique/elec/td.pdf").default }],
  },
]} />

### Thermodynamique

Responsable : Daniel Blaudez

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Fiche", href: require("./physique/Fiche-Thermodynamique.pdf").default }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./physique/TD-Thermodynamique.pdf").default }],
  },
]} />

### Optique

Responsable : [Christine Grauby-Heywang](https://www.loma.cnrs.fr/christine-grauby-heywang/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Fiche", href: require("./physique/Fiche-Optique.pdf").default }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./physique/TD-Optique.pdf").default }],
  },
]} />

### Electromagnétisme

Responsable : [Jérome Cayssol](https://www.loma.cnrs.fr/jerome-cayssol/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: require("./physique/Cours-Electromagnétisme.pdf").default }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./physique/TD-Electromagnétisme.pdf").default }],
  },
]} />

### Travaux Pratiques

Pour l'instant les travaux pratiques du semestre 2 n'ont pas changés depuis 10
ans. Faites attention à la partie mécanique, la théorie est juste mais la
pratique possède plusieurs défaut. En plus une proposition du compte rendu à
faire sur le deuxième TP d'optique.

<ResourceList groups={[
  {
    type: "support",
    title: "Supports",
    items: [
      { label: "Proposition de solution", href: require("./physique/TP.pdf").default },
      { label: "Compte rendu — TP optique", href: require("./physique/optique.pdf").default },
    ],
  },
]} />

</MatiereSection>
