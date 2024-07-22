import React, { useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import { Project, projects } from "@site/data/projects";
import styles from "./styles.module.scss";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import SectionTitle from "../SectionTitle";

const removeHttp = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, "");
};

const defaultVelocity = 0.4;
const showProjects = projects.filter((i) => i.preview);

const Slider = ({ items }: { items: Project[] }) => {
  let baseVelocity = -defaultVelocity;
  const directionFactor = useRef<number>(1);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 6], {
    clamp: false,
  });

  useLayoutEffect(() => {
    baseX.set(6);
  });

  const x = useTransform(
    baseX,
    (v) => `${wrap(10, -3 * showProjects.length, v)}%`,
  );
  useAnimationFrame((time, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    if (baseX.get() <= -3 * showProjects.length) {
      baseX.set(11);
    }

    baseX.set(baseX.get() + moveBy);
  });
  const handleHoverStart = () => {
    baseX.stop();
    baseVelocity = 0;
  };
  const handleHoverEnd = () => {
    baseVelocity = -defaultVelocity;
  };

  return (
    <div
      className={styles.slider}
      style={{ width: `${showProjects.length * 100}%` }}
    >
      <motion.div
        className={styles["slide-track"]}
        style={{ x }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {items.map((item, index) => {
          return (
            <div className={styles.slide} key={item.title}>
              <a href={item.website} target="_blank">
                <img
                  src={item.preview}
                  alt={item.title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.slideBody}>
                  <h2 className={styles.title}>{item.title}</h2>
                  <p className={styles.website}>{removeHttp(item.website)}</p>
                </div>
              </a>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default function ProjectSection() {
  return (
    <section
      className={clsx("container padding-vert--sm", styles.projectContainer)}
    >
      <SectionTitle icon={"ri:projector-line"} href={"/project"}>
        Projets
      </SectionTitle>
      <div className={styles.content}>
        <div style={{ overflow: "hidden" }}>
          <Slider items={showProjects}></Slider>
        </div>
        <div className={clsx(styles.gradientBox, styles.leftBox)} />
        <div className={clsx(styles.gradientBox, styles.rightBox)} />
      </div>
    </section>
  );
}
