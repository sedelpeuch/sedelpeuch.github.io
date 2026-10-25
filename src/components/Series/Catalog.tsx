import React from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import styles from "./Catalog.module.scss";

interface SeriesPost {
  title: string;
  permalink: string;
  date: string;
}

interface SeriesData {
  id: string;
  label: string;
  description?: string;
  posts: SeriesPost[];
}

const day = (date: string, options: Intl.DateTimeFormatOptions) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("fr-FR", options);

// « juin → juillet 2026 », « décembre 2024 → novembre 2025 » ou « juin 2026 ».
function period(first: string, last: string): string {
  const month = (d: string) => day(d, { month: "long" });
  const year = (d: string) => d.slice(0, 4);
  if (first.slice(0, 7) === last.slice(0, 7)) return `${month(first)} ${year(first)}`;
  if (year(first) === year(last)) return `${month(first)} → ${month(last)} ${year(last)}`;
  return `${month(first)} ${year(first)} → ${month(last)} ${year(last)}`;
}

// Catalogue des séries : une carte par série, les billets dans l'ordre de lecture
// sur le rail vertical de la timeline d'accueil. Séries les plus récentes d'abord.
export default function SeriesCatalog(): JSX.Element {
  const { series } = usePluginData("series-data") as { series: Record<string, SeriesData> };
  const list = Object.values(series)
    .filter((s) => s.posts.length >= 2)
    .sort((a, b) => b.posts.at(-1)!.date.localeCompare(a.posts.at(-1)!.date));

  return (
    <div className={styles.catalog}>
      {list.map((s) => {
        const dates = s.posts.map((p) => p.date).sort();
        return (
          <section key={s.id} id={s.id} className={styles.card}>
            <h2 className={styles.title}>{s.label}</h2>
            <p className={styles.meta}>
              {s.posts.length} articles · {period(dates[0], dates.at(-1)!)}
            </p>
            {s.description && <p className={styles.description}>{s.description}</p>}
            <ol className={styles.rail}>
              {s.posts.map((post) => (
                <li key={post.permalink}>
                  <Link to={post.permalink} title={post.title}>
                    {post.title}
                  </Link>
                  <time dateTime={post.date}>
                    {day(post.date, { day: "numeric", month: "short", year: "numeric" })}
                  </time>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
