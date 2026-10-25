import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./styles.module.scss";
import SocialLinks from "@site/src/components/SocialLinks";

// Apparition en CSS (classe `reveal`, rang `--i`) : elle démarre dès le premier
// affichage du HTML statique, sans attendre le chargement de React.
const reveal = (i: number) => ({ className: styles.reveal, style: { "--i": i } as React.CSSProperties });

function Circle() {
  return <div className={styles.circle} />;
}

function Name() {
  const { className, style } = reveal(1);
  return (
    <div
      className={`${styles.hero_text} ${className}`}
      style={style}
      onMouseMove={(e) => {
        e.currentTarget.style.setProperty("--x", `${e.clientX}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY}px`);
      }}
    >
      Sébastien Delpeuch
      <span
        className={styles.name}
        onMouseMove={(e) => {
          const bounding = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mouse-x", `${bounding.x}px`);
          e.currentTarget.style.setProperty("--mouse-y", `${bounding.y}px`);
        }}
      ></span>
    </div>
  );
}

export default function Hero() {
  // Illustration servie comme fichier (et non compilée dans le JavaScript) :
  // elle se met en cache et ne retarde plus le chargement de la page.
  const background = useBaseUrl("/img/hero-background.svg");
  return (
    <div className={styles.hero}>
      <div className={styles.intro}>
        <Name />
        <p {...reveal(2)}>Ingénieur en informatique au CATIE</p>
        <div {...reveal(3)}>
          <SocialLinks />
        </div>
        <div {...reveal(4)} className={`${styles.buttonGroup} ${styles.reveal}`}>
          <div className={styles.outer}>
            <div className={styles.gradient} />
            <a className={styles.button} href={"./about"}>
              Résumé
            </a>
          </div>
          <div className={styles.outer}>
            <div className={styles.gradient} />
            <a className={styles.button} href={"./docs/projects"}>
              Projets
            </a>
          </div>
          <div className={styles.outer}>
            <div className={styles.gradient} />
            <a className={styles.button} href={"./blog"}>
              Blog
            </a>
          </div>
        </div>
      </div>
      <div className={styles.background}>
        <img src={background} alt="" width={1536} height={1024} fetchPriority="high" />
        <Circle />
      </div>
    </div>
  );
}
