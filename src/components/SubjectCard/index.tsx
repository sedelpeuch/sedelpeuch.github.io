import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

export interface SubjectCardProps {
  href: string;
  label: string;
  icon?: string;
  school?: "cpbx" | "enseirb";
}

export default function SubjectCard({
  href,
  label,
  icon = "📄",
  school,
}: SubjectCardProps) {
  const schoolClass = school ? styles[school] : "";
  return (
    <Link href={href} className={`${styles.card} ${schoolClass}`}>
      <span className={styles.emoji} aria-hidden="true">
        {icon}
      </span>
      <h4 className={styles.title}>{label}</h4>
    </Link>
  );
}
