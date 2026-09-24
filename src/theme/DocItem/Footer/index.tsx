import React from "react";
import Footer from "@theme-original/DocItem/Footer";
import type FooterType from "@theme/DocItem/Footer";
import type { WrapperProps } from "@docusaurus/types";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import ProjectArticles from "@site/src/components/ProjectArticles";

type Props = WrapperProps<typeof FooterType>;

// Sur les pages projets : liste des billets du blog qui renvoient au projet.
export default function FooterWrapper(props: Props): JSX.Element {
  const { metadata } = useDoc();
  return (
    <>
      {metadata.id.startsWith("projects/") && <ProjectArticles permalink={metadata.permalink} />}
      <Footer {...props} />
    </>
  );
}
