import { visit } from "unist-util-visit";

// Remplace chaque formule (nœuds `math` et `inlineMath` de remark-math) par un
// composant <Katex tex="…" />, rendu par KaTeX au rendu de la page (SSR au build,
// puis hydratation). Avec rehype-katex, chaque formule devenait des centaines
// d'éléments JSX compilés dans le bundle : sur les cours de scolarité (plus de
// 20 000 formules), le serveur de dev et le build manquaient de mémoire.
export default function remarkKatexComponent() {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.type !== "math" && node.type !== "inlineMath") return;
      const display = node.type === "math";
      const attributes = [{ type: "mdxJsxAttribute", name: "tex", value: node.value }];
      if (display) attributes.push({ type: "mdxJsxAttribute", name: "display", value: null });
      parent.children[index] = {
        type: display ? "mdxJsxFlowElement" : "mdxJsxTextElement",
        name: "Katex",
        attributes,
        children: [],
      };
    });
  };
}
