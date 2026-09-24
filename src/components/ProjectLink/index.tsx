import React from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import { Icon } from "@iconify/react";
import { projectPeriod, techIcon, type ProjectData } from "../techIcons";
import styles from "./styles.module.scss";

interface Props {
  /** Permalien de la page projet : « /docs/projects/personnel/homelab ». */
  to: string;
  /** Titre de repli si la page projet n'a pas de fiche <ProjectMeta />. */
  title?: string;
  /** Ce que l'article met en pratique dans ce projet. */
  children?: React.ReactNode;
}

const normalize = (p: string) => p.replace(/\/+$/, "");

// Encart « mis en pratique dans le projet » : anneau de la timeline, nom du
// projet, phrase d'usage, icônes de stack. Toute la carte est cliquable.
export function ProjectLink({ to, title, children }: Props): JSX.Element {
  const { projects } = usePluginData("projects-data") as { projects: ProjectData[] };
  const project = projects.find((p) => normalize(p.permalink) === normalize(to));
  const name = project?.title ?? title ?? to;
  const stack = project?.stack ?? [];

  return (
    <Link to={to} className={styles.card}>
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.body}>
        <span className={styles.label}>
          Mis en pratique dans le projet
          {project && <span className={styles.period}>{projectPeriod(project)}</span>}
        </span>
        <span className={styles.name}>{name}</span>
        {children && <span className={styles.text}>{children}</span>}
        {stack.length > 0 && (
          <span className={styles.stack}>
            {stack.map((tech) => {
              const icon = techIcon(tech);
              return icon ? (
                <span key={tech} title={tech} className={styles.iconWrap}>
                  <Icon icon={icon} className={styles.icon} aria-hidden="true" />
                  <span className={styles.srOnly}>{tech}</span>
                </span>
              ) : null;
            })}
          </span>
        )}
      </span>
    </Link>
  );
}

// Conteneur : une seule carte occupe toute la largeur, plusieurs passent en grille.
export function ProjectLinks({ children }: { children: React.ReactNode }): JSX.Element {
  const count = React.Children.count(children);
  return (
    <div className={styles.grid} data-count={count}>
      {children}
    </div>
  );
}

export default ProjectLink;
