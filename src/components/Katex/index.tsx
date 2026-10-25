import React, { useMemo } from "react";
import katex from "katex";

interface Props {
  /** Source LaTeX de la formule. */
  tex: string;
  /** Formule centrée (bloc `$$`) plutôt qu'en ligne. */
  display?: boolean;
}

// Formule produite par plugins/remark-katex-component : le bundle ne contient que
// la source LaTeX, KaTeX produit le HTML au rendu (statique au build, puis à
// l'hydratation), avec la même sortie que rehype-katex.
export default function Katex({ tex, display = false }: Props): JSX.Element {
  const html = useMemo(
    () => katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: "ignore" }),
    [tex, display],
  );
  return display ? (
    <div className="math math-display" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span className="math math-inline" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
