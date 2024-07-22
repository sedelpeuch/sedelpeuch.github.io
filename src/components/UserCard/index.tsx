import React from "react";
import clsx from "clsx";
import { usePluginData } from "@docusaurus/useGlobalData";
import type { BlogPost } from "@docusaurus/plugin-content-blog";
import Link from "@docusaurus/Link";
import { Icon } from "@iconify/react";
import SocialLinks from "@site/src/components/SocialLinks";
import { useThemeConfig } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import { projects } from "@site/data/projects";

import styles from "./styles.module.scss";

type Count = {
  doc: number;
  project: number;
};

export default function UserCard({ isNavbar = false }: { isNavbar?: boolean }) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const { bio } = customFields as { bio: string };

  const {
    navbar: { title, logo = { src: "/img/logo.png" } },
  } = useThemeConfig();

  const logoLink = "/img/sde.jpg";

  const blogData = usePluginData("docusaurus-plugin-content-blog") as {
    posts: BlogPost[];
    postNum: number;
    tagNum: number;
  };
  const docData = (
    usePluginData("docusaurus-plugin-content-docs") as {
      versions: { docs: BlogPost[] };
    }
  )?.versions[0].docs;

  const count: Count = {
    doc: docData?.length ?? 0,
    project: projects?.length ?? 0,
  };

  return (
    <div className={clsx(isNavbar ? styles.userCardNavbar : styles.userCard)}>
      <Link href="/about">
        <img className={styles.cardImg} src={logoLink} alt="logo"></img>
      </Link>
      <div>
        <Link className={styles.name} href="about">
          {title}
        </Link>
      </div>
      <div className={styles.bio}>{bio}</div>
      <SocialLinks
        style={{
          maxWidth: "100%",
          padding: "0.5em 0",
          justifyContent: "center",
          gap: "0.5rem",
          ...(isNavbar ? { borderBottom: "1px solid #eee" } : null),
        }}
      />
    </div>
  );
}
