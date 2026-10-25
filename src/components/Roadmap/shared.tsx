import React from "react";
import Link from "@docusaurus/Link";
import { Icon } from "@iconify/react";
import { usePluginData } from "@docusaurus/useGlobalData";
import { ROADMAP, type RoadmapDomain, type RoadmapTopic, type TopicStatus } from "@site/data/roadmap";
import styles from "./styles.module.scss";

export interface Post {
  title: string;
  permalink: string;
  source: string;
}

export interface ResolvedTopic {
  label: string;
  status: TopicStatus;
  practiced: boolean;
  year?: number;
  posts: Post[];
}

export type ResolvedDomain = Omit<RoadmapDomain, "topics"> & { topics: ResolvedTopic[] };

// `@site/blog/02-network/2026-02-21-ssl-tls.md` → `02-network/ssl-tls`
function refOf(source: string): string {
  const [folder, file] = source.replace(/^@site\/blog\//, "").split("/");
  return `${folder}/${file?.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.mdx?$/, "")}`;
}

// Date de publication d'après le permalien (`/blog/2026/10/25/...`).
export function dateOf(permalink: string): Date | undefined {
  const match = permalink.match(/\/blog\/(\d{4})\/(\d{2})\/(\d{2})\//);
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : undefined;
}

// Un sujet dont le dernier article a moins de deux mois est « en cours ».
const RECENT_MS = 60 * 24 * 3600 * 1000;

function resolve(topic: RoadmapTopic, index: Map<string, Post>, now: number): ResolvedTopic {
  const posts = (topic.articles ?? []).flatMap((ref) => {
    const post = index.get(ref);
    if (!post && process.env.NODE_ENV === "development") {
      console.warn(`Roadmap : article introuvable « ${ref} »`);
    }
    return post ? [post] : [];
  });
  const times = posts.map((p) => dateOf(p.permalink)?.getTime()).filter((t): t is number => t !== undefined);
  const recent = times.some((t) => now - t < RECENT_MS);
  const status = topic.status ?? (recent ? "en cours" : posts.length ? "acquis" : "à venir");
  const practiced = posts.length > 0 || status === "acquis";
  return {
    label: topic.label,
    status,
    practiced,
    year: practiced ? topic.since ?? (times.length ? new Date(Math.min(...times)).getFullYear() : undefined) : undefined,
    posts,
  };
}

// Domaines de `data/roadmap.ts`, sujets résolus d'après les articles du blog.
export function useRoadmap(): { domains: ResolvedDomain[]; posts: Post[]; currentYear: number } {
  const { categories, generatedAt } = usePluginData("series-data") as {
    categories: Record<string, Post[]>;
    generatedAt: number;
  };
  const posts = Object.values(categories).flat();
  const index = new Map(posts.map((post) => [refOf(post.source), post] as const));
  const domains = ROADMAP.map((domain) => ({
    ...domain,
    topics: domain.topics.map((topic) => resolve(topic, index, generatedAt)),
  }));
  return { domains, posts, currentYear: new Date(generatedAt).getFullYear() };
}

export function Topic({ topic, meta }: { topic: ResolvedTopic; meta?: string }) {
  return (
    <li className={styles.topic} data-status={topic.status}>
      <div className={styles.topicHead}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.topicLabel}>{topic.label}</span>
        <span className={styles.topicMeta}>{meta ?? (topic.status === "acquis" ? topic.year : topic.status)}</span>
      </div>
      {topic.posts.length > 0 && (
        <ul className={styles.posts}>
          {topic.posts.map((post) => (
            <li key={post.permalink}>
              <Link to={post.permalink}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function DomainTitle({ domain, as: Heading = "h2" }: { domain: RoadmapDomain | ResolvedDomain; as?: "h2" | "h3" }) {
  return (
    <div className={styles.domainHead}>
      <Icon icon={domain.icon} className={styles.domainIcon} aria-hidden="true" />
      <Heading className={styles.domainTitle}>
        <span className={styles.domainNumber}>{domain.number}</span>
        {domain.tag ? <Link to={`/blog/tags/${domain.tag}`}>{domain.label}</Link> : domain.label}
      </Heading>
    </div>
  );
}

export function Stats({ items }: { items: [string, number][] }) {
  return (
    <dl className={styles.stats}>
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

// Histogramme vertical ; le nombre reste posé sur sa barre.
export function Histogram({
  bars,
  label,
  dense,
}: {
  bars: { label: string; count: number; to?: string; title?: string }[];
  label: string;
  dense?: boolean;
}) {
  const max = Math.max(1, ...bars.map((b) => b.count));
  return (
    <ol className={styles.years} aria-label={label} data-dense={dense}>
      {bars.map((bar) => {
        const content = (
          <>
            <span className={styles.yearTrack}>
              <span className={styles.yearCount}>{bar.count || ""}</span>
              <span className={styles.yearBar} style={{ height: `calc(${bar.count / max} * (100% - 1.3rem))` }} />
            </span>
            <span className={styles.yearLabel}>{bar.label}</span>
          </>
        );
        return (
          <li key={bar.label} title={bar.title}>
            {bar.to ? <Link to={bar.to}>{content}</Link> : content}
          </li>
        );
      })}
    </ol>
  );
}

export function Legend() {
  return (
    <ul className={styles.legend}>
      <li data-status="acquis">
        <span className={styles.dot} aria-hidden="true" />
        pratiqué
      </li>
      <li data-status="en cours">
        <span className={styles.dot} aria-hidden="true" />
        en cours
      </li>
      <li data-status="à venir">
        <span className={styles.dot} aria-hidden="true" />
        à venir
      </li>
    </ul>
  );
}
