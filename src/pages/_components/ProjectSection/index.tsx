import React from "react";
import clsx from "clsx";
import { projects } from "@site/data/projects";
import styles from "./styles.module.scss";
import SectionTitle from "../SectionTitle";
import ShowcaseCard from "../../project/_components/ShowcaseCard";

export default function ProjectSection() {
  // Projets triés par année décroissante, on prend les 6 plus récents
  const recentProjects = [...projects]
    .filter((p) => p.preview)
    .sort((a, b) =>
      b.year && a.year ? parseInt(b.year) - parseInt(a.year) : 0,
    )
    .slice(0, 6);

  return (
    <section
      className={clsx("container padding-vert--sm", styles.projectContainer)}
    >
      <SectionTitle icon={"ri:projector-line"} href={"/project"}>
        Projets
      </SectionTitle>
      <div className={styles.content}>
        <div className={styles.grid}>
          {recentProjects.map((project) => (
            <ShowcaseCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
