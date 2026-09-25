import React, { memo } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { useVisibleBlogSidebarItems } from "@docusaurus/plugin-content-blog/client";
import BlogSidebarContent from "@theme/BlogSidebar/Content";
import type { Props } from "@theme/BlogSidebar/Desktop";
import type { BlogSidebarItem } from "@docusaurus/plugin-content-blog";
import { Icon } from "@iconify/react";
import { categoryOf } from "@site/src/components/blogCategories";
import styles from "./styles.module.scss";

// Jour et mois (« 20 septembre ») : l'année est déjà donnée par le groupe.
const dayMonth = (date: string) =>
  new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" });

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
            {item.date && (
              <time className={styles.month} dateTime={item.date}>
                {dayMonth(item.date)}
              </time>
            )}
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
