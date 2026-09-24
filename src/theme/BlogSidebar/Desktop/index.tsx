import React, { memo } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { useVisibleBlogSidebarItems } from "@docusaurus/plugin-content-blog/client";
import BlogSidebarContent from "@theme/BlogSidebar/Content";
import type { Props } from "@theme/BlogSidebar/Desktop";
import type { BlogSidebarItem } from "@docusaurus/plugin-content-blog";
import { Icon } from "@iconify/react";
import styles from "./styles.module.scss";

// Icônes de catégorie au trait (tabler), dans l'esprit des illustrations du site.
// La catégorie se lit dans le dossier du permalien : /blog/AAAA/MM/JJ/07-monitoring/...
const CATEGORIES: Record<string, { label: string; icon: string }> = {
  network: { label: "Réseau", icon: "tabler:topology-star-3" },
  containerization: { label: "Conteneurisation", icon: "tabler:box" },
  "ci-cd": { label: "CI/CD", icon: "tabler:git-merge" },
  cloud: { label: "Cloud", icon: "tabler:cloud" },
  orchestration: { label: "Orchestration", icon: "tabler:hierarchy-3" },
  monitoring: { label: "Observabilité", icon: "tabler:activity-heartbeat" },
  iac: { label: "Infrastructure as Code", icon: "tabler:file-code" },
  scripting: { label: "Scripting", icon: "tabler:terminal-2" },
};
const DEFAULT = { label: "DevOps", icon: "tabler:route" };

function categoryOf(permalink: string) {
  const folder = permalink.split("/").find((seg) => /^\d{2}-/.test(seg));
  return (folder && CATEGORIES[folder.replace(/^\d{2}-/, "")]) || DEFAULT;
}

const month = (date: string) =>
  new Date(date).toLocaleDateString("fr-FR", { month: "short", timeZone: "UTC" });

function ListComponent({ items }: { items: BlogSidebarItem[] }) {
  return (
    <ul className={clsx(styles.list, "clean-list")}>
      {items.map((item) => {
        const cat = categoryOf(item.permalink);
        return (
          <li key={item.permalink} className={styles.item}>
            <Icon icon={cat.icon} className={styles.icon} aria-label={cat.label} role="img" />
            <Link
              isNavLink
              to={item.permalink}
              className={styles.link}
              activeClassName={styles.linkActive}
            >
              {item.title}
            </Link>
            {item.date && <time className={styles.month}>{month(item.date)}</time>}
          </li>
        );
      })}
    </ul>
  );
}

function BlogSidebarDesktop({ sidebar }: Props): JSX.Element {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  return (
    <aside className="col col--3">
      <nav
        className={clsx(styles.sidebar, "thin-scrollbar")}
        aria-label={translate({
          id: "theme.blog.sidebar.navAriaLabel",
          message: "Blog recent posts navigation",
          description: "The ARIA label for recent posts in the blog sidebar",
        })}
      >
        <div className={clsx(styles.title, "margin-bottom--md")}>{sidebar.title}</div>
        <BlogSidebarContent
          items={items}
          ListComponent={ListComponent}
          yearGroupHeadingClassName={styles.year}
        />
      </nav>
    </aside>
  );
}

export default memo(BlogSidebarDesktop);
