// Icônes au trait (tabler) des matières et des types de ressource, choisies
// d'après le libellé ou le chemin de la page. Un `sidebar_custom_props.icon`
// dans le frontmatter (ou `customProps.icon` d'un _category_.json) l'emporte.
// Ordre significatif : du plus spécifique au plus générique (« Outils d'imagerie
// pour la robotique » doit tomber sur l'imagerie, pas sur la robotique).
const SUBJECTS: [RegExp, string][] = [
  [/quantique/i, "tabler:atom-2"],
  [/automate/i, "tabler:circles-relation"],
  [/jeux?\b/i, "tabler:device-gamepad-2"],
  [/imagerie|image/i, "tabler:photo"],
  [/apprentissage|learning|intelligence|\bia\b/i, "tabler:brain"],
  [/interaction/i, "tabler:hand-click"],
  [/[ée]nerg/i, "tabler:bolt"],
  [/math/i, "tabler:math-function"],
  [/mod[ée]lisation/i, "tabler:3d-cube-sphere"],
  [/embarqu/i, "tabler:cpu"],
  [/contr[ôo]le|commande/i, "tabler:adjustments-horizontal"],
  [/graphe|\bgraph\b/i, "tabler:chart-dots-3"],
  [/r[ée]seau|tcp|apptcp|internet/i, "tabler:network"],
  [/base de donn|bdd|sgbd|sql/i, "tabler:database"],
  [/compil/i, "tabler:file-code"],
  [/c\+\+|\bcpp\b/i, "tabler:brand-cpp"],
  [/orient[ée]e? objets?|\bpoo\b/i, "tabler:box-multiple"],
  [/programmation syst|prog_sys|syst[èe]mes? d.exploitation|\bse\b/i, "tabler:terminal-2"],
  [/fonctionnel|\bfonc\b|scheme|racket/i, "tabler:lambda"],
  [/recherche op[ée]rationnelle|lin[ée]aire|\bpl\b|simplexe/i, "tabler:chart-line"],
  [/imp[ée]rati|\bimp\b|legacy/i, "tabler:code"],
  [/num[ée]rique|algo_num/i, "tabler:calculator"],
  [/g[ée]nie logiciel|\bgl\b|scrum/i, "tabler:users-group"],
  [/crypto/i, "tabler:lock"],
  [/co[ûu]ts?|[ée]valuation des projets/i, "tabler:report-money"],
  [/qualit/i, "tabler:rosette-discount-check"],
  [/complex|calculabilit/i, "tabler:math-xy"],
  [/maker|fablab/i, "tabler:tool"],
  [/robot/i, "tabler:robot"],
  [/projet/i, "tabler:folders"],
  [/physique|m[ée]canique|[ée]lectro/i, "tabler:atom"],
  [/chimie/i, "tabler:flask"],
  [/informatique|algorithm/i, "tabler:code"],
  [/associatif/i, "tabler:heart-handshake"],
  [/cpbx|pr[ée]pa|cycle pr[ée]paratoire/i, "tabler:school"],
  [/enseirb/i, "tabler:building"],
  [/semestre|\bs\d\b/i, "tabler:calendar"],
];

const RESOURCES: [RegExp, string][] = [
  [/correction|corrig/i, "tabler:checks"],
  [/\btd\b|td\d|exercice|sujet/i, "tabler:pencil"],
  [/\btp\b|tp\d|pratique/i, "tabler:flask-2"],
  [/rapport|dm\b|projet/i, "tabler:folder"],
  [/note|cours|chapitre/i, "tabler:book"],
];

export function subjectIcon(label: string, path = ""): string {
  const text = `${label} ${path.replace(/\/+$/, "").split("/").pop() ?? ""}`;
  return (
    SUBJECTS.find(([re]) => re.test(text))?.[1] ??
    RESOURCES.find(([re]) => re.test(text))?.[1] ??
    "tabler:file-text"
  );
}

export type ResourceType = "cours" | "td" | "tp" | "correction" | "projet" | "support";

export const RESOURCE_TYPES: Record<ResourceType, { label: string; icon: string }> = {
  cours: { label: "Cours", icon: "tabler:book" },
  td: { label: "Travaux dirigés", icon: "tabler:pencil" },
  tp: { label: "Travaux pratiques", icon: "tabler:flask-2" },
  correction: { label: "Corrections", icon: "tabler:checks" },
  projet: { label: "Projets", icon: "tabler:folder" },
  support: { label: "Supports", icon: "tabler:files" },
};
