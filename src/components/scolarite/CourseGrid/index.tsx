import React from "react";
import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";
import Link from "@docusaurus/Link";
import { Icon } from "@iconify/react";
import { useCurrentSidebarCategory } from "@docusaurus/plugin-content-docs/client";
import { useDocsVersion } from "@docusaurus/plugin-content-docs/client";
import ResourceList from "../ResourceList";
import { subjectIcon } from "../icons";
import { countPages, customIcon, indexDocId, visibleItems, type CourseItem } from "../sidebar";
import styles from "./styles.module.scss";

function useDescription(item: CourseItem): string | undefined {
  const { docs } = useDocsVersion();
  const id = item.type === "link" ? item.docId : indexDocId(item.href);
  const description = id ? docs[id]?.description : undefined;
  if (description || item.type === "link") return description;
  // Catégorie liée à l'une de ses pages (_category_.json) plutôt qu'à un index.
  const linked = findLink(item.items, item.href);
  return linked ? docs[linked]?.description : undefined;
}

function findLink(items: PropSidebarItem[], href?: string): string | undefined {
  for (const child of visibleItems(items)) {
    if (child.type === "link" && child.href === href) return child.docId;
    const found = child.type === "category" ? findLink(child.items, href) : undefined;
    if (found) return found;
  }
  return undefined;
}

function Tile({ item }: { item: CourseItem }) {
  const description = useDescription(item);
  const href = item.href ?? "#";
  const icon = customIcon(item) ?? subjectIcon(item.label, href);
  const pages = item.type === "category" ? countPages(item) : 0;
  return (
    <Link to={href} className={styles.tile}>
      <span className={styles.head}>
        <Icon icon={icon} className={styles.icon} aria-hidden="true" />
        <span className={styles.title}>{item.label}</span>
      </span>
      {description && <span className={styles.description}>{description}</span>}
      {pages > 0 && (
        <span className={styles.count}>
          {pages} page{pages > 1 ? "s" : ""}
        </span>
      )}
    </Link>
  );
}

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/^(les?|la|l')\s*/, "")
    .trim();

// La description d'une note sert aussi de méta-description, d'où un début
// souvent redondant sous le titre (« Analyse lexicale : … », « TD de
// compilation : … ») : on le retire à l'affichage seulement.
function shortDescription(description: string, label: string): string {
  const notes = /^Notes de (?:cours|TD) sur (.+)$/is.exec(description);
  if (notes) return notes[1].charAt(0).toUpperCase() + notes[1].slice(1);
  const match = /^(.{1,90}?) : (.+)$/s.exec(description);
  if (!match) return description;
  const [, prefix, rest] = match;
  const redundant =
    normalize(prefix) === normalize(label) || /^(notes|cours|corrigé|td|exercices|devoir)(?!\p{L})/iu.test(prefix);
  return redundant ? rest.charAt(0).toUpperCase() + rest.slice(1) : description;
}

function Step({ item }: { item: CourseItem }) {
  const description = useDescription(item);
  return (
    <li>
      <Link to={item.href ?? "#"}>{item.label}</Link>
      {description && <span className={styles.stepDescription}>{shortDescription(description, item.label)}</span>}
    </li>
  );
}

// Notes de TD : `sidebar_custom_props.kind` (« td » ou « cours ») si présent,
// sinon le nom de fichier (`td1`, `notes-td2`, `exercices`).
function isTd(item: CourseItem): boolean {
  const kind = (item.customProps as { kind?: string } | undefined)?.kind;
  if (kind) return kind === "td";
  const slug = item.href?.replace(/\/$/, "").split("/").pop() ?? "";
  return /(^|[-_])td|exercice/i.test(slug);
}

// Remplace <DocCardList /> sur les pages d'index de la scolarité : une tuile
// par matière ou par page, icône au trait, description du frontmatter et
// nombre de pages contenues. Avec `ordered` (page d'une matière), les notes
// forment une séquence en rail d'anneaux, cours puis TD, à la manière de
// <ResourceList ordered>.
export default function CourseGrid({ ordered = false }: { ordered?: boolean }): JSX.Element {
  const category = useCurrentSidebarCategory();
  if (ordered) {
    const items = visibleItems(category.items);
    const groups = [
      { type: "cours" as const, title: "Cours", items: items.filter((item) => !isTd(item)) },
      { type: "td" as const, title: "Travaux dirigés", items: items.filter(isTd) },
    ];
    return (
      <>
        {groups
          .filter((group) => group.items.length > 0)
          .map((group) => (
            <ResourceList key={group.type} type={group.type} title={group.title} ordered unit="page">
              <ul>
                {group.items.map((item) => (
                  <Step key={item.href ?? item.label} item={item} />
                ))}
              </ul>
            </ResourceList>
          ))}
      </>
    );
  }
  return (
    <div className={styles.grid}>
      {visibleItems(category.items).map((item) => (
        <Tile key={item.href ?? item.label} item={item} />
      ))}
    </div>
  );
}
