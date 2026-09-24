import React from "react";
import Link from "@docusaurus/Link";
import { Icon } from "@iconify/react";
import { useCurrentSidebarCategory, useDocsVersion } from "@docusaurus/plugin-content-docs/client";
import { subjectIcon } from "../icons";
import { customIcon, indexDocId, visibleItems, type CourseItem } from "../sidebar";
import styles from "./styles.module.scss";

function Chips({ items }: { items: CourseItem[] }) {
  if (!items.length) return null;
  return (
    <ul className={styles.chips}>
      {items.map((item) => (
        <li key={item.href ?? item.label}>
          <Link to={item.href ?? "#"} className={styles.chip}>
            <Icon
              icon={customIcon(item) ?? subjectIcon(item.label, item.href)}
              className={styles.chipIcon}
              aria-hidden="true"
            />
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Une étape de la frise : un semestre (anneau), sa description et ses matières.
function Step({ item }: { item: CourseItem }) {
  const { docs } = useDocsVersion();
  const id = item.type === "link" ? item.docId : indexDocId(item.href);
  const description = id ? docs[id]?.description : undefined;
  const children = item.type === "category" ? visibleItems(item.items) : [];
  return (
    <li className={styles.step}>
      <Link to={item.href ?? "#"} className={styles.stepTitle}>
        {item.label}
      </Link>
      {description && <p className={styles.description}>{description}</p>}
      <Chips items={children} />
    </li>
  );
}

// Frise du parcours : les semestres sont une vraie séquence, d'où le rail et
// les anneaux de la timeline d'accueil. Sur la page Scolarité, un bloc par
// école ; sur une page d'école, directement ses semestres.
export default function CourseTimeline(): JSX.Element {
  const category = useCurrentSidebarCategory();
  const items = visibleItems(category.items);
  // Sur la page Scolarité, chaque catégorie est une école dont les enfants
  // sont les semestres ; sur une page d'école, les enfants sont les semestres.
  const semesterish = (item: CourseItem) => /semestre|\bs\d\b/i.test(`${item.label} ${item.href ?? ""}`);
  const schools = items.filter(
    (item) => item.type === "category" && visibleItems(item.items).some(semesterish),
  );

  if (schools.length === 0) {
    return (
      <ol className={styles.rail}>
        {items.map((item) => (
          <Step key={item.href ?? item.label} item={item} />
        ))}
      </ol>
    );
  }

  const others = items.filter((item) => !schools.includes(item));
  return (
    <div className={styles.timeline}>
      {schools.map((school) => (
        <section key={school.href ?? school.label} className={styles.school}>
          <Link to={school.href ?? "#"} className={styles.schoolTitle}>
            <Icon
              icon={customIcon(school) ?? subjectIcon(school.label, school.href)}
              className={styles.schoolIcon}
              aria-hidden="true"
            />
            {school.label}
          </Link>
          <ol className={styles.rail}>
            {school.type === "category" &&
              visibleItems(school.items).map((item) => (
                <Step key={item.href ?? item.label} item={item} />
              ))}
          </ol>
        </section>
      ))}
      {others.length > 0 && (
        <section className={styles.school}>
          <Chips items={others} />
        </section>
      )}
    </div>
  );
}
