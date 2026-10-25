import React, { useEffect } from "react";
import Content from "@theme-original/NotFound/Content";
import type ContentType from "@theme/NotFound/Content";
import type { WrapperProps } from "@docusaurus/types";
import { useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import pdfRedirects from "@site/data/pdfRedirects.json";

// Les fichiers sont servis sous [nom]-[hash du contenu].[ext] : recompresser un PDF
// change son URL. Les anciennes adresses encore indexées renvoient vers la nouvelle.
const REDIRECTS: Record<string, string> = pdfRedirects;

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): JSX.Element | null {
  const { pathname } = useLocation();
  const prefix = useBaseUrl("/assets/files/");
  const target = pathname.startsWith(prefix)
    ? REDIRECTS[decodeURIComponent(pathname.slice(prefix.length))]
    : undefined;

  useEffect(() => {
    if (target) window.location.replace(prefix + target);
  }, [prefix, target]);

  return target ? null : <Content {...props} />;
}
