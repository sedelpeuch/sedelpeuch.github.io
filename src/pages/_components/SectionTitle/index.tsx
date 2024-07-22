import React from "react";
import { Icon } from "@iconify/react";
import Link from "@docusaurus/Link";

import styles from "./styles.module.scss";

interface Props {
  icon?: string;
  href?: string;
  children: React.ReactNode;
}

export default function SectionTitle({ children, icon, href }: Props) {
  return (
    <div className={styles.sectionTitle}>
      <h2>
        {icon && <Icon icon={icon}></Icon>}
        {children}
      </h2>
      {href && (
        <Link href={href} className={styles.moreButton}>
          Plus
          <Icon icon="ri:arrow-right-s-line"></Icon>
        </Link>
      )}
    </div>
  );
}
