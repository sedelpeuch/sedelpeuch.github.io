import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import { Icon } from "@iconify/react";
import {
  KIND_LABELS,
  projectPeriod,
  projectStatus,
  techIcon,
  yearOf,
  type ProjectData,
  type ProjectKind,
} from "../techIcons";
import styles from "./styles.module.scss";

type Filter = ProjectKind | "all";

interface Props {
  /** Restreint l'index à une catégorie (pages d'index Associatif, Personnel…). */
  kind?: ProjectKind;
}

// Tri : année de début décroissante, puis projets en cours d'abord, puis fin décroissante.
function sortProjects(a: ProjectData, b: ProjectData): number {
  const ya = yearOf(a.start);
  const yb = yearOf(b.start);
  if (ya !== yb) return yb - ya;
  const ea = a.end ? yearOf(a.end) : Infinity;
  const eb = b.end ? yearOf(b.end) : Infinity;
  return eb - ea || a.title.localeCompare(b.title, "fr");
}

function Tile({ project, showKind }: { project: ProjectData; showKind: boolean }) {
  const status = projectStatus(project);
  const stack = project.stack ?? [];
  return (
    <Link to={project.permalink} className={styles.tile} data-status={status}>
      <span className={styles.title}>{project.title}</span>
      <span className={styles.meta}>
        {projectPeriod(project)}
        {showKind && `, ${KIND_LABELS[project.kind].toLowerCase()}`}
      </span>
      {stack.length > 0 && (
        <span className={styles.stack}>
          {stack.map((tech) => {
            const icon = techIcon(tech);
            return icon ? (
              <span key={tech} title={tech} className={styles.iconWrap}>
                <Icon icon={icon} className={styles.icon} aria-hidden="true" />
                <span className={styles.srOnly}>{tech}</span>
              </span>
            ) : (
              <span key={tech} className={styles.techText}>
                {tech}
              </span>
            );
          })}
        </span>
      )}
    </Link>
  );
}

export default function ProjectIndex({ kind }: Props): JSX.Element {
  const { projects } = usePluginData("projects-data") as { projects: ProjectData[] };
  const [filter, setFilter] = useState<Filter>(kind ?? "all");

  const visible = projects
    .filter((p) => filter === "all" || p.kind === filter)
    .sort(sortProjects);
  const years = Array.from(new Set(visible.map((p) => yearOf(p.start))));
  const kinds = (Object.keys(KIND_LABELS) as ProjectKind[]).filter((k) =>
    projects.some((p) => p.kind === k),
  );

  return (
    <div className={styles.index}>
      {!kind && (
        <div className={styles.filters} role="group" aria-label="Filtrer les projets">
          {(["all", ...kinds] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "Tous" : KIND_LABELS[f]}
              <span className={styles.count}>
                {f === "all" ? projects.length : projects.filter((p) => p.kind === f).length}
              </span>
            </button>
          ))}
        </div>
      )}
      <div className={styles.years}>
        {years.map((year) => (
          <section key={year} className={styles.year}>
            <h2 className={styles.yearLabel}>{year || "Sans date"}</h2>
            <div className={styles.grid}>
              {visible
                .filter((p) => yearOf(p.start) === year)
                .map((p) => (
                  <Tile key={p.permalink} project={p} showKind={!kind && filter === "all"} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
