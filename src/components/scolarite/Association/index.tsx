import React from "react";
import styles from "./styles.module.scss";

interface Role {
  /** Période : « 2021-2022 ». */
  period: string;
  role: string;
}

interface Props {
  name: string;
  image: string;
  alt: string;
  /** Rôles tenus, du plus récent au plus ancien. */
  roles: Role[];
  /** Présentation de l'association (markdown). */
  children?: React.ReactNode;
}

// Encart d'une association de la page Scolarité > Associatif : photo,
// présentation, puis rôles tenus sur le rail d'anneaux de la timeline d'accueil.
export default function Association({ name, image, alt, roles, children }: Props): JSX.Element {
  return (
    <section className={styles.association} aria-label={name}>
      <img className={styles.photo} src={image} alt={alt} loading="lazy" width={1200} height={675} />
      <div className={styles.body}>
        <div className={styles.text}>{children}</div>
        <p className={styles.rolesTitle}>Rôles tenus</p>
        <ol className={styles.rail}>
          {roles.map(({ period, role }) => (
            <li key={period} className={styles.item}>
              <span className={styles.role}>{role}</span>
              <time className={styles.period}>{period}</time>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
