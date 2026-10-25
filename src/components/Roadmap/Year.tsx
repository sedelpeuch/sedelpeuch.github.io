import React, { createContext, useContext } from "react";
import Link from "@docusaurus/Link";
import { DomainTitle, Histogram, Legend, Stats, Topic, dateOf, useRoadmap, type ResolvedTopic } from "./shared";
import styles from "./styles.module.scss";

// Première année de la roadmap (bilan antérieur au blog).
const FIRST_YEAR = 2023;
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const YearContext = createContext<number>(FIRST_YEAR);

const inYear = (year: number) => (permalink: string) => dateOf(permalink)?.getFullYear() === year;

// Sujets travaillés dans l'année : articles de l'année, ou acquis cette année-là
// sans article (`since`). Les articles affichés sont ceux de l'année ; une année
// close n'a plus de sujet « en cours ».
function topicsOfYear(topics: ResolvedTopic[], year: number, currentYear: number): ResolvedTopic[] {
  return topics
    .map((topic) => ({
      ...topic,
      status: year < currentYear ? ("acquis" as const) : topic.status,
      posts: topic.posts.filter((p) => inYear(year)(p.permalink)),
    }))
    .filter((topic) => topic.posts.length > 0 || (topic.practiced && topic.year === year));
}

// Navigation entre la vue d'ensemble et les pages année.
export function RoadmapYears({ current }: { current?: number }): JSX.Element {
  const { posts } = useRoadmap();
  const last = Math.max(FIRST_YEAR, ...posts.map((p) => dateOf(p.permalink)?.getFullYear() ?? FIRST_YEAR));
  const years = Array.from({ length: last - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i);
  return (
    <nav className={styles.yearNav} aria-label="Roadmap par année">
      <Link to="/roadmap" className={styles.yearPill} data-current={current === undefined}>
        Vue d'ensemble
      </Link>
      {years.map((year) => (
        <Link key={year} to={`/roadmap/${year}`} className={styles.yearPill} data-current={year === current}>
          {year}
        </Link>
      ))}
    </nav>
  );
}

// En-tête d'une page année : volume de l'année et articles publiés par mois.
export function YearSummary({ year }: { year: number }): JSX.Element {
  const { domains, posts, currentYear } = useRoadmap();
  const yearPosts = posts.filter((p) => inYear(year)(p.permalink));
  const perMonth = MONTHS.map((_, month) => yearPosts.filter((p) => dateOf(p.permalink)!.getMonth() === month).length);
  const touched = domains.filter((d) => topicsOfYear(d.topics, year, currentYear).length > 0);
  const fresh = domains.flatMap((d) => d.topics).filter((t) => t.practiced && t.year === year);
  return (
    <div className={styles.roadmap}>
      <RoadmapYears current={year} />
      <section className={styles.summary} aria-label={`Bilan chiffré ${year}`}>
        <Stats
          items={[
            ...(yearPosts.length > 0 ? ([["articles publiés", yearPosts.length]] as [string, number][]) : []),
            [yearPosts.length > 0 ? "nouveaux sujets" : "sujets acquis", fresh.length],
            ["domaines travaillés", touched.length],
          ]}
        />
        {yearPosts.length > 0 && (
          <Histogram
            dense
            label={`Articles publiés par mois en ${year}`}
            bars={MONTHS.map((month, i) => ({ label: month[0].toUpperCase(), count: perMonth[i], title: `${month} ${year}` }))}
          />
        )}
        <Legend />
      </section>
    </div>
  );
}

// Objectifs fixés en début d'année, un encart par domaine visé.
export function Objectives({ year, children }: { year: number; children: React.ReactNode }): JSX.Element {
  return (
    <YearContext.Provider value={year}>
      <div className={styles.objectives}>{children}</div>
    </YearContext.Provider>
  );
}

export function Objective({ domain: number, children }: { domain: string; children: React.ReactNode }): JSX.Element {
  const year = useContext(YearContext);
  const { domains, currentYear } = useRoadmap();
  const domain = domains.find((d) => d.number === number);
  if (!domain) throw new Error(`Roadmap : domaine inconnu « ${number} »`);
  const worked = topicsOfYear(domain.topics, year, currentYear);
  return (
    <section className={styles.objective}>
      <DomainTitle domain={domain} as="h3" />
      <div className={styles.objectiveText}>{children}</div>
      {worked.length > 0 && (
        <ul className={styles.chips} aria-label={`Sujets travaillés en ${year}`}>
          {worked.map((topic) => (
            <li key={topic.label} data-status={topic.status}>
              <span className={styles.dot} aria-hidden="true" />
              {topic.label}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// Texte de rétrospective d'un domaine ; lu par <Retrospective>, sans rendu propre.
export function Retro(_: { domain: string; children: React.ReactNode }): null {
  return null;
}

// Rétrospective : un anneau par domaine travaillé dans l'année (ou commenté),
// avec le texte du bilan puis les sujets et articles de l'année.
export function Retrospective({ year, children }: { year: number; children?: React.ReactNode }): JSX.Element {
  const { domains, posts, currentYear } = useRoadmap();
  const texts = new Map<string, React.ReactNode>();
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<{ domain: string; children: React.ReactNode }>(child) && child.props.domain) {
      texts.set(child.props.domain, child.props.children);
    }
  });
  const steps = domains
    .map((domain) => ({ domain, topics: topicsOfYear(domain.topics, year, currentYear), text: texts.get(domain.number) }))
    .filter((step) => step.text || step.topics.length > 0);

  // Articles de l'année rattachés à aucun sujet de `data/roadmap.ts`.
  const mapped = new Set(steps.flatMap((s) => s.topics.flatMap((t) => t.posts.map((p) => p.permalink))));
  const orphans = posts.filter((p) => inYear(year)(p.permalink) && !mapped.has(p.permalink));

  return (
    <div className={styles.roadmap}>
      <ol className={styles.rail}>
        {steps.map(({ domain, topics, text }) => (
          <li key={domain.number} className={styles.domain}>
            <DomainTitle domain={domain} as="h3" />
            {text && <div className={styles.retroText}>{text}</div>}
            {topics.length > 0 && (
              <ul className={styles.topics}>
                {topics.map((topic) => (
                  <Topic key={topic.label} topic={topic} meta={topic.year !== year ? "approfondi" : topic.posts.length ? "nouveau" : "acquis"} />
                ))}
              </ul>
            )}
          </li>
        ))}
        {orphans.length > 0 && (
          <li className={styles.domain}>
            <h3 className={styles.domainTitle}>Autres articles</h3>
            <ul className={styles.posts}>
              {orphans.map((post) => (
                <li key={post.permalink}>
                  <Link to={post.permalink}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ol>
    </div>
  );
}
