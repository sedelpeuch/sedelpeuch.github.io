import React from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import { Icon } from "@iconify/react";
import { BLOG_CATEGORIES, categoryIdOf } from "../blogCategories";
import styles from "./styles.module.scss";

interface Post {
  title: string;
  permalink: string;
  source: string;
}

// Navigation dans la catégorie du billet, pour les billets hors série :
// précédent / suivant dans le même dossier, sans compteur ni piste d'anneaux
// (une catégorie n'est pas un parcours de lecture).
export default function CategoryNav({ source }: { source: string }): JSX.Element | null {
  const { categories } = usePluginData("series-data") as { categories: Record<string, Post[]> };
  const id = categoryIdOf(source);
  const posts = id ? categories[id] : undefined;
  const category = id ? BLOG_CATEGORIES[id] : undefined;
  if (!posts || !category) return null;

  const index = posts.findIndex((p) => p.source === source);
  if (index === -1 || posts.length < 2) return null;
  const older = posts[index - 1];
  const newer = posts[index + 1];

  return (
    <nav className={styles.nav} aria-label={`Autres articles : ${category.label}`}>
      <p className={styles.head}>
        <Icon icon={category.icon} className={styles.icon} aria-hidden="true" />
        Dans la catégorie {category.label}
      </p>
      <div className={styles.links}>
        <span>
          {older && (
            <Link to={older.permalink}>
              <span aria-hidden="true">← </span>
              {older.title}
            </Link>
          )}
        </span>
        <span className={styles.next}>
          {newer && (
            <Link to={newer.permalink}>
              {newer.title}
              <span aria-hidden="true"> →</span>
            </Link>
          )}
        </span>
      </div>
    </nav>
  );
}
