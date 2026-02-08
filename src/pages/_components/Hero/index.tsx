import { motion, useScroll, useTransform, Variants } from "framer-motion"; // Import motion from framer-motion
import HeroMain from "./img/background.svg";

import styles from "./styles.module.scss";
import SocialLinks from "@site/src/components/SocialLinks";

const variants: Variants = {
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 100,
      duration: 0.3,
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0, y: 30 },
};

function Circle() {
  return <div className={styles.circle} />;
}

function Name() {
  return (
    <motion.div
      className={styles.hero_text}
      custom={1}
      initial="hidden"
      animate="visible"
      variants={variants}
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
    </motion.div>
  );
}

export default function Hero() {
  return (
    <motion.div className={styles.hero}>
      <div className={styles.intro}>
        <Name />
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          Ingénieur en informatique au CATIE
        </motion.p>
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <SocialLinks />
        </motion.div>

        <motion.div
          className={styles.buttonGroup}
          custom={4}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
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
        </motion.div>
      </div>
      <motion.div className={styles.background}>
        <HeroMain />
        <Circle />
      </motion.div>
    </motion.div>
  );
}
