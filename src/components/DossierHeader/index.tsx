import React from "react";
import styles from "./styles.module.scss";

export interface DossierHeaderProps {
  school: "cpbx" | "enseirb";
  crumbs: string[];
}

export default function DossierHeader({ school, crumbs }: DossierHeaderProps) {
  return (
    <div className={`${styles.tab} ${styles[school]}`}>
      {crumbs.map((crumb, index) => (
        <span
          className={index < crumbs.length - 1 ? styles.crumb : styles.current}
          key={crumb}
        >
          {crumb}
        </span>
      ))}
    </div>
  );
}
