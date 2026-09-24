import React from "react";
import Footer from "@theme-original/BlogPostItem/Footer";
import type FooterType from "@theme/BlogPostItem/Footer";
import type { WrapperProps } from "@docusaurus/types";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import Series from "@site/src/components/Series";
import CategoryNav from "@site/src/components/CategoryNav";

type Props = WrapperProps<typeof FooterType>;

// En bas de chaque billet : la piste de série si le billet appartient à une série
// (frontmatter `series`), sinon la navigation précédent / suivant dans sa catégorie.
export default function FooterWrapper(props: Props): JSX.Element {
  const { metadata, isBlogPostPage } = useBlogPost();
  const series = (metadata.frontMatter as { series?: string }).series;
  return (
    <>
      {isBlogPostPage &&
        (series ? (
          <Series id={series} source={metadata.source} />
        ) : (
          <CategoryNav source={metadata.source} />
        ))}
      <Footer {...props} />
    </>
  );
}
