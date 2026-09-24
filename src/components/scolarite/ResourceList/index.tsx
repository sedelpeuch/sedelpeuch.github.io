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

// Compte les éléments de la première liste des enfants MDX : la balise <ul> est
// rendue par un composant du thème (MDXUl), d'où un comptage structurel des
// éléments enfants plutôt qu'un test sur le type « li ».
function countItems(node: React.ReactNode): number {
  for (const child of React.Children.toArray(node)) {
    if (!React.isValidElement(child)) continue;
    const kids = React.Children.toArray((child.props as { children?: React.ReactNode }).children).filter(
      React.isValidElement,
    );
    if (kids.length > 0) return kids.length;
  }
  return 0;
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
