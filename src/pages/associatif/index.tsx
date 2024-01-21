import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import {motion, Variants} from 'framer-motion' // Import motion from framer-motion


const variants: Variants = {
    visible: i => ({
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 25,
            stiffness: 100,
            duration: 0.3,
            delay: i * 0.3,
        },
    }),
    hidden: {opacity: 0, y: 30},
}

export default function Home() {
    const {
        siteConfig: {tagline},
    } = useDocusaurusContext();

    return (
        <Layout title={tagline}>
            <main>
                <Association
                    name="EirLab Community"
                    description="EirLab est un atelier de fabrication numérique (FabLab) proposant à ses membres des outils de prototypage rapide comme l’impression 3D, la découpe et gravure laser (indisponible pour le moment) ou la gravure de circuits électroniques. Des formations pour utiliser ces outils et une communauté pluridisciplinaire pour transformer une idée en prototype concret."
                    backgroundImage="/img/eirlab.jpg"
                    positions={[
                        {
                            title: "Fabmanager",
                            year: "2020 - 2021",
                            description: "Maintenance du parc machine"
                        },
                        {
                            title: "Président",
                            year: "2021 - 2022",
                            description: "Président du conseil d'administration"
                        },
                        {
                            title: "Vice Président",
                            year: "2022 - 2023",
                            description: "Responsable des Fabmanagers"
                        },
                        {
                            title: "Administrateur",
                            year: "2023 - 2024",
                            description: "Pôle partenariats & marketing"
                        }
                    ]}
                />
                <Association
                    name="Eirbot"
                    description="EIRBOT est l’association de Robotique de l’ENSEIRB-MATMECA. Chaque année, nous participons à la coupe de france de robotique en concevant et réalisant un ou plusieurs robots."
                    backgroundImage="/img/CDR2020-off-20.webp"
                    positions={[
                        {
                            title: "Membre",
                            year: "2019 - 2020",
                            description: ""
                        },
                        {
                            title: "Président",
                            year: "2020 - 2021",
                            description: ""
                        }
                    ]}
                />
            </main>
        </Layout>
    );
}

function Association({name, description, backgroundImage, positions}) {
    return (
        <div>
            <div className={styles.associationBanner}
                 style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`}}>
                <div className={styles.overlay}></div>
                <h1 style={{fontSize: "50px"}}>{name}</h1>
                <p style={{fontSize: "20px"}}>{description}</p>
            </div>
            <div className={styles.positions}>
                {positions.map((position, index) => <PositionCard key={index} position={position} index={index}/>)}
            </div>
        </div>
    );
}

function PositionCard({position, index}) {
    return (
        <motion.div
            className={styles.positionCard}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            <div className={styles.outer}>
                <div className={styles.gradient}/>
                <div className={styles.button}>
                    <h2 className={styles.title}>{position.title}</h2>
                    <span className={styles.year}>{position.year}</span>
                    <p className={styles.description}>{position.description}</p>
                </div>
            </div>
        </motion.div>
    );
}