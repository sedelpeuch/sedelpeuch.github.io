import React from "react";
import { Icon } from "@iconify/react";
import styles from "./styles.module.scss";

const LICENSE_URL = "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr";

// Conditions de la licence, dans l'ordre de son sigle.
const TERMS: [string, string][] = [
  ["tabler:creative-commons-by", "Attribution"],
  ["tabler:creative-commons-nc", "Pas d'utilisation commerciale"],
  ["tabler:creative-commons-sa", "Partage dans les mêmes conditions"],
];

// Licence des notes de la section Scolarité, en bas de chacune de ses pages.
export default function License(): JSX.Element {
  return (
    <aside className={styles.license}>
      <a href={LICENSE_URL} className={styles.badge} target="_blank" rel="license noopener noreferrer">
        <Icon icon="tabler:creative-commons" aria-hidden="true" />
        {TERMS.map(([icon, label]) => (
          <Icon key={icon} icon={icon} aria-label={label} />
        ))}
      </a>
      <p className={styles.text}>
        Sauf mention contraire, les notes de cours, fiches et corrections de cette section sont rédigées par Sébastien
        Delpeuch et diffusées sous licence{" "}
        <a href={LICENSE_URL} target="_blank" rel="license noopener noreferrer">
          CC BY-NC-SA 4.0
        </a>
        . Elles peuvent être copiées et modifiées en citant l'auteur, hors usage commercial et à condition de garder
        la même licence. Les supports d'enseignants et les travaux de groupe restent la propriété de leurs auteurs.
      </p>
    </aside>
  );
}
