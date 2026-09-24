// Catégories du blog, déduites du dossier du billet (07-monitoring → monitoring).
// Icônes au trait (tabler), dans l'esprit des illustrations du site.
export const BLOG_CATEGORIES: Record<string, { label: string; icon: string }> = {
  network: { label: "Réseau", icon: "tabler:topology-star-3" },
  containerization: { label: "Conteneurisation", icon: "tabler:box" },
  "ci-cd": { label: "CI/CD", icon: "tabler:git-merge" },
  cloud: { label: "Cloud", icon: "tabler:cloud" },
  orchestration: { label: "Orchestration", icon: "tabler:hierarchy-3" },
  monitoring: { label: "Observabilité", icon: "tabler:activity-heartbeat" },
  iac: { label: "Infrastructure as Code", icon: "tabler:file-code" },
  scripting: { label: "Scripting", icon: "tabler:terminal-2" },
};

export const DEFAULT_CATEGORY = { label: "DevOps", icon: "tabler:route" };

/** Identifiant de catégorie d'après un chemin contenant un dossier `NN-nom`. */
export function categoryIdOf(pathOrPermalink: string): string | undefined {
  const folder = pathOrPermalink.split("/").find((seg) => /^\d{2}-/.test(seg));
  return folder?.replace(/^\d{2}-/, "");
}

export function categoryOf(pathOrPermalink: string) {
  const id = categoryIdOf(pathOrPermalink);
  return (id && BLOG_CATEGORIES[id]) || DEFAULT_CATEGORY;
}
