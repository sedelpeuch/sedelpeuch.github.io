import React from "react";
import { Icon } from "@iconify/react";
import styles from "./styles.module.scss";

// Icônes monochromes (simple-icons) : elles prennent la couleur d'accent,
// comme les illustrations au trait du site, au lieu d'une mosaïque de logos colorés.
// Une techno absente de la table s'affiche sans icône.
const ICONS: Record<string, string> = {
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
  zephyr: "simple-icons:zephyrproject",
  zsh: "simple-icons:zsh",
};

type Status = "en cours" | "en pause" | "terminé";

interface Props {
  /** Début de la période : « 2023 », « Juillet 2023 »… */
  start: string;
  /** Fin de la période ; absente = projet en cours. Égale à `start` = période ponctuelle. */
  end?: string;
  /** Force le statut (utile pour « en pause ») ; sinon déduit de `end`. */
  status?: Status;
  role?: string;
  domain?: string;
  stack?: string[];
}

export default function ProjectMeta({
  start,
  end,
  status,
  role,
  domain,
  stack = [],
}: Props): JSX.Element {
  const label: Status = status ?? (end ? "terminé" : "en cours");
  const single = end !== undefined && end === start;

  return (
    <aside className={styles.meta} aria-label="Fiche du projet">
      <div className={styles.rail} data-status={label} aria-hidden="true" />
      <div className={styles.body}>
        <p className={styles.period}>
          <time>{start}</time>
          {!single && (
            <>
              <span className={styles.arrow} aria-label="à">
                →
              </span>
              <time>{end ?? "aujourd'hui"}</time>
            </>
          )}
          <span className={styles.status} data-status={label}>
            {label}
          </span>
        </p>
        {role && <p className={styles.role}>{role}</p>}
        {domain && <p className={styles.domain}>{domain}</p>}
        {stack.length > 0 && (
          <ul className={styles.stack} aria-label="Technologies">
            {stack.map((tech) => {
              const icon = ICONS[tech.toLowerCase()];
              return (
                <li key={tech} className={styles.tech}>
                  {icon && <Icon icon={icon} className={styles.techIcon} aria-hidden="true" />}
                  <span>{tech}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
