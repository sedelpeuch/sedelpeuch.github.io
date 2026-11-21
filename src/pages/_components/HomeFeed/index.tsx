import React from "react";
import Link from "@docusaurus/Link";
import { Icon } from "@iconify/react";
import { usePluginData } from "@docusaurus/useGlobalData";
import {
  dateOf,
  useRoadmap,
  type Post,
} from "@site/src/components/Roadmap/shared";
import {
  projectPeriod,
  type ProjectData,
} from "@site/src/components/techIcons";
import styles from "./styles.module.css";

const DATE = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Billets publiés à la date du build, du plus récent au plus ancien.
function useLatestPosts(count: number): Post[] {
  const { posts } = useRoadmap();
  const { generatedAt } = usePluginData("series-data") as {
    generatedAt: number;
  };
  return posts
    .filter((p) => (dateOf(p.permalink)?.getTime() ?? Infinity) <= generatedAt)
    .sort(
      (a, b) =>
        (dateOf(b.permalink)?.getTime() ?? 0) -
        (dateOf(a.permalink)?.getTime() ?? 0),
    )
    .slice(0, count);
}

// Projets en cours, classés par nombre de billets du blog qui y renvoient.
function useActiveProjects(count: number): (ProjectData & { posts: number })[] {
  const { projects, articles } = usePluginData("projects-data") as {
    projects: ProjectData[];
    articles: Record<string, unknown[]>;
  };
  return projects
    .filter((p) => !p.end && !p.status)
    .map((p) => ({ ...p, posts: articles[p.permalink]?.length ?? 0 }))
    .sort((a, b) => b.posts - a.posts || a.title.localeCompare(b.title, "fr"))
    .slice(0, count);
}

// Sujets de la roadmap dont le dernier article a moins de deux mois, du plus récent au plus ancien.
function useCurrentTopics(count?: number): { domain: string; label: string }[] {
  const { domains } = useRoadmap();
  const last = (posts: Post[]) =>
    Math.max(0, ...posts.map((p) => dateOf(p.permalink)?.getTime() ?? 0));
  return domains
    .flatMap((d) =>
      d.topics
        .filter((t) => t.status === "en cours")
        .map((t) => ({ domain: d.label, label: t.label, last: last(t.posts) })),
    )
    .sort((a, b) => b.last - a.last)
    .slice(0, count);
}

function LatestPosts({ count = 3 }: { count?: number }): JSX.Element {
  const posts = useLatestPosts(count);
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.permalink} className={styles.item}>
          <span className={styles.ring} aria-hidden="true" />
          <Link to={post.permalink} className={styles.itemTitle}>
            {post.title}
          </Link>
          <span className={styles.itemMeta}>
            {DATE.format(dateOf(post.permalink)!)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ActiveProjects({ count = 3 }: { count?: number }): JSX.Element {
  const projects = useActiveProjects(count);
  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <li key={project.permalink} className={styles.item}>
          <span className={styles.ring} data-ongoing aria-hidden="true" />
          <Link to={project.permalink} className={styles.itemTitle}>
            {project.title}
          </Link>
          <span className={styles.itemMeta}>
            {projectPeriod(project)}
            {project.posts > 0 &&
              `, ${project.posts} article${project.posts > 1 ? "s" : ""}`}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CurrentTopics({ count }: { count?: number }): JSX.Element {
  const topics = useCurrentTopics(count);
  return (
    <ul className={styles.chips}>
      {topics.map((t) => (
        <li key={`${t.domain}/${t.label}`} title={t.domain}>
          <span className={styles.dot} aria-hidden="true" />
          {t.label}
        </li>
      ))}
    </ul>
  );
}

function Block({
  icon,
  title,
  to,
  more,
  children,
}: {
  icon: string;
  title: string;
  to: string;
  more: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.block}>
      <h2 className={styles.blockTitle}>
        <Icon icon={icon} className={styles.blockIcon} aria-hidden="true" />
        {title}
      </h2>
      {children}
      <Link to={to} className={styles.more}>
        {more} <Icon icon="mdi:arrow-right" aria-hidden="true" />
      </Link>
    </section>
  );
}

// Bas de la page d'accueil : ce qui bouge, lu dans le blog, les projets et la roadmap.
export default function HomeFeed(): JSX.Element {
  const { currentYear } = useRoadmap();
  return (
    <div className={styles.feed}>
      <Block
        icon="mdi:progress-clock"
        title="En ce moment"
        to={`/roadmap/${currentYear}`}
        more={`Roadmap ${currentYear}`}
      >
        <CurrentTopics count={6} />
      </Block>
      <Block
        icon="mdi:newspaper-variant-outline"
        title="Derniers articles"
        to="/blog"
        more="Tout le blog"
      >
        <LatestPosts />
      </Block>
      <Block
        icon="mdi:folder-star-outline"
        title="Projets en cours"
        to="/docs/projects"
        more="Tous les projets"
      >
        <ActiveProjects />
      </Block>
    </div>
  );
}
