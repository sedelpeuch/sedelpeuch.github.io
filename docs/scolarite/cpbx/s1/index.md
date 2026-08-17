---
title: Cycle Préparatoire De Bordeaux - Semestre 1
---

import DossierHeader from "@site/src/components/DossierHeader";
import MatiereSection from "@site/src/components/MatiereSection";
import ResourceList from "@site/src/components/ResourceList";

<DossierHeader school="cpbx" crumbs={["CPBx", "Semestre 1"]} />

<MatiereSection icon="🧪" title="Chimie" responsable={{ name: "Frédéric Castet", href: "http://theo.ism.u-bordeaux.fr/~castet/teaching.html" }}>

Une version des TD à utiliser avec précaution.

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "1- L'avènement de la physique quantique", href: require("./img/chimie/cours/1.pdf").default },
      { label: "2- L'organisation des électrons dans l'atome", href: require("./img/chimie/cours/2.pdf").default },
      { label: "3- La classification périodique", href: require("./img/chimie/cours/3.pdf").default },
      { label: "4- Le modèle de lewis", href: require("./img/chimie/cours/4.pdf").default },
      { label: "5- Le modèle VSEPR", href: require("./img/chimie/cours/5.pdf").default },
      { label: "6- Orbitales hybriques", href: require("./img/chimie/cours/6.pdf").default },
      { label: "7- Intéractions intermoléculaires", href: require("./img/chimie/cours/7.pdf").default },
      { label: "8- Les différents états de la matière", href: require("./img/chimie/cours/8.pdf").default },
      { label: "9- Les cristaux", href: require("./img/chimie/cours/9.pdf").default },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [
      { label: "TD 1", href: require("./img/chimie/1.pdf").default },
      { label: "TD 2", href: require("./img/chimie/2.pdf").default },
      { label: "TD 3", href: require("./img/chimie/3.pdf").default },
      { label: "TD 4", href: require("./img/chimie/4.pdf").default },
      { label: "TD 5", href: require("./img/chimie/5.pdf").default },
      { label: "TD 6", href: require("./img/chimie/6.pdf").default },
      { label: "TD 7", href: require("./img/chimie/7.pdf").default },
      { label: "TD 8", href: require("./img/chimie/8.pdf").default },
      { label: "TD 9", href: require("./img/chimie/9.pdf").default },
    ],
  },
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "TD — corrigé", href: require("./img/chimie/TD.pdf").default }],
  },
]} />

</MatiereSection>

<MatiereSection icon="💻" title="Informatique" responsable={{ name: "Carole Blanc", href: "https://dept-info.labri.fr/~blanc/" }}>

<ResourceList groups={[
  {
    type: "td",
    title: "Travaux dirigés",
    items: [
      { label: "TD1", href: require("./img/informatique/td1.pdf").default },
      { label: "TD2", href: require("./img/informatique/td2.pdf").default },
      { label: "TD3", href: require("./img/informatique/td3.pdf").default },
      { label: "TD4", href: require("./img/informatique/td4.pdf").default },
      { label: "TD5", href: require("./img/informatique/td5.pdf").default },
      { label: "TD6", href: require("./img/informatique/td6.pdf").default },
      { label: "TD7", href: require("./img/informatique/td7.pdf").default },
      { label: "TD8", href: require("./img/informatique/td8.pdf").default },
    ],
  },
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "Proposition de correction", href: require("./img/informatique/correction.pdf").default }],
  },
]} />

Il faut manier les corrections de l'informatique avec précaution. Les codes demandés sont
relativement simple en 1A, l'idée est de vous faire réflechir et de vous
sensibilier au paradigme de l'informatique. Ne foncez pas dessus !

</MatiereSection>

<MatiereSection icon="📐" title="Mathématiques">

### Mathématiques fondamentales

Responsable : [Ghislaine Godinaud](https://www.math.u-bordeaux.fr/imb/fiche-personnelle?uid=ggodinau)

Cette section est un peu vide et à besoin de `contribution`.

<ResourceList groups={[
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "TD — correction partielle", href: require("./img/mathematiques/TD.pdf").default }],
  },
]} />

### Spé maths

Responsable : [Eric Charpentier](https://www.math.u-bordeaux.fr/imb/fiche-personnelle?uid=echarpen)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Equations différentielles", href: require("./img/mathematiques/1.pdf").default },
      { label: "Compléments sur les suites numériques", href: require("./img/mathematiques/2.pdf").default },
      { label: "Fonctions numériques de variable réelle", href: require("./img/mathematiques/3.pdf").default },
      { label: "Divisibilité dans Z", href: require("./img/mathematiques/4.pdf").default },
      { label: "Cours", href: require("./img/mathematiques/cours.pdf").default },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "TD", href: require("./img/mathematiques/spe_td.pdf").default }],
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
      { label: "Introduction", href: require("./img/physique/electro/Introduction.pdf").default },
      { label: "Analyse de circuit", href: require("./img/physique/electro/analyse.pdf").default },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [
      { label: "TD1 — sujet", href: require("./img/physique/electro/TD1.pdf").default },
      { label: "TD2 — sujet", href: require("./img/physique/electro/TD2.pdf").default },
    ],
  },
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "TD — correction", href: require("./img/physique/electro/TD.pdf").default }],
  },
]} />

### Mécanique du point

Responsable : Jean Christophe Caillon

Cette section est un peu vide et à besoin de `contribution`.

<ResourceList groups={[
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "TD — correction", href: require("./img/physique/meca/TD.pdf").default }],
  },
]} />

### Outils mathématiques

Responsable : Daniel Blaudez

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "1- Calcul Vectoriel", href: require("./img/physique/outils/1.pdf").default },
      { label: "2- Calcul Différentiel.1", href: require("./img/physique/outils/2.pdf").default },
      { label: "2- Calcul Différentiel.2", href: require("./img/physique/outils/3.pdf").default },
      { label: "3- Système de coordonnées", href: require("./img/physique/outils/4.pdf").default },
      { label: "4- Intégrales simples", href: require("./img/physique/outils/5.pdf").default },
      { label: "5- Intégrales doubles", href: require("./img/physique/outils/6.pdf").default },
      { label: "6- Intégrales triple", href: require("./img/physique/outils/7.pdf").default },
      { label: "7- Intégrales curvilignes", href: require("./img/physique/outils/8.pdf").default },
      { label: "8- Champs vectoriel et scalaire.1", href: require("./img/physique/outils/9.pdf").default },
      { label: "8- Champs vectoriel et scalaire.2", href: require("./img/physique/outils/10.pdf").default },
    ],
  },
]} />

</MatiereSection>
