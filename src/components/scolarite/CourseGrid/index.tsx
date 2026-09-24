import React from "react";
import Link from "@docusaurus/Link";
import { Icon } from "@iconify/react";
import { useCurrentSidebarCategory } from "@docusaurus/plugin-content-docs/client";
import { useDocsVersion } from "@docusaurus/plugin-content-docs/client";
import { subjectIcon } from "../icons";
import { countPages, customIcon, indexDocId, visibleItems, type CourseItem } from "../sidebar";
import styles from "./styles.module.scss";

function useDescription(item: CourseItem): string | undefined {
  const { docs } = useDocsVersion();
  const id = item.type === "link" ? item.docId : indexDocId(item.href);
  return id ? docs[id]?.description : undefined;
}

function Tile({ item }: { item: CourseItem }) {
  const description = useDescription(item);
  const href = item.href ?? "#";
  const icon = customIcon(item) ?? subjectIcon(item.label, href);
  const pages = item.type === "category" ? countPages(item) : 0;
  return (
    <Link to={href} className={styles.tile}>
      <span className={styles.head}>
        <Icon icon={icon} className={styles.icon} aria-hidden="true" />
        <span className={styles.title}>{item.label}</span>
      </span>
      {description && <span className={styles.description}>{description}</span>}
      {pages > 0 && (
        <span className={styles.count}>
          {pages} page{pages > 1 ? "s" : ""}
        </span>
      )}
    </Link>
  );
}

// Remplace <DocCardList /> sur les pages d'index de la scolarité : une tuile
// par matière ou par page, icône au trait, description du frontmatter et
// nombre de pages contenues.
export default function CourseGrid(): JSX.Element {
  const category = useCurrentSidebarCategory();
  return (
    <div className={styles.grid}>
      {visibleItems(category.items).map((item) => (
        <Tile key={item.href ?? item.label} item={item} />
      ))}
    </div>
  );
}
