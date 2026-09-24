import MDXComponents from "@theme-original/MDXComponents";
import ProjectMeta from "@site/src/components/ProjectMeta";
import ProjectIndex from "@site/src/components/ProjectIndex";
import { ProjectLink, ProjectLinks } from "@site/src/components/ProjectLink";
import CourseGrid from "@site/src/components/scolarite/CourseGrid";
import CourseTimeline from "@site/src/components/scolarite/CourseTimeline";
import ResourceList from "@site/src/components/scolarite/ResourceList";

// Composants disponibles dans tout fichier MDX sans import explicite.
export default {
  ...MDXComponents,
  ProjectMeta,
  ProjectIndex,
  ProjectLink,
  ProjectLinks,
  CourseGrid,
  CourseTimeline,
  ResourceList,
};
