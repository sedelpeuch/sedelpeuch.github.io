import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

export interface ResourceItem {
  label: string;
  href: string;
}

export type ResourceType = "cours" | "td" | "correction" | "projet" | "support";

export interface ResourceGroup {
  type: ResourceType;
  title: string;
  items: ResourceItem[];
}

const ICONS: Record<ResourceType, string> = {
  cours: "📘",
  td: "✏️",
  correction: "✅",
  projet: "🗂️",
  support: "📄",
};

export interface ResourceListProps {
  groups: ResourceGroup[];
}

export default function ResourceList({ groups }: ResourceListProps) {
  return (
    <>
      {groups.map((group) => (
        <div className={styles.group} key={group.title}>
          <h3 className={styles.groupTitle}>
            <span className={`${styles.icon} ${styles[group.type]}`} aria-hidden="true">
              {ICONS[group.type]}
            </span>
            {group.title}
            <span className={styles.count}>
              {group.items.length} document{group.items.length > 1 ? "s" : ""}
            </span>
          </h3>
          <div className={styles.list}>
            {group.items.map((item) => (
              <Link className={styles.item} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
