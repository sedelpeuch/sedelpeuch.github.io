// Icônes des technologies, partagées par ProjectMeta, ProjectIndex et ProjectLink.
// Icônes monochromes (simple-icons) : elles prennent la couleur d'accent,
// comme les illustrations au trait du site, au lieu d'une mosaïque de logos colorés.
// Une techno absente de la table s'affiche sans icône.
export const TECH_ICONS: Record<string, string> = {
  ansible: "simple-icons:ansible",
  authelia: "simple-icons:authelia",
  aws: "simple-icons:amazonwebservices",
  "aws eks": "simple-icons:amazoneks",
  bibtex: "simple-icons:latex",
  c: "simple-icons:c",
  "c++": "simple-icons:cplusplus",
  calico: "simple-icons:projectcalico",
  cookiecutter: "simple-icons:cookiecutter",
  docker: "simple-icons:docker",
  "docker compose": "simple-icons:docker",
  "docker-in-docker": "simple-icons:docker",
  docusaurus: "simple-icons:docusaurus",
  fastapi: "simple-icons:fastapi",
  gazebo: "devicon-plain:gazebo",
  git: "simple-icons:git",
  "git-crypt": "simple-icons:git",
  github: "simple-icons:github",
  "github actions": "simple-icons:githubactions",
  "github arc": "simple-icons:githubactions",
  "github copilot": "simple-icons:githubcopilot",
  "github gists": "simple-icons:github",
  grafana: "simple-icons:grafana",
  helm: "simple-icons:helm",
  kubeadm: "simple-icons:kubernetes",
  kubernetes: "simple-icons:kubernetes",
  latex: "simple-icons:latex",
  linux: "simple-icons:linux",
  make: "simple-icons:gnu",
  mdx: "simple-icons:mdx",
  minio: "simple-icons:minio",
  "oh-my-zsh": "simple-icons:zsh",
  opencv: "simple-icons:opencv",
  pdflatex: "simple-icons:latex",
  php: "simple-icons:php",
  postgresql: "simple-icons:postgresql",
  prometheus: "simple-icons:prometheus",
  pytest: "simple-icons:pytest",
  python: "simple-icons:python",
  react: "simple-icons:react",
  renovate: "simple-icons:renovate",
  ros: "simple-icons:ros",
  "ros 2": "simple-icons:ros",
  ros2: "simple-icons:ros",
  ruff: "simple-icons:ruff",
  scss: "simple-icons:sass",
  slack: "simple-icons:slack",
  "slack api": "simple-icons:slack",
  starship: "simple-icons:starship",
  tailscale: "simple-icons:tailscale",
  tailwind: "simple-icons:tailwindcss",
  terraform: "simple-icons:terraform",
  traefik: "simple-icons:traefikproxy",
  typescript: "simple-icons:typescript",
  uv: "simple-icons:uv",
  wordpress: "simple-icons:wordpress",
  zephyr: "simple-icons:zephyrproject",
  zsh: "simple-icons:zsh",
};

export function techIcon(name: string): string | undefined {
  return TECH_ICONS[name.toLowerCase()];
}

// Données exposées par le plugin plugins/projects-data.
export type ProjectKind = "pro" | "perso" | "asso";
export type ProjectStatus = "en cours" | "en pause" | "terminé";

export interface ProjectData {
  title: string;
  description: string;
  permalink: string;
  kind: ProjectKind;
  start: string;
  end?: string;
  status?: ProjectStatus;
  role?: string;
  domain?: string;
  stack?: string[];
}

export const KIND_LABELS: Record<ProjectKind, string> = {
  pro: "Professionnel",
  perso: "Personnel",
  asso: "Associatif",
};

export function projectStatus(p: Pick<ProjectData, "end" | "status">): ProjectStatus {
  return p.status ?? (p.end ? "terminé" : "en cours");
}

export function projectPeriod(p: Pick<ProjectData, "start" | "end">): string {
  if (p.end === p.start) return p.start;
  return `${p.start} → ${p.end ?? "aujourd'hui"}`;
}

// Première année à quatre chiffres d'une date libre (« Juillet 2023 » → 2023).
export function yearOf(date?: string): number {
  const m = date?.match(/\d{4}/);
  return m ? Number(m[0]) : 0;
}
