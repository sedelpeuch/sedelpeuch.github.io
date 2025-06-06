import { IconProps } from "@iconify/react";

const SKILLS: IconProps[] = [
  // Colonne gauche
  { icon: "skill-icons:python-light", style: { left: "12%", top: "20%" } },
  { icon: "skill-icons:docker", style: { left: "18%", top: "35%" } },
  { icon: "skill-icons:ansible", style: { left: "14%", top: "55%" } },

  // Colonne centre-gauche
  { icon: "skill-icons:kubernetes", style: { left: "32%", top: "18%" } },
  { icon: "skill-icons:grafana-light", style: { left: "36%", top: "35%" } },
  { icon: "skill-icons:ros-light", style: { left: "32%", top: "55%" } },

  // Colonne centre
  { icon: "skill-icons:git", style: { left: "48%", top: "20%" } },
  { icon: "skill-icons:github-light", style: { left: "52%", top: "35%" } },
  {
    icon: "skill-icons:githubactions-light",
    style: { left: "48%", top: "55%" },
  },

  // Colonne centre-droite
  { icon: "skill-icons:linux-light", style: { left: "64%", top: "18%" } },
  { icon: "devicon:ohmyzsh", style: { left: "68%", top: "35%" } },
  { icon: "skill-icons:vscode-light", style: { left: "64%", top: "55%" } },

  // Colonne droite
  { icon: "skill-icons:prometheus", style: { left: "82%", top: "20%" } },
];

export default SKILLS;
