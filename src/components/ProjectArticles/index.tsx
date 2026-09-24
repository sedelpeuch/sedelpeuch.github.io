import React from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import { Icon } from "@iconify/react";
import { BLOG_CATEGORIES, DEFAULT_CATEGORY } from "../blogCategories";
import styles from "./styles.module.scss";

interface Article {
  title: string;
  permalink: string;
  date: string;
  category: string;
  text: string;
}

const normalize = (p: string) => p.replace(/\/+$/, "");

const formatDate = (date: string) =>
  date
    ? new Date(`${date}T00:00:00Z`).toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : "";

// Phrase d'usage écrite en markdown inline dans le billet : on ne garde que le
// texte des liens et on rend le code inline.
function InlineText({ text }: { text: string }) {
  const plain = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  return (
    <>
      {plain.split(/(`[^`]+`)/).map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={i}>{part.slice(1, -1)}</code>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

// Billets du blog qui déclarent ce projet dans leur section « Projet lié » :
// relation inverse de <ProjectLink>, calculée par plugins/projects-data.
// Rail vertical de la timeline d'accueil, un anneau par billet (du plus récent
// au plus ancien).
export default function ProjectArticles({ permalink }: { permalink: string }): JSX.Element | null {
  const { articles } = usePluginData("projects-data") as { articles: Record<string, Article[]> };
  const list = articles[normalize(permalink)];
  if (!list?.length) return null;

  return (
    <section className={styles.section} aria-labelledby="articles-lies">
      <h2 id="articles-lies" className={styles.heading}>
        Articles liés
      </h2>
      <p className={styles.intro}>
        {list.length === 1
          ? "Un article du blog détaille une notion mise en pratique dans ce projet."
          : `${list.length} articles du blog détaillent des notions mises en pratique dans ce projet.`}
      </p>
      <ol className={styles.rail}>
        {list.map((article) => {
          const category = BLOG_CATEGORIES[article.category] ?? DEFAULT_CATEGORY;
          return (
            <li key={article.permalink} className={styles.item}>
              <p className={styles.meta}>
                <Icon icon={category.icon} className={styles.icon} aria-hidden="true" />
                <span>{category.label}</span>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </p>
              <Link to={article.permalink} className={styles.title}>
                {article.title}
              </Link>
              {article.text && (
                <p className={styles.text}>
                  <InlineText text={article.text} />
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
