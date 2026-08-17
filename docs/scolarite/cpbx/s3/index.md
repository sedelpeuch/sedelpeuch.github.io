---
title: Cycle Préparatoire De Bordeaux - Semestre 3
---

import DossierHeader from "@site/src/components/DossierHeader";
import MatiereSection from "@site/src/components/MatiereSection";
import ResourceList from "@site/src/components/ResourceList";

<DossierHeader school="cpbx" crumbs={["CPBx", "Semestre 3"]} />

<MatiereSection icon="💻" title="Informatique" responsable={{ name: "Frantisek Kardos", href: "https://www.labri.fr/index.php?n=Annuaires.Profile&id=Kardos_ID1346656366" }}>

Au semestre 3, en informatique on vous demande de commencer à réfléchir à des
solutions algorithmiques plus complexes que au premier semestre. L'idée n'est
pas d'avoir un code fonctionnel à tout prix mais de vous sensibiliser à
l'établissement d'une reflexion algorithmique et à faire de l'abstraction par
rapport à la machine. Ainsi, recopier la correction sans comprendre ni réflechir est juste inutile.

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: require("./informatique/cours.pdf").default }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./informatique/TD.pdf").default }],
  },
]} />

</MatiereSection>

<MatiereSection icon="🧪" title="Chimie" responsable={{ name: "Jean Christophe Soetens", href: "http://theo.ism.u-bordeaux1.fr/index.php" }}>

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: require("./Chimie-cours.pdf").default }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./Chimie-TD.pdf").default }],
  },
]} />

</MatiereSection>

<MatiereSection icon="📐" title="Mathématiques">

### Analyse

Responsable : [Laurent Michel](https://www.math.u-bordeaux.fr/~lamichel/enseignement.html)

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

Responsable : [Nicolas Popoff](https://www.math.u-bordeaux.fr/~npopoff/)

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

### Thermodynamique

Responsable : Julien Burgin

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: require("./physique/Thermo-cours.pdf").default }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./physique/Thermo-TD.pdf").default }],
  },
]} />

### Electromagnétisme

Responsable : [Jérome Cayssol](https://www.loma.cnrs.fr/jerome-cayssol/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: require("./physique/Electromagnétisme-cours.pdf").default }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: require("./physique/Electromagnétisme-TD.pdf").default }],
  },
]} />

### Travaux Pratiques

Pour l'instant les travaux pratiques du semestre 3 n'ont pas changés depuis 10
ans. Normalement tous les TPs sont correct.

<ResourceList groups={[
  {
    type: "support",
    title: "Supports",
    items: [{ label: "Proposition de solution", href: require("./physique/TP-S3.pdf").default }],
  },
]} />

</MatiereSection>
