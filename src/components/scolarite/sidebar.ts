import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

// Utilitaires de lecture de la sidebar (catégories auto-générées de docs/scolarite).

export type CourseItem = Extract<PropSidebarItem, { type: "category" | "link" }>;

export function visibleItems(items: PropSidebarItem[]): CourseItem[] {
  return items.filter(
    (item): item is CourseItem =>
      (item.type === "category" || item.type === "link") && !item.unlisted,
  );
}

/** Nombre de pages (feuilles) sous un élément de sidebar. */
export function countPages(item: CourseItem): number {
  if (item.type === "link") return 1;
  return visibleItems(item.items).reduce((n, child) => n + countPages(child), 0);
}

/** Identifiant de la page d'index d'une catégorie, déduit de son lien. */
export function indexDocId(href?: string): string | undefined {
  if (!href) return undefined;
  const path = href.replace(/^\/docs\//, "").replace(/\/$/, "");
  return `${path}/index`;
}

export const customIcon = (item: CourseItem) =>
  (item.customProps as { icon?: string } | undefined)?.icon;
