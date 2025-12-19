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
      className={clsx("card", styles.showcaseCard)}
      style={{ textDecoration: "none" }}
    >
      {project.preview && (
        <div className={clsx("card__image", styles.showcaseCardImage)}>
          <Image
            src={project.preview}
            alt={project.title}
            img={project.preview}
          />
        </div>
      )}
      <div className="card__body">
        <div className={clsx(styles.showcaseCardHeader)}>
          <h4 className={styles.showcaseCardTitle}>{project.title}</h4>
        </div>
        <p className={styles.showcaseCardBody}>{project.description}</p>
      </div>
      <div className={styles.cardFooterSimple}>
        {project.year && (
          <span className={styles.yearText}>{project.year}</span>
        )}
      </div>
    </Link>
  );
});

export default ShowcaseCard;
