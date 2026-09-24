import React from "react";
import DocPaginator from "@theme-original/DocPaginator";
import type DocPaginatorType from "@theme/DocPaginator";
import type { WrapperProps } from "@docusaurus/types";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import { useDoc } from "@docusaurus/plugin-content-docs/client";

type Props = WrapperProps<typeof DocPaginatorType>;

// Section d'un doc = premier dossier de son identifiant (enseignement, projects,
// scolarite…). Le permalien ne suffit pas : certaines pages d'Enseignement ont
// gardé un ancien slug en /projects/ qu'il ne faut pas casser.
const topDir = (id?: string) => id?.split("/")[0];

// Ne propose « précédent » / « suivant » qu'à l'intérieur d'une même section :
// la sidebar unique enchaînait sinon Enseignement, Projets et Scolarité.
export default function DocPaginatorWrapper(props: Props): JSX.Element | null {
  const { metadata } = useDoc();
  const idByPath = new Map<string, string>();
  for (const plugin of Object.values(useAllDocsData())) {
    for (const version of plugin.versions) {
      for (const doc of version.docs) idByPath.set(doc.path.replace(/\/$/, ""), doc.id);
    }
  }
  const sectionOf = (permalink?: string) =>
    permalink ? topDir(idByPath.get(permalink.replace(/\/$/, ""))) : undefined;

  const current = topDir(metadata.id);
  const previous = sectionOf(props.previous?.permalink) === current ? props.previous : undefined;
  const next = sectionOf(props.next?.permalink) === current ? props.next : undefined;
  if (!previous && !next) return null;
  return <DocPaginator {...props} previous={previous} next={next} />;
}
