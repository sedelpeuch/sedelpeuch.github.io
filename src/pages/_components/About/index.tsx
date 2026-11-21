import React from "react";
import Link from "@docusaurus/Link";
import { Icon } from "@iconify/react";
import TechStack from "../TechStack";
import heroStyles from "../Hero/styles.module.scss";
import styles from "./styles.module.css";

const DOMAINS = [
  {
    icon: "mdi:database-cog-outline",
    title: "Applications et données",
    text: "Backends Python, pipelines d'ingestion et de traitement (données géographiques, signaux physiologiques, images industrielles).",
  },
  {
    icon: "mdi:robot-industrial-outline",
    title: "Robotique et vision",
    text: "Chaînes de perception et de contrôle sous ROS 2, inférence TensorRT sur cible embarquée, bancs de validation en simulation.",
  },
  {
    icon: "mdi:server-network",
    title: "Infrastructure",
    text: "Cluster Kubernetes interne en GitOps, infrastructure cloud en Terraform, charts Helm, supervision Prometheus et Grafana.",
  },
  {
    icon: "mdi:source-merge",
    title: "CI/CD",
    text: "Workflows GitHub Actions mutualisés, runners auto-hébergés, modèle de projet Python.",
  },
  {
    icon: "mdi:account-group-outline",
    title: "Coordination",
    text: "Pilotage de projets, feuilles de route, montage de projets financés, devis et relation client.",
  },
];

function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <img
        className={styles.photo}
        src="/img/sde-640.jpg"
        alt="Sébastien Delpeuch"
        width={168}
        height={168}
      />
      <div className={styles.intro}>
        <h1 className={styles.name}>Sébastien Delpeuch</h1>
        <p className={styles.role}>
          Ingénieur en informatique de l'ENSEIRB-MATMECA, spécialisé en DevOps
        </p>
        <p className={styles.lead}>
          Du code applicatif (backends, pipelines de données, robotique et
          vision) jusqu'à son déploiement et son exploitation.
        </p>
        <div className={styles.actions}>
          <a className={heroStyles.button} href="https://github.com/sedelpeuch">
            GitHub
          </a>
          <a className={heroStyles.button} href="mailto:sedelpeuch@gmail.com">
            Mail
          </a>
        </div>
        <p className={styles.award}>
          <Icon
            icon="mdi:trophy-outline"
            className={styles.awardIcon}
            aria-hidden="true"
          />
          <Link to="/docs/projects/professionnel/robocup-home-2023-catie">
            3e à la RoboCup @Home OPL 2023, Bordeaux
          </Link>
        </p>
      </div>
    </header>
  );
}

// Un seul rail : le poste, le diplôme, puis la stack.
function Path(): JSX.Element {
  return (
    <section className={styles.section}>
      <ol className={styles.rail}>
        <li className={styles.step}>
          <span className={styles.ring} data-ongoing aria-hidden="true" />
          <div className={styles.stepHead}>
            <h2 className={styles.stepTitle}>CATIE</h2>
            <span className={styles.stepDate}>depuis 2022</span>
          </div>
          <p className={styles.stepText}>
            Ingénieur en informatique, et coordinateur de projets depuis 2023.
          </p>
          <ul className={styles.domains}>
            {DOMAINS.map((d) => (
              <li key={d.title} className={styles.domain}>
                <Icon
                  icon={d.icon}
                  className={styles.domainIcon}
                  aria-hidden="true"
                />
                <div>
                  <h3 className={styles.domainTitle}>{d.title}</h3>
                  <p className={styles.domainText}>{d.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </li>
        <li className={styles.step}>
          <span className={styles.ring} aria-hidden="true" />
          <div className={styles.stepHead}>
            <h2 className={styles.stepTitle}>ENSEIRB-MATMECA</h2>
            <span className={styles.stepDate}>2019 à 2022</span>
          </div>
          <p className={styles.stepText}>
            Diplôme d'ingénieur en informatique, spécialisation Robotique et
            apprentissage, Bordeaux INP.
          </p>
        </li>
        <li className={styles.step}>
          <span className={styles.ring} aria-hidden="true" />
          <div className={styles.stepHead}>
            <h2 className={styles.stepTitle}>Tech stack</h2>
          </div>
          <div className={styles.stepBody}>
            <TechStack />
          </div>
        </li>
      </ol>
    </section>
  );
}

export default function About(): JSX.Element {
  return (
    <div className={styles.about}>
      <Header />
      <Path />
    </div>
  );
}
