import MDXComponents from "@theme-original/MDXComponents";
import ProjectMeta from "@site/src/components/ProjectMeta";
import ProjectIndex from "@site/src/components/ProjectIndex";
import { ProjectLink, ProjectLinks } from "@site/src/components/ProjectLink";

// Composants disponibles dans tout fichier MDX sans import explicite.
export default {
  ...MDXComponents,
  ProjectMeta,
  ProjectIndex,
  ProjectLink,
  ProjectLinks,
};
