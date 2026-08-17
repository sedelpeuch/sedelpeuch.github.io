import React from "react";
import { useCurrentSidebarCategory } from "@docusaurus/theme-common";
import SubjectCard from "@site/src/components/SubjectCard";
import styles from "./styles.module.scss";

export default function SubjectCardList() {
  const category = useCurrentSidebarCategory();
  const items = category.items.filter((item) => item.type !== "html");

  return (
    <div className={styles.grid}>
      {items.map((item) => {
        const href =
          item.type === "category"
            ? (item.href ?? "#")
            : (item as { href: string }).href;
        const customProps = (item.customProps ?? {}) as {
          icon?: string;
          school?: "cpbx" | "enseirb";
        };
        return (
          <SubjectCard
            key={item.label}
            href={href}
            label={item.label}
            icon={customProps.icon}
            school={customProps.school}
          />
        );
      })}
    </div>
  );
}
