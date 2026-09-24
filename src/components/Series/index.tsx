import React from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import styles from "./styles.module.scss";

interface SeriesPost {
  title: string;
  permalink: string;
  source: string;
}

interface SeriesData {
  id: string;
  label: string;
  posts: SeriesPost[];
}

interface Props {
  /** Identifiant de la série (frontmatter `series`). */
  id: string;
  /** Chemin source du billet courant (metadata.source). */
  source: string;
}

// Piste horizontale : un anneau par billet, plein pour les billets précédents,
// cerclé pour le billet courant, vide pour les suivants ; le rail passe en
// pointillés après le billet courant. Précédent et suivant en dessous.
export default function Series({ id, source }: Props): JSX.Element | null {
  const { series } = usePluginData("series-data") as { series: Record<string, SeriesData> };
  const data = series[id];
  if (!data || data.posts.length < 2) return null;

  const index = data.posts.findIndex((p) => p.source === source);
  if (index === -1) return null;
  const prev = data.posts[index - 1];
  const next = data.posts[index + 1];

  return (
    <nav className={styles.series} aria-label={`Série ${data.label}`}>
      <p className={styles.head}>
        Série {data.label}, article {index + 1} sur {data.posts.length}
      </p>
      <ol className={styles.track}>
        {data.posts.map((post, i) => {
          const state = i < index ? "done" : i === index ? "current" : "next";
          return (
            <li key={post.permalink} data-state={state}>
              <Link
                to={post.permalink}
                className={styles.ring}
                title={post.title}
                aria-current={state === "current" ? "page" : undefined}
              >
                <span className={styles.srOnly}>{post.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      <div className={styles.nav}>
        <span className={styles.prev}>
          {prev && (
            <Link to={prev.permalink}>
              <span aria-hidden="true">← </span>
              {prev.title}
            </Link>
          )}
        </span>
        <strong className={styles.current}>{data.posts[index].title}</strong>
        <span className={styles.next}>
          {next && (
            <Link to={next.permalink}>
              {next.title}
              <span aria-hidden="true"> →</span>
            </Link>
          )}
        </span>
      </div>
    </nav>
  );
}
