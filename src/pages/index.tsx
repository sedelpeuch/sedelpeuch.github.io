import * as React from "react";
import styles from "./index.module.css";
import Layout from "@theme/Layout";
import Hero from "./_components/Hero";
import HomeFeed from "./_components/HomeFeed";
import { addCollection, Icon } from "@iconify/react";
import { majors } from "./_components/TechStack";
import homeIcons from "./_components/homeIcons.json";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// Icônes de la page embarquées : rendues dans le HTML statique au lieu d'être
// téléchargées depuis l'API Iconify après le chargement de React.
homeIcons.forEach((collection) => addCollection(collection));

const timeline = [
  { year: "2026", description: "Cloud AWS et Terraform" },
  { year: "2025", description: "Kubernetes en production et observabilité" },
  { year: "2024", description: "Spécialisation DevOps" },
  { year: "2023", description: "CATIE : 3e à la Robocup @Home Bordeaux" },
  { year: "2022", description: "CATIE : Ingénieur en informatique" },
  { year: "2019", description: "ENSEIRB-MATMECA : filière informatique" },
];

const activities = [
  {
    icon: "mdi:docker",
    title: "DevOps",
    desc: "Kubernetes, CI/CD GitHub Actions, infrastructure en Terraform et Helm, observabilité.",
  },
  {
    icon: "mdi:language-python",
    title: "Développement",
    desc: "Backends Python, pipelines de données, outils internes.",
  },
  {
    icon: "mdi:clipboard-check",
    title: "Coordination de projets",
    desc: "Pilotage de projets clients, devis, montage de projets financés.",
  },
  {
    icon: "mdi:robot",
    title: "Robotique et vision",
    desc: "ROS 2, perception et contrôle, vision embarquée, simulation.",
  },
];

// Rang d'apparition (`--i`) : les animations sont en CSS et démarrent dès le
// premier affichage, sans attendre React.
const order = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Home() {
  const {
    siteConfig: { customFields, tagline },
  } = useDocusaurusContext();
  const { description } = customFields as { description: string };

  return (
    <Layout title={tagline} description={description}>
      <main className="main-content-responsive">
        <div className={styles.mainContentResponsive}>
          <Hero />
          <div className={styles.timelineLayoutResponsive}>
            {/* Colonne gauche : frise */}
            <div className={styles.timelineColumn}>
              <div className={styles.timelineBarMotion}>
                <div className={styles.timelineBar} />
              </div>
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`${styles.timelineItem} ${styles.revealLeft}`}
                  style={order(index)}
                >
                  <div className={styles.timelineYearCircleContainer}>
                    <div className={styles.timelineYearCircle} />
                  </div>
                  <div className={styles.timelineItemContent}>
                    <div className={styles.timelineItemYear}>{item.year}</div>
                    <div>{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Colonne droite : technologies et activités */}
            <div
              className={`${styles.techStackColumn} ${styles.revealRight}`}
              style={order(2)}
            >
              <div className={styles.techStackGrid}>
                {majors.map((tech) => (
                  <span
                    key={tech.name}
                    title={tech.name}
                    className={styles.techStackItem}
                  >
                    <Icon icon={tech.logo} className={styles.techStackIcon} />
                    <span className={styles.techStackName}>{tech.name}</span>
                  </span>
                ))}
              </div>
              <div className={styles.activityCardsContainer}>
                <div className={styles.activityCardsResponsive}>
                  {activities.map((activity) => (
                    <div key={activity.title} className={styles.activityCard}>
                      <Icon
                        icon={activity.icon}
                        className={styles.activityCardIcon}
                      />
                      <div className={styles.activityCardTitle}>
                        {activity.title}
                      </div>
                      <div className={styles.activityCardDesc}>
                        {activity.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <HomeFeed />
        </div>
      </main>
    </Layout>
  );
}
