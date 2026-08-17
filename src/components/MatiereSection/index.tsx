import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

export interface MatiereSectionProps {
  icon: string;
  title: string;
  responsable?: { name: string; href?: string };
  children?: React.ReactNode;
}

export default function MatiereSection({
  icon,
  title,
  responsable,
  children,
}: MatiereSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <span className={styles.emoji} aria-hidden="true">
          {icon}
        </span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {responsable && (
        <p className={styles.responsable}>
          Responsable :{" "}
          {responsable.href ? (
            <Link href={responsable.href}>{responsable.name}</Link>
          ) : (
            responsable.name
          )}
        </p>
      )}
      {children}
    </section>
  );
}
