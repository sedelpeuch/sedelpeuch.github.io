import React from "react";
import { Icon } from "@iconify/react";
import { RESOURCE_TYPES, type ResourceType } from "../icons";
import styles from "./styles.module.scss";

interface Props {
  /** Type de ressource : fixe l'icône et le titre par défaut. */
  type?: ResourceType;
  /** Titre du groupe ; par défaut, celui du type. */
  title?: string;
  /** Présentation en séquence (rail et anneaux) plutôt qu'en grille. */
  ordered?: boolean;
  /** Liste markdown de liens, laissée telle quelle dans la page. */
  children?: React.ReactNode;
}

// Compte les éléments de la première liste rencontrée dans les enfants MDX.
function countItems(node: React.ReactNode): number {
  let count = 0;
  React.Children.forEach(node, (child) => {
    if (count || !React.isValidElement(child)) return;
    const props = child.props as { children?: React.ReactNode };
    const kids = React.Children.toArray(props.children).filter(React.isValidElement);
    const isList = kids.length > 0 && kids.every((k) => {
      const t = (k as React.ReactElement).type;
      return t === "li" || (typeof t !== "string" && (t as { name?: string }).name === "li");
    });
    count = isList ? kids.length : countItems(props.children);
  });
  return count;
}

// Groupe de ressources d'une matière (cours, TD, corrections…) : les liens
// restent une liste markdown ordinaire, le composant ne fait que l'habiller.
export default function ResourceList({
  type = "support",
  title,
  ordered = type === "cours",
  children,
}: Props): JSX.Element {
  const meta = RESOURCE_TYPES[type] ?? RESOURCE_TYPES.support;
  const count = countItems(children);
  return (
    <section className={styles.group} data-layout={ordered ? "rail" : "grid"}>
      <p className={styles.head}>
        <Icon icon={meta.icon} className={styles.icon} aria-hidden="true" />
        <span className={styles.title}>{title ?? meta.label}</span>
        {count > 0 && (
          <span className={styles.count}>
            {count} document{count > 1 ? "s" : ""}
          </span>
        )}
      </p>
      <div className={styles.list}>{children}</div>
    </section>
  );
}
