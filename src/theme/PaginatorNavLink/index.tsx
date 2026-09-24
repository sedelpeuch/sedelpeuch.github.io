import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import type { Props } from "@theme/PaginatorNavLink";

// Précédent / suivant reliés par le rail : un anneau à chaque extrémité,
// le trait est dessiné par .pagination-nav (custom.scss).
export default function PaginatorNavLink(props: Props): JSX.Element {
  const { permalink, title, subLabel, isNext } = props;
  return (
    <Link
      className={clsx(
        "pagination-nav__link",
        isNext ? "pagination-nav__link--next" : "pagination-nav__link--prev",
      )}
      to={permalink}
    >
      <span className="pagination-nav__ring" aria-hidden="true" />
      <span className="pagination-nav__text">
        {subLabel && <span className="pagination-nav__sublabel">{subLabel}</span>}
        <span className="pagination-nav__label">{title}</span>
      </span>
    </Link>
  );
}
