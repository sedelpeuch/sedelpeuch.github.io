import React from "react";
import clsx from "clsx";
import Content from "@theme-original/BlogSidebar/Content";
import type ContentType from "@theme/BlogSidebar/Content";
import type { WrapperProps } from "@docusaurus/types";
import Link from "@docusaurus/Link";
import { Icon } from "@iconify/react";
import styles from "./styles.module.scss";

type Props = WrapperProps<typeof ContentType>;

const SHORTCUTS = [
  { label: "Roadmap", to: "/roadmap", icon: "tabler:route" },
  { label: "Séries", to: "/blog/series", icon: "tabler:list-numbers" },
];

// En tête de la liste des billets (sidebar desktop et menu mobile) : accès à la
// roadmap et au catalogue des séries, avant les groupes par année.
export default function ContentWrapper(props: Props): JSX.Element {
  return (
    <>
      <ul className={clsx(styles.shortcuts, "clean-list")}>
        {SHORTCUTS.map((s) => (
          <li key={s.to}>
            <Link to={s.to} className={styles.link}>
              <Icon icon={s.icon} className={styles.icon} aria-hidden="true" />
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
      <Content {...props} />
    </>
  );
}
