export const projects: Project[] = [
  {
    title: "delpeuch.net blog",
    description: "Blog personnel sur les technologies DevOps",
    preview: "/img/project/delpeuch.png",
    year: "2024",
  },
  {
    title: "FervantFactory",
    description: "Mise en place d'un docker swarm pour du self-hosting",
    preview:
      "https://raw.githubusercontent.com/docker-library/docs/471fa6e4cb58062ccbf91afc111980f9c7004981/swarm/logo.png",
    year: "2025",
  },
  {
    title: "GitHub ARC Kubeadm",
    description: "GitHub Action Runner Container Kubeadm",
    preview:
      "https://docs.github.com/assets/cb-497738/images/help/actions/arc-diagram.png",
    year: "2024",
  },
  {
    title: "Ronoco",
    description: "ROS No Code",
    preview: "/img/project/ronoco.png",
    year: "2021",
  },
  {
    title: "Wolf",
    description:
      "Le projet Wolf est un projet ayant pour but de créer un environnement d'interconnexion entre les différents outils pouvant être utilisés dans la gestion d'associations, de projets etc ",
    preview: "/img/project/wolf.png",
    year: "2023",
  },
  {
    title: "Reachy Mobile",
    description: "Jouer avec Reachy au Tic Tac Toe",
    preview: "/img/project/reachy_mobile.png",
    year: "2022",
  },
  {
    title: "EZ Wheel Navigation",
    description: "Intégration du Starter Kit EZ Wheel dans ROS",
    preview: "/img/project/ezwheel.png",
    year: "2022",
  },
  {
    title: "Vertical Plotter",
    description: "Dessinateur sur tableau blanc",
    preview: "/img/project/makerplotter.jpg",
    year: "2021",
  },
  {
    title: "Template LaTeX",
    description: "Template LaTeX pour les rapports",
    preview: "/img/project/latex.png",
    year: "2023",
  },
  {
    title: "Easy Booked @EirLab",
    description:
      "Le plugin Easy Booked développé initialement par JoyDevs puis redéveloppé pour les besoins d’inscriptions aux formations d’Eirlab.",
    preview: "/img/project/easybooked.png",
    year: "2022",
  },
  {
    title: "Application de suivi - Ultimaker série S",
    description:
      "Application de suivi des impressions 3D sur les imprimantes Ultimaker série S",
    preview: "/img/project/ultimaker.png",
    year: "2021",
  },
  {
    title: "Haricot 🌱 (@apringalle)",
    description:
      "Haricot est un prototype d’un boitier basé sur une Raspberry Pi permettant de réaliser automatiquement la vidéo de la pousse d’une plante.",
    preview: "/img/project/haricot.png",
    year: "2022",
  },
  {
    title: "Luciole ✨ 🐝",
    description:
      "Haricot est un prototype d’un boitier basé sur une Raspberry Pi permettant de réaliser automatiquement la vidéo de la pousse d’une plante.",
    preview: "/img/project/luciole.jpg",
    year: "2022",
  },
  {
    title: "delpeuch.net",
    description: "Portfolio de Sébastien Delpeuch",
    preview: "/img/project/delpeuch.png",
    year: "2024",
  },
  {
    title: "Robocup @Home 2023 (CATIE)",
    description: "Team Leader de l'équipe CATIE pour la Robocup @Home 2023",
    preview: "/img/project/robocup.png",
    year: "2023",
  },
];

export type Project = {
  title: string;
  description: string;
  preview?: string;
  year: string;
};

export const groupByProjects = projects.reduce(
  (group, project) => {
    const { type } = project;
    group[type] = group[type] ?? [];
    group[type].push(project);
    return group;
  },
  {} as Record<ProjectType, Project[]>,
);
