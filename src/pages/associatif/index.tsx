import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";

const associations = [
  {
    name: "EirLab Community",
    description:
      "EirLab est un atelier de fabrication numérique (FabLab) proposant à ses membres des outils de prototypage rapide comme l’impression 3D, la découpe et gravure laser ou la gravure de circuits électroniques. Formations et communauté pluridisciplinaire pour transformer une idée en prototype concret.",
    image: "/img/eirlab.jpg",
    roles: [
      { title: "Fabmanager", year: "2020-2021" },
      { title: "Président", year: "2021-2022" },
      { title: "Vice Président", year: "2022-2023" },
      { title: "Administrateur", year: "2023-2024" },
    ],
  },
  {
    name: "Eirbot",
    description:
      "EIRBOT est l’association de Robotique de l’ENSEIRB-MATMECA. Chaque année, nous participons à la coupe de France de robotique en concevant et réalisant un ou plusieurs robots.",
    image: "/img/CDR2020-off-20.webp",
    roles: [
      { title: "Membre", year: "2019-2020" },
      { title: "Président", year: "2020-2021" },
    ],
  },
];

export default function Associatif() {
  return (
    <Layout title="Associatif">
      <main className={styles.assoMain}>
        <h1 className={styles.assoTitle}>Associations</h1>
        <div className={styles.assoStack}>
          {associations.map((asso) => (
            <div className={styles.assoCardFull} key={asso.name}>
              <div
                className={styles.assoImageFull}
                style={{ backgroundImage: `url(${asso.image})` }}
                aria-label={asso.name}
              />
              <div className={styles.assoContentFull}>
                <h2 className={styles.assoNameFull}>{asso.name}</h2>
                <p className={styles.assoDescFull}>{asso.description}</p>
                <ul className={styles.assoTimeline}>
                  {asso.roles.map((role, i) => (
                    <li
                      className={styles.assoTimelineItem}
                      key={role.title + role.year}
                    >
                      <span className={styles.assoTimelineTitle}>
                        {role.title}
                      </span>
                      <span className={styles.assoTimelineYear}>
                        {role.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
