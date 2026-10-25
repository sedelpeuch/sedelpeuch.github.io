import React from "react";
import { DomainTitle, Histogram, Legend, Stats, Topic, useRoadmap } from "./shared";
import styles from "./styles.module.scss";

// Roadmap DevOps : un anneau par domaine sur le rail de la timeline d'accueil.
// Un domaine n'a pas de fin : pas de ratio ni de barre de complétion, seulement
// les sujets pratiqués (datés, avec leurs articles) et ceux qui viennent ensuite.
// En tête, le volume pratiqué et sa répartition par année.
export default function Roadmap(): JSX.Element {
  const { domains } = useRoadmap();
  const all = domains.flatMap((d) => d.topics);
  const practiced = all.filter((t) => t.practiced);
  const articles = new Set(all.flatMap((t) => t.posts.map((p) => p.permalink))).size;
  const perYear = new Map<number, number>();
  for (const t of practiced) if (t.year) perYear.set(t.year, (perYear.get(t.year) ?? 0) + 1);
  const years = Array.from(perYear.keys()).sort();

  return (
    <div className={styles.roadmap}>
      <section className={styles.summary} aria-label="Progression">
        <Stats
          items={[
            ["sujets pratiqués", practiced.length],
            ["articles", articles],
            ["domaines", domains.length],
          ]}
        />
        <Histogram
          label="Sujets pratiqués par année"
          bars={years.map((year) => ({
            label: String(year),
            count: perYear.get(year)!,
            to: `/roadmap/${year}`,
            title: `Roadmap ${year}`,
          }))}
        />
        <Legend />
      </section>

      <ol className={styles.rail}>
        {domains.map((domain) => (
          <li key={domain.number} className={styles.domain}>
            <DomainTitle domain={domain} />
            <p className={styles.description}>{domain.description}</p>
            <ul className={styles.topics}>
              {domain.topics.map((topic) => (
                <Topic key={topic.label} topic={topic} />
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
