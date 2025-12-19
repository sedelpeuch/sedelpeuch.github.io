import React from "react";
import Layout from "@theme/Layout";
import Hero from "./_components/Hero";
import FeaturesSection from "./_components/FeaturesSection";
import HomepageProject from "./_components/ProjectSection";
import { Icon } from "@iconify/react";
import SectionTitle from "./_components/SectionTitle";
import { majors } from "./_components/TechStack";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home(): JSX.Element {
  const {
    siteConfig: { customFields, tagline },
  } = useDocusaurusContext();
  const { description } = customFields as { description: string };

  return (
    <Layout title={tagline} description={description}>
      <main>
        <Hero />
        <div className="container-wrapper">
          <HomepageProject />
          <section
            style={{
              width: "100vw",
              position: "relative",
              left: "50%",
              right: "50%",
              marginLeft: "-50vw",
              marginRight: "-50vw",
              padding: "2.5rem 0 0 0",
              background: "none",
            }}
          >
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              <SectionTitle icon="ph:stack" href={undefined}>
                Tech Stack
              </SectionTitle>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "2.2rem",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "1.8rem",
                  width: "100%",
                }}
              >
                {majors.map((tech) => (
                  <span
                    key={tech.name}
                    title={tech.name}
                    style={{
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.35rem",
                      transition: "transform 0.18s, box-shadow 0.18s",
                      borderRadius: "12px",
                      padding: "0.2em 0.2em",
                      cursor: "pointer",
                      minWidth: 70,
                      flex: "0 0 auto",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "scale(1.16) translateY(-6px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 24px 0 rgba(18,175,250,0.22)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <Icon icon={tech.logo} style={{ fontSize: 52 }} />
                    <span
                      style={{
                        fontSize: "0.93em",
                        color: "#bfc7d5",
                        marginTop: 2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tech.name}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </section>
          <FeaturesSection />
        </div>
      </main>
    </Layout>
  );
}
