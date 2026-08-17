import React from "react";
import styles from "./styles.module.scss";

export type ResourceType = "cours" | "td" | "correction" | "projet" | "support";

const ICONS: Record<ResourceType, string> = {
  cours: "📘",
  td: "✏️",
  correction: "✅",
  projet: "🗂️",
  support: "📄",
};

export interface ResourceListProps {
  type: ResourceType;
  title: string;
  count: number;
  children?: React.ReactNode;
}

export default function ResourceList({ type, title, count, children }: ResourceListProps) {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>
        <span className={`${styles.icon} ${styles[type]}`} aria-hidden="true">
          {ICONS[type]}
        </span>
        {title}
        <span className={styles.count}>
          {count} document{count > 1 ? "s" : ""}
        </span>
      </h3>
      <div className={styles.list}>{children}</div>
    </div>
  );
}
