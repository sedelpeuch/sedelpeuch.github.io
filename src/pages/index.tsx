import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import Layout from "@theme/Layout";
import Hero from "./_components/Hero";
import { Icon } from "@iconify/react";
import { majors } from "./_components/TechStack";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { motion } from "framer-motion";

export default function Home() {
  const {
    siteConfig: { customFields, tagline },
  } = useDocusaurusContext();
  const { description } = customFields as { description: string };

  return (
    <React.Fragment>
      <Layout title={tagline} description={description}>
        <main className="main-content-responsive">
          <div className={styles.mainContentResponsive}>
            <Hero />
            <div className={styles.timelineLayoutResponsive}>
              {/* Colonne gauche : Timeline (40%) */}
              <div className={styles.timelineColumn}>
                {/* Animation de la barre verticale synchronisée */}
                {(() => {
                  const timelineLength = 6; // nombre d'événements
                  const [barVisible, setBarVisible] = useState(false);
                  useEffect(() => {
                    const delay = 0.6 * (timelineLength - 4);
                    const timer = setTimeout(
                      () => setBarVisible(true),
                      delay * 1000,
                    );
                    return () => clearTimeout(timer);
                  }, []);
                  return (
                    <div className={styles.timelineBarMotion}>
                      <motion.div
                        className={styles.timelineBar}
                        initial={{ height: 0 }}
                        animate={
                          barVisible ? { height: "100%" } : { height: 0 }
                        }
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    </div>
                  );
                })()}
                {[
                  // Timeline events
                  { year: "2024", description: "Spécialisation DevOps" },
                  {
                    year: "2023",
                    description: "CATIE : 3e à la Robocup @Home Bordeaux",
                  },
                  {
                    year: "2022",
                    description: "CATIE : Ingénieur en informatique",
                  },
                  {
                    year: "2021",
                    description:
                      "ENSEIRB-MATMECA : spécialisation Robotique et Apprentissage",
                  },
                  {
                    year: "2019",
                    description: "ENSEIRB-MATMECA : filière informatique",
                  },
                  {
                    year: "2017",
                    description:
                      "Cycle Préparatoire de Bordeaux (CPBx) : spécialité MP",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      minHeight: 80,
                      position: "relative",
                    }}
                  >
                    <div className={styles.timelineYearCircleContainer}>
                      <div className={styles.timelineYearCircle} />
                    </div>
                    <div className={styles.timelineItemContent}>
                      <div className={styles.timelineItemYear}>{item.year}</div>
                      <div>{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Colonne droite : Tech Stack + Activités (60%) */}
              <motion.div
                className={styles.techStackColumn}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0, ease: "easeOut", delay: 0.5 }}
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
                    <div className={styles.activityCard}>
                      <Icon
                        icon="mdi:docker"
                        className={styles.activityCardIcon}
                      />
                      <div className={styles.activityCardTitle}>DevOps</div>
                      <div className={styles.activityCardDesc}>
                        Automatisation, CI/CD, conteneurisation, infrastructure
                        as code.
                      </div>
                    </div>
                    <div className={styles.activityCard}>
                      <Icon
                        icon="mdi:language-python"
                        className={styles.activityCardIcon}
                      />
                      <div className={styles.activityCardTitle}>
                        Informatique Python
                      </div>
                      <div className={styles.activityCardDesc}>
                        Développement Python quotidien : scripts, outils, API,
                        data.
                      </div>
                    </div>
                    <div className={styles.activityCard}>
                      <Icon
                        icon="mdi:clipboard-check"
                        className={styles.activityCardIcon}
                      />
                      <div className={styles.activityCardTitle}>
                        Coordination Projets
                      </div>
                      <div className={styles.activityCardDesc}>
                        Gestion et pilotage de projets pour des clients variés
                        (TPE, PME, startups).
                      </div>
                    </div>
                    <div className={styles.activityCard}>
                      <Icon
                        icon="mdi:robot"
                        className={styles.activityCardIcon}
                      />
                      <div className={styles.activityCardTitle}>
                        Coordination R&D robotique
                      </div>
                      <div className={styles.activityCardDesc}>
                        Organisation et suivi de la roadmap en robotique.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
}
