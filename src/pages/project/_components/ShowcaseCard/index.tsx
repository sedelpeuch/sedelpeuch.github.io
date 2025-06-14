import React, { memo } from "react";
import clsx from "clsx";
import Image from "@theme/IdealImage";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";
import Tooltip from "@site/src/components/Tooltip";
import {
  type Project,
  type Tag,
  TagList,
  Tags,
  type TagType,
} from "@site/data/projects";
import { sortBy } from "@site/src/utils/jsUtils";

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
  ({ label, color, description }, ref) => (
    <li ref={ref} className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label.toLowerCase()}</span>
      <span className={styles.colorLabel} style={{ backgroundColor: color }} />
    </li>
  ),
);

function ShowcaseCardTag({ tags }: { tags: TagType[] }) {
  const tagObjects = tags.map((tag) => ({ tag, ...Tags[tag] }));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `showcase_card_tag_${tagObject.tag}`;

        return (
          <Tooltip
            key={index}
            text={tagObject.description}
            anchorEl="#__docusaurus"
            id={id}
          >
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        );
      })}
    </>
  );
}

const ShowcaseCard = memo(({ project }: { project: Project }) => {
  return (
    <div key={project.title} className={clsx("card", styles.showcaseCard)}>
      {project.preview && (
        <div className={clsx("card__image", styles.showcaseCardImage)}>
          <Image
            src={project.preview}
            alt={project.title}
            img={project.preview}
          />
        </div>
      )}
      <div className="card__body">
        <div className={clsx(styles.showcaseCardHeader)}>
          <h4 className={styles.showcaseCardTitle}>
            <Link href={project.website} className={styles.showcaseCardLink}>
              {project.title}
            </Link>
          </h4>
          {project.source && (
            <Link
              href={project.source}
              className={clsx(
                "button button--secondary button--sm",
                styles.showcaseCardSrcBtn,
              )}
            >
              <Translate id="showcase.card.sourceLink">Code</Translate>
            </Link>
          )}
        </div>
        <p className={styles.showcaseCardBody}>{project.description}</p>
      </div>
      <ul className={clsx("card__footer", styles.cardFooter)}>
        {project.year && (
          <li className={styles.yearTag} title="Année">
            <span className={styles.yearText}>{project.year}</span>
          </li>
        )}
        <ShowcaseCardTag tags={project.tags} />
      </ul>
    </div>
  );
});

export default ShowcaseCard;
