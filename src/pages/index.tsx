import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import Hero from "./_components/Hero";
import { Icon } from "@iconify/react";
import { majors } from "./_components/TechStack";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { motion } from "framer-motion";

export default function Home(): JSX.Element {
  const {
    siteConfig: { customFields, tagline },
  } = useDocusaurusContext();
  const { description } = customFields as { description: string };

  return (
    <>
      <style>{`
        body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
        }
        @media (max-width: 800px) {
          .timeline-layout-responsive {
            flex-direction: column-reverse !important;
          }
          .activity-cards-responsive {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
            padding: 0 0.5rem !important;
          }
          .main-content-responsive {
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }
        }
      `}</style>
      <Layout title={tagline} description={description}>
        <main className="main-content-responsive">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Hero />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "2.5rem",
                marginTop: "2.5rem",
                alignItems: "stretch",
                minHeight: 0,
              }}
              className="timeline-layout-responsive"
            >
              {/* Colonne gauche : Timeline (40%) */}
              <div
                style={{
                  flexBasis: "40%",
                  flexShrink: 0,
                  minWidth: 0,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "stretch",
                }}
              >
                {/* Animation de la barre verticale synchronisée */}
                {(() => {
                  const timelineLength = 6; // nombre d'événements
                  const [barVisible, setBarVisible] = useState(false);
                  useEffect(() => {
                    // Barre animée juste avant la fin, au moment où le dernier point commence
                    const delay = 0.6 * (timelineLength - 4);
                    const timer = setTimeout(
                      () => setBarVisible(true),
                      delay * 1000,
                    );
                    return () => clearTimeout(timer);
                  }, []);
                  return (
                    <motion.div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 36,
                        width: 0,
                        zIndex: 0,
                        pointerEvents: "none",
                      }}
                      initial={{ scaleY: 0 }}
                      animate={barVisible ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                      <div
                        style={{
                          width: 2,
                          height: "100%",
                          marginLeft: -1,
                          background:
                            "linear-gradient(to bottom, #12affa 20%, rgba(18,175,250,0) 100%)",
                          transformOrigin: "top",
                        }}
                      />
                    </motion.div>
                  );
                })()}
                <div
                  style={{
                    marginLeft: 0,
                    paddingLeft: 0,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {[
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
                  ].map((item, index, arr) => (
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
                      <div
                        style={{
                          position: "relative",
                          width: 72,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          zIndex: 2,
                        }}
                      >
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            background: "#232b3b",
                            border: "3px solid #12affa",
                            borderRadius: "50%",
                            marginTop: 0,
                            marginBottom: 0,
                            boxSizing: "border-box",
                            zIndex: 3,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          flex: 1,
                          borderRadius: "1rem",
                          padding: "1rem 1.2rem",
                          color: "#bfc7d5",
                          fontSize: "1em",
                          fontWeight: 500,
                          marginBottom: "1.5rem",
                        }}
                      >
                        <div
                          style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                        >
                          {item.year}
                        </div>
                        <div>{item.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Colonne droite : Tech Stack + Activités (60%) */}
              <div style={{ flexBasis: "60%", flexGrow: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                    gap: "2.2rem 2.2rem",
                    justifyItems: "center",
                    alignItems: "end",
                    width: "100%",
                    background: "none",
                    borderRadius: 0,
                    boxShadow: "none",
                    padding: 0,
                  }}
                >
                  {majors.map((tech) => (
                    <span
                      key={tech.name}
                      title={tech.name}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "box-shadow 0.18s, filter 0.18s",
                        borderRadius: "16px",
                        padding: "0.2em 0.2em",
                        cursor: "pointer",
                        minWidth: 80,
                        background: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 4px 18px 0 rgba(18,175,250,0.13)";
                        e.currentTarget.style.filter = "brightness(1.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "";
                        e.currentTarget.style.filter = "";
                      }}
                    >
                      <Icon icon={tech.logo} style={{ fontSize: 64 }} />
                      <span
                        style={{
                          fontSize: "1em",
                          color: "#bfc7d5",
                          marginTop: 2,
                          whiteSpace: "nowrap",
                          fontWeight: 500,
                          letterSpacing: "0.01em",
                        }}
                      >
                        {tech.name}
                      </span>
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: "2.5rem", marginBottom: "3.5rem" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "2rem",
                      width: "100%",
                    }}
                    className="activity-cards-responsive"
                  >
                    <div
                      style={{
                        background: "none",
                        borderRadius: "1rem",
                        padding: "1.7rem 1.2rem 1.3rem 1.2rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: 170,
                        minWidth: 0,
                        border: "1px solid #232b3b",
                        boxShadow: "none",
                      }}
                    >
                      <Icon
                        icon="mdi:docker"
                        style={{
                          fontSize: 38,
                          marginBottom: 12,
                          color: "#12affa",
                        }}
                      />
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "1.05em",
                          marginBottom: 6,
                          textAlign: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        DevOps
                      </div>
                      <div
                        style={{
                          color: "#bfc7d5",
                          fontSize: "0.98em",
                          textAlign: "center",
                        }}
                      >
                        Automatisation, CI/CD, conteneurisation, infrastructure
                        as code.
                      </div>
                    </div>
                    <div
                      style={{
                        background: "none",
                        borderRadius: "1rem",
                        padding: "1.7rem 1.2rem 1.3rem 1.2rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: 170,
                        minWidth: 0,
                        border: "1px solid #232b3b",
                        boxShadow: "none",
                      }}
                    >
                      <Icon
                        icon="mdi:language-python"
                        style={{
                          fontSize: 38,
                          marginBottom: 12,
                          color: "#12affa",
                        }}
                      />
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "1.05em",
                          marginBottom: 6,
                          textAlign: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Informatique Python
                      </div>
                      <div
                        style={{
                          color: "#bfc7d5",
                          fontSize: "0.98em",
                          textAlign: "center",
                        }}
                      >
                        Développement Python quotidien : scripts, outils, API,
                        data.
                      </div>
                    </div>
                    <div
                      style={{
                        background: "none",
                        borderRadius: "1rem",
                        padding: "1.7rem 1.2rem 1.3rem 1.2rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: 170,
                        minWidth: 0,
                        border: "1px solid #232b3b",
                        boxShadow: "none",
                      }}
                    >
                      <Icon
                        icon="mdi:clipboard-check"
                        style={{
                          fontSize: 38,
                          marginBottom: 12,
                          color: "#12affa",
                        }}
                      />
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "1.05em",
                          marginBottom: 6,
                          textAlign: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Coordination Projets
                      </div>
                      <div
                        style={{
                          color: "#bfc7d5",
                          fontSize: "0.98em",
                          textAlign: "center",
                        }}
                      >
                        Gestion et pilotage de projets pour des clients variés
                        (TPE, PME, startups).
                      </div>
                    </div>
                    <div
                      style={{
                        background: "none",
                        borderRadius: "1rem",
                        padding: "1.7rem 1.2rem 1.3rem 1.2rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: 170,
                        minWidth: 0,
                        border: "1px solid #232b3b",
                        boxShadow: "none",
                      }}
                    >
                      <Icon
                        icon="mdi:robot"
                        style={{
                          fontSize: 38,
                          marginBottom: 12,
                          color: "#12affa",
                        }}
                      />
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "1.05em",
                          marginBottom: 6,
                          textAlign: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Coordination R&D robotique
                      </div>
                      <div
                        style={{
                          color: "#bfc7d5",
                          fontSize: "0.98em",
                          textAlign: "center",
                        }}
                      >
                        Organisation et suivi de la roadmap en robotique.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
