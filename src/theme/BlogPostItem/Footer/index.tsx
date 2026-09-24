import React from "react";
import Footer from "@theme-original/BlogPostItem/Footer";
import type FooterType from "@theme/BlogPostItem/Footer";
import type { WrapperProps } from "@docusaurus/types";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import Series from "@site/src/components/Series";

type Props = WrapperProps<typeof FooterType>;

// Ajoute la navigation de série (frontmatter `series`) en bas de chaque billet.
export default function FooterWrapper(props: Props): JSX.Element {
  const { metadata, isBlogPostPage } = useBlogPost();
  const series = (metadata.frontMatter as { series?: string }).series;
  return (
    <>
      {isBlogPostPage && series && <Series id={series} source={metadata.source} />}
      <Footer {...props} />
    </>
  );
}
