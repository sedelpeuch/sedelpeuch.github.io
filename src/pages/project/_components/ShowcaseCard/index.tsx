import React, { memo } from "react";
import clsx from "clsx";
import Image from "@theme/IdealImage";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";

const ShowcaseCard = memo(({ project }) => {
  // Génère le slug pour la page projet docs/project/<slug>
  const slug = `/docs/projects/${project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
  return (
    <Link
      href={slug}
      className={styles.modernCard}
      style={{ textDecoration: "none" }}
    >
      {project.preview && (
        <div className={styles.showcaseCardImageModern}>
          <Image
            src={project.preview}
            alt={project.title}
            img={project.preview}
          />
        </div>
      )}
      <div className={styles.cardBodyModern}>
        <div className={styles.showcaseCardHeaderModern}>
          <h4 className={styles.showcaseCardTitleModern}>{project.title}</h4>
          {project.year && (
            <span className={styles.yearBadge}>{project.year}</span>
          )}
        </div>
        <p className={styles.showcaseCardBodyModern}>{project.description}</p>
      </div>
    </Link>
  );
});

export default ShowcaseCard;
