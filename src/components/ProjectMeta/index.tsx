import React from "react";
import { Icon } from "@iconify/react";
import styles from "./styles.module.scss";
import { techIcon } from "../techIcons";

type Status = "en cours" | "en pause" | "terminé";

interface Props {
  /** Début de la période : « 2023 », « Juillet 2023 »… */
  start: string;
  /** Fin de la période ; absente = projet en cours. Égale à `start` = période ponctuelle. */
  end?: string;
  /** Force le statut (utile pour « en pause ») ; sinon déduit de `end`. */
  status?: Status;
  role?: string;
  domain?: string;
  stack?: string[];
}

export default function ProjectMeta({
  start,
  end,
  status,
  role,
  domain,
  stack = [],
}: Props): JSX.Element {
  const label: Status = status ?? (end ? "terminé" : "en cours");
  const single = end !== undefined && end === start;

  return (
    <aside className={styles.meta} aria-label="Fiche du projet">
      <div className={styles.rail} data-status={label} aria-hidden="true" />
      <div className={styles.body}>
        <p className={styles.period}>
          <time>{start}</time>
          {!single && (
            <>
              <span className={styles.arrow} aria-label="à">
                →
              </span>
              <time>{end ?? "aujourd'hui"}</time>
            </>
          )}
          <span className={styles.status} data-status={label}>
            {label}
          </span>
        </p>
        {role && <p className={styles.role}>{role}</p>}
        {domain && <p className={styles.domain}>{domain}</p>}
        {stack.length > 0 && (
          <ul className={styles.stack} aria-label="Technologies">
            {stack.map((tech) => {
              const icon = techIcon(tech);
              return (
                <li key={tech} className={styles.tech}>
                  {icon && <Icon icon={icon} className={styles.techIcon} aria-hidden="true" />}
                  <span>{tech}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
