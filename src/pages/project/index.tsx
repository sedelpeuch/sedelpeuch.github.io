import React from "react";
import clsx from "clsx";
import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ShowcaseCard from "./_components/ShowcaseCard";
import {
  groupByProjects,
  projects,
  projectTypeMap,
  Project,
} from "../../../data/projects";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

import styles from "./styles.module.css";
import MyLayout from "@site/src/theme/MyLayout";
import { upperFirst } from "@site/src/utils/jsUtils";

const TITLE = translate({
  id: "theme.project.title",
  message: "Projets",
});
const DESCRIPTION = translate({
  id: "theme.project.description",
  message: "",
});

// const GITHUB_URL = 'https://github.com/kuizuo'

type ProjectState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

export function prepareUserState(): ProjectState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

function ShowcaseHeader() {
  return (
    <section className="text--center">
      <h2>{TITLE}</h2>
      <p>{DESCRIPTION}</p>
      {/* <a
      </a> */}
    </section>
  );
}

function ShowcaseCards() {
  // Tri décroissant par année
  const sortedProjects = [...projects].sort((a, b) => {
    const yearA = a.year ? parseInt(a.year, 10) : 0;
    const yearB = b.year ? parseInt(b.year, 10) : 0;
    return yearB - yearA;
  });
  return (
    <section className="margin-top--lg margin-bottom--xl">
      <div className="container margin-top--lg">
        <ul className={styles.showcaseList}>
          {sortedProjects.map((project) => (
            <ShowcaseCard key={project.title} project={project} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Showcase(): JSX.Element {
  return (
    <MyLayout title={TITLE} description={DESCRIPTION} maxWidth={1280}>
      <main className="margin-vert--lg">
        <ShowcaseHeader />
        <ShowcaseCards />
      </main>
    </MyLayout>
  );
}

export default Showcase;
