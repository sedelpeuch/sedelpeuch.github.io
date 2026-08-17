# Refonte docs/scolarité — Phase 1 (CPBx) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the visual presentation of `docs/scolarite/` (school notes archive) — new shared components (subject cards, grouped resource lists, hierarchy header) applied to the root index, the CPBx branch (5 files: root index, cpbx index, s1–s4). ENSEIRB (166 files) is a separate follow-up plan — out of scope here.

**Architecture:** Three new presentational React components under `src/components/` (`SubjectCard`, `SubjectCardList`, `ResourceList`, `DossierHeader`, `MatiereSection`), plus two new CSS tokens in `src/css/custom.scss`. `SubjectCardList` replaces `<DocCardList />` on category-index pages using Docusaurus's public `useCurrentSidebarCategory()` hook — no theme swizzle, so the change is scoped to pages that import it (only under `docs/scolarite/`), never touching `docs/projects/`, `docs/enseignement/`, or `blog/`. Content pages (`cpbx/s1..s4/index.md`) keep every existing link and PDF path; only the MDX wrapping changes (flat `[label](href)` chains become `ResourceList` groups).

**Tech Stack:** Docusaurus 3 (React 18, MDX), SCSS modules, no test runner in this repo — verification is `yarn build` (catches MDX/JSX/type errors) plus manual visual check via `yarn start`.

**Spec:** `docs/superpowers/specs/2026-08-17-refonte-scolarite-design.md`

## Global Constraints

- No new fonts, no new global palette — reuse `--ifm-color-primary` and friends from `src/css/custom.scss`. Only 2 new tokens: `--school-cpbx`, `--school-enseirb`.
- Every existing link/href in `docs/scolarite/cpbx/**` must survive the conversion unchanged (same relative path, same label text where it appears as link text). No PDF moved or renamed.
- No theme swizzling — `SubjectCardList` must use `useCurrentSidebarCategory` from `@docusaurus/theme-common`, not a swizzled `DocCard`/`DocCardList`.
- `docs/scolarite/enseirb/**` (166 files) is untouched in this plan — do not edit anything under it.
- Respect `prefers-reduced-motion` on hover transitions; focus-visible outline on all interactive cards/links.

---

## Design adaptation note (read before Task 8)

The spec's `DossierHeader` assumed one matière per page (true for ENSEIRB's nested folders). CPBx pages are one **semester** per page containing several matières as `##` sections (confirmed by reading `cpbx/s1..s4/index.md`). Adapted layout for CPBx:

- `DossierHeader` is used **once** per page, crumbs `["CPBx", "Semestre N"]` (no matière — the page covers several).
- Each `##` matière section becomes a `MatiereSection` (icon + title + optional responsable + intro prose), containing one or more `ResourceList` blocks per its `###` subsection (or directly if the matière has no subsections).
- No resource-count pill at the top of `DossierHeader` (would duplicate data already counted per `ResourceList` group — avoids drift). `DossierHeader` only renders the breadcrumb.

---

## Task 1: CSS tokens for school accents

**Files:**
- Modify: `src/css/custom.scss`

**Interfaces:**
- Produces: `--school-cpbx`, `--school-enseirb` CSS custom properties, readable from any component/module.

- [ ] **Step 1: Add tokens to `:root` and the dark-mode block**

In `src/css/custom.scss`, inside the existing `:root { ... }` block (after line 8, right after `--ifm-color-primary-lightest: #d5f1fd;`), add:

```scss
  --school-cpbx: #f5a623;
  --school-cpbx-bg: #fdeeca;
  --school-enseirb: var(--ifm-color-primary);
  --school-enseirb-bg: var(--ifm-color-primary-lightest);
```

Inside the existing `html[data-theme='dark'] { ... }` block (after line 56, right after `--ifm-color-primary: hsl(214deg 100% 60%);`), add:

```scss
  --school-cpbx: #f5a623;
  --school-cpbx-bg: #3a2c10;
  --school-enseirb: hsl(214deg 100% 60%);
  --school-enseirb-bg: #0e2a40;
```

- [ ] **Step 2: Verify build**

Run: `yarn build 2>&1 | tail -30`
Expected: build completes with no SCSS errors (pre-existing warnings unrelated to this change are fine).

- [ ] **Step 3: Commit**

```bash
git add src/css/custom.scss
git commit -m "style: add school accent tokens for scolarite redesign"
```

---

## Task 2: `SubjectCard` component

**Files:**
- Create: `src/components/SubjectCard/index.tsx`
- Create: `src/components/SubjectCard/styles.module.scss`

**Interfaces:**
- Consumes: CSS tokens from Task 1 (`--school-cpbx`, `--school-enseirb`).
- Produces: `SubjectCard` React component, props `{ href: string; label: string; icon?: string; school?: 'cpbx' | 'enseirb' }`, default export from `src/components/SubjectCard`.

- [ ] **Step 1: Write the component**

`src/components/SubjectCard/index.tsx`:

```tsx
import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

export interface SubjectCardProps {
  href: string;
  label: string;
  icon?: string;
  school?: "cpbx" | "enseirb";
}

export default function SubjectCard({
  href,
  label,
  icon = "📄",
  school,
}: SubjectCardProps) {
  const schoolClass = school ? styles[school] : "";
  return (
    <Link href={href} className={`${styles.card} ${schoolClass}`}>
      <span className={styles.emoji} aria-hidden="true">
        {icon}
      </span>
      <h4 className={styles.title}>{label}</h4>
    </Link>
  );
}
```

- [ ] **Step 2: Write the styles**

`src/components/SubjectCard/styles.module.scss`:

```scss
.card {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 1.1rem;
  border: 1px solid var(--ifm-toc-border-color);
  border-left: 4px solid var(--ifm-color-primary);
  border-radius: 10px;
  background: var(--content-background-color);
  text-decoration: none;
  color: var(--ifm-text-color);
  transition: transform 0.15s ease;

  &:hover,
  &:focus {
    transform: translateY(-2px);
    text-decoration: none;
    color: var(--ifm-text-color);
  }

  &:focus-visible {
    outline: 2px solid var(--ifm-color-primary);
    outline-offset: 2px;
  }
}

.cpbx {
  border-left-color: var(--school-cpbx);
}

.enseirb {
  border-left-color: var(--school-enseirb);
}

.emoji {
  font-size: 1.4rem;
  flex: none;
}

.title {
  margin: 0;
  font-size: 1.02rem;
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

- [ ] **Step 3: Verify build**

Run: `yarn build 2>&1 | tail -30`
Expected: build succeeds (component not yet used anywhere, so this only checks it compiles — TypeScript/MDX loader will still parse the file).

- [ ] **Step 4: Commit**

```bash
git add src/components/SubjectCard
git commit -m "feat: add SubjectCard component"
```

---

## Task 3: `SubjectCardList` component

**Files:**
- Create: `src/components/SubjectCardList/index.tsx`
- Create: `src/components/SubjectCardList/styles.module.scss`

**Interfaces:**
- Consumes: `SubjectCard` from Task 2 (`{ href, label, icon?, school? }`); `useCurrentSidebarCategory` from `@docusaurus/theme-common`.
- Produces: `SubjectCardList` component (no required props), default export from `src/components/SubjectCardList`. Reads `customProps.icon` and `customProps.school` off each sidebar item (populated by `_category_.json`'s `customProps` for subfolders, or a doc's `sidebar_custom_props` frontmatter for flat pages).

- [ ] **Step 1: Write the component**

`src/components/SubjectCardList/index.tsx`:

```tsx
import React from "react";
import { useCurrentSidebarCategory } from "@docusaurus/theme-common";
import SubjectCard from "@site/src/components/SubjectCard";
import styles from "./styles.module.scss";

export default function SubjectCardList() {
  const category = useCurrentSidebarCategory();
  const items = category.items.filter((item) => item.type !== "html");

  return (
    <div className={styles.grid}>
      {items.map((item) => {
        const href =
          item.type === "category"
            ? (item.href ?? "#")
            : (item as { href: string }).href;
        const customProps = (item.customProps ?? {}) as {
          icon?: string;
          school?: "cpbx" | "enseirb";
        };
        return (
          <SubjectCard
            key={item.label}
            href={href}
            label={item.label}
            icon={customProps.icon}
            school={customProps.school}
          />
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Write the styles**

`src/components/SubjectCardList/styles.module.scss`:

```scss
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}
```

- [ ] **Step 3: Verify build**

Run: `yarn build 2>&1 | tail -30`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/SubjectCardList
git commit -m "feat: add SubjectCardList component replacing DocCardList on scolarite pages"
```

---

## Task 4: `ResourceList` component

**Files:**
- Create: `src/components/ResourceList/index.tsx`
- Create: `src/components/ResourceList/styles.module.scss`

**Interfaces:**
- Produces: `ResourceList` component, props:
  ```ts
  interface ResourceItem { label: string; href: string; }
  interface ResourceGroup {
    type: "cours" | "td" | "correction" | "projet" | "support";
    title: string;
    items: ResourceItem[];
  }
  interface ResourceListProps { groups: ResourceGroup[]; }
  ```
  Renders one heading + item grid per group, icon derived from `type`, count derived from `items.length` (never passed manually — single source of truth).

- [ ] **Step 1: Write the component**

`src/components/ResourceList/index.tsx`:

```tsx
import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

export interface ResourceItem {
  label: string;
  href: string;
}

export type ResourceType = "cours" | "td" | "correction" | "projet" | "support";

export interface ResourceGroup {
  type: ResourceType;
  title: string;
  items: ResourceItem[];
}

const ICONS: Record<ResourceType, string> = {
  cours: "📘",
  td: "✏️",
  correction: "✅",
  projet: "🗂️",
  support: "📄",
};

export interface ResourceListProps {
  groups: ResourceGroup[];
}

export default function ResourceList({ groups }: ResourceListProps) {
  return (
    <>
      {groups.map((group) => (
        <div className={styles.group} key={group.title}>
          <h3 className={styles.groupTitle}>
            <span className={`${styles.icon} ${styles[group.type]}`} aria-hidden="true">
              {ICONS[group.type]}
            </span>
            {group.title}
            <span className={styles.count}>
              {group.items.length} document{group.items.length > 1 ? "s" : ""}
            </span>
          </h3>
          <div className={styles.list}>
            {group.items.map((item) => (
              <Link className={styles.item} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
```

- [ ] **Step 2: Write the styles**

`src/components/ResourceList/styles.module.scss`:

```scss
.group {
  margin-top: 1.25rem;
}

.groupTitle {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.95rem;
  margin-bottom: 0.6rem;
}

.icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  flex: none;
}

.cours {
  background: var(--ifm-color-primary-lightest);
  color: var(--ifm-color-primary-darkest);
}

.td {
  background: #e7f7ec;
  color: #1f8a4c;
}

.correction {
  background: #fdeeee;
  color: #c94b4b;
}

.projet {
  background: var(--school-cpbx-bg);
  color: var(--school-cpbx);
}

.support {
  background: var(--ifm-toc-border-color);
  color: var(--ifm-secondary-text-color);
}

html[data-theme="dark"] .td {
  background: #123321;
  color: #5fd88a;
}

html[data-theme="dark"] .correction {
  background: #3a1717;
  color: #f19b9b;
}

.count {
  margin-left: auto;
  font-weight: 500;
  font-size: 0.78rem;
  color: var(--ifm-secondary-text-color);
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 0.5rem;
}

.item {
  display: block;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--ifm-toc-border-color);
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--ifm-text-color);
  text-decoration: none;
  transition: border-color 0.15s ease;

  &:hover,
  &:focus {
    border-color: var(--ifm-color-primary);
    text-decoration: none;
    color: var(--ifm-text-color);
  }

  &:focus-visible {
    outline: 2px solid var(--ifm-color-primary);
    outline-offset: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .item {
    transition: none;
  }
}
```

- [ ] **Step 3: Verify build**

Run: `yarn build 2>&1 | tail -30`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/ResourceList
git commit -m "feat: add ResourceList component"
```

---

## Task 5: `DossierHeader` component

**Files:**
- Create: `src/components/DossierHeader/index.tsx`
- Create: `src/components/DossierHeader/styles.module.scss`

**Interfaces:**
- Produces: `DossierHeader` component, props `{ school: 'cpbx' | 'enseirb'; crumbs: string[] }`.

- [ ] **Step 1: Write the component**

`src/components/DossierHeader/index.tsx`:

```tsx
import React from "react";
import styles from "./styles.module.scss";

export interface DossierHeaderProps {
  school: "cpbx" | "enseirb";
  crumbs: string[];
}

export default function DossierHeader({ school, crumbs }: DossierHeaderProps) {
  return (
    <div className={`${styles.tab} ${styles[school]}`}>
      {crumbs.map((crumb, index) => (
        <span
          className={index < crumbs.length - 1 ? styles.crumb : styles.current}
          key={crumb}
        >
          {crumb}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Write the styles**

`src/components/DossierHeader/styles.module.scss`:

```scss
.tab {
  border-radius: 8px 8px 0 0;
  padding: 0.5rem 1.2rem;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.4rem;
}

.cpbx {
  background: var(--school-cpbx);
  color: #2a1c00;
}

.enseirb {
  background: var(--school-enseirb);
  color: #ffffff;
}

.crumb {
  opacity: 0.75;

  &::after {
    content: "›";
    margin: 0 0.45rem;
    opacity: 0.6;
  }
}

.current {
  opacity: 1;
}
```

- [ ] **Step 3: Verify build**

Run: `yarn build 2>&1 | tail -30`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/DossierHeader
git commit -m "feat: add DossierHeader component"
```

---

## Task 6: `MatiereSection` component

**Files:**
- Create: `src/components/MatiereSection/index.tsx`
- Create: `src/components/MatiereSection/styles.module.scss`

**Interfaces:**
- Consumes: nothing (pure layout wrapper — `ResourceList` blocks and prose are passed as `children`).
- Produces: `MatiereSection` component, props `{ icon: string; title: string; responsable?: { name: string; href?: string }; children?: React.ReactNode }`.

- [ ] **Step 1: Write the component**

`src/components/MatiereSection/index.tsx`:

```tsx
import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

export interface MatiereSectionProps {
  icon: string;
  title: string;
  responsable?: { name: string; href?: string };
  children?: React.ReactNode;
}

export default function MatiereSection({
  icon,
  title,
  responsable,
  children,
}: MatiereSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <span className={styles.emoji} aria-hidden="true">
          {icon}
        </span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {responsable && (
        <p className={styles.responsable}>
          Responsable :{" "}
          {responsable.href ? (
            <Link href={responsable.href}>{responsable.name}</Link>
          ) : (
            responsable.name
          )}
        </p>
      )}
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Write the styles**

`src/components/MatiereSection/styles.module.scss`:

```scss
.section {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--ifm-toc-border-color);

  &:first-of-type {
    margin-top: 1.5rem;
    padding-top: 0;
    border-top: none;
  }
}

.head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.emoji {
  font-size: 1.6rem;
}

.title {
  margin: 0;
}

.responsable {
  color: var(--ifm-secondary-text-color);
  font-size: 0.9rem;
  margin-top: 0.2rem;
}
```

- [ ] **Step 3: Verify build**

Run: `yarn build 2>&1 | tail -30`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/MatiereSection
git commit -m "feat: add MatiereSection component"
```

---

## Task 7: Category metadata + wire root/CPBx index pages

**Files:**
- Create: `docs/scolarite/cpbx/_category_.json`
- Create: `docs/scolarite/enseirb/_category_.json`
- Create: `docs/scolarite/cpbx/s1/_category_.json`
- Create: `docs/scolarite/cpbx/s2/_category_.json`
- Create: `docs/scolarite/cpbx/s3/_category_.json`
- Create: `docs/scolarite/cpbx/s4/_category_.json`
- Modify: `docs/scolarite/index.md`
- Modify: `docs/scolarite/cpbx/index.md`

**Interfaces:**
- Consumes: `SubjectCardList` from Task 3, which reads `customProps.icon` / `customProps.school` from these `_category_.json` files.

- [ ] **Step 1: Create `_category_.json` for the two schools**

`docs/scolarite/cpbx/_category_.json`:

```json
{
  "label": "CPBx",
  "customProps": {
    "icon": "🎓",
    "school": "cpbx"
  }
}
```

`docs/scolarite/enseirb/_category_.json`:

```json
{
  "label": "ENSEIRB",
  "customProps": {
    "icon": "🎓",
    "school": "enseirb"
  }
}
```

- [ ] **Step 2: Create `_category_.json` for each CPBx semester**

`docs/scolarite/cpbx/s1/_category_.json`:

```json
{
  "label": "Semestre 1",
  "customProps": {
    "icon": "1️⃣",
    "school": "cpbx"
  }
}
```

`docs/scolarite/cpbx/s2/_category_.json`:

```json
{
  "label": "Semestre 2",
  "customProps": {
    "icon": "2️⃣",
    "school": "cpbx"
  }
}
```

`docs/scolarite/cpbx/s3/_category_.json`:

```json
{
  "label": "Semestre 3",
  "customProps": {
    "icon": "3️⃣",
    "school": "cpbx"
  }
}
```

`docs/scolarite/cpbx/s4/_category_.json`:

```json
{
  "label": "Semestre 4",
  "customProps": {
    "icon": "4️⃣",
    "school": "cpbx"
  }
}
```

- [ ] **Step 3: Wire `docs/scolarite/index.md` to `SubjectCardList`**

Replace the full content of `docs/scolarite/index.md` with:

```mdx
---
title: Scolarité
---

Cette section regroupe les cours, projets et travaux réalisés durant le parcours académique (CPBX, ENSEIRB). Les ressources, notes et documents sont classés par établissement et semestre.

**Parcours académique :**

- 🎓 **CPBX** (2017–2019)
- 🎓 **ENSEIRB** (2019–2022)

import SubjectCardList from "@site/src/components/SubjectCardList";

<SubjectCardList />
```

- [ ] **Step 4: Wire `docs/scolarite/cpbx/index.md` to `SubjectCardList`**

Replace the full content of `docs/scolarite/cpbx/index.md` with:

```mdx
---
title: CPBx
---

import SubjectCardList from "@site/src/components/SubjectCardList";

<SubjectCardList />
```

- [ ] **Step 5: Verify build and check links**

Run: `yarn build 2>&1 | tail -40`
Expected: build succeeds, no broken-link warnings for `docs/scolarite/index.md` or `docs/scolarite/cpbx/index.md`.

- [ ] **Step 6: Commit**

```bash
git add docs/scolarite/cpbx/_category_.json docs/scolarite/enseirb/_category_.json \
        docs/scolarite/cpbx/s1/_category_.json docs/scolarite/cpbx/s2/_category_.json \
        docs/scolarite/cpbx/s3/_category_.json docs/scolarite/cpbx/s4/_category_.json \
        docs/scolarite/index.md docs/scolarite/cpbx/index.md
git commit -m "feat: wire scolarite root and cpbx index pages to SubjectCardList"
```

---

## Task 8: Convert `docs/scolarite/cpbx/s1/index.md`

**Files:**
- Modify: `docs/scolarite/cpbx/s1/index.md`

**Interfaces:**
- Consumes: `DossierHeader` (Task 5), `MatiereSection` (Task 6), `ResourceList` + `ResourceGroup` (Task 4).

- [ ] **Step 1: Replace file content**

Replace the full content of `docs/scolarite/cpbx/s1/index.md` with (every href below is copied verbatim from the current file — only the wrapping changes):

```mdx
---
title: Cycle Préparatoire De Bordeaux - Semestre 1
---

import DossierHeader from "@site/src/components/DossierHeader";
import MatiereSection from "@site/src/components/MatiereSection";
import ResourceList from "@site/src/components/ResourceList";

<DossierHeader school="cpbx" crumbs={["CPBx", "Semestre 1"]} />

<MatiereSection icon="🧪" title="Chimie" responsable={{ name: "Frédéric Castet", href: "http://theo.ism.u-bordeaux.fr/~castet/teaching.html" }}>

Une version des TD à utiliser avec précaution.

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "1- L'avènement de la physique quantique", href: "./img/chimie/cours/1.pdf" },
      { label: "2- L'organisation des électrons dans l'atome", href: "./img/chimie/cours/2.pdf" },
      { label: "3- La classification périodique", href: "./img/chimie/cours/3.pdf" },
      { label: "4- Le modèle de lewis", href: "./img/chimie/cours/4.pdf" },
      { label: "5- Le modèle VSEPR", href: "./img/chimie/cours/5.pdf" },
      { label: "6- Orbitales hybriques", href: "./img/chimie/cours/6.pdf" },
      { label: "7- Intéractions intermoléculaires", href: "./img/chimie/cours/7.pdf" },
      { label: "8- Les différents états de la matière", href: "./img/chimie/cours/8.pdf" },
      { label: "9- Les cristaux", href: "./img/chimie/cours/9.pdf" },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [
      { label: "TD 1", href: "./img/chimie/1.pdf" },
      { label: "TD 2", href: "./img/chimie/2.pdf" },
      { label: "TD 3", href: "./img/chimie/3.pdf" },
      { label: "TD 4", href: "./img/chimie/4.pdf" },
      { label: "TD 5", href: "./img/chimie/5.pdf" },
      { label: "TD 6", href: "./img/chimie/6.pdf" },
      { label: "TD 7", href: "./img/chimie/7.pdf" },
      { label: "TD 8", href: "./img/chimie/8.pdf" },
      { label: "TD 9", href: "./img/chimie/9.pdf" },
    ],
  },
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "TD — corrigé", href: "./img/chimie/TD.pdf" }],
  },
]} />

</MatiereSection>

<MatiereSection icon="💻" title="Informatique" responsable={{ name: "Carole Blanc", href: "https://dept-info.labri.fr/~blanc/" }}>

<ResourceList groups={[
  {
    type: "td",
    title: "Travaux dirigés",
    items: [
      { label: "TD1", href: "./img/informatique/td1.pdf" },
      { label: "TD2", href: "./img/informatique/td2.pdf" },
      { label: "TD3", href: "./img/informatique/td3.pdf" },
      { label: "TD4", href: "./img/informatique/td4.pdf" },
      { label: "TD5", href: "./img/informatique/td5.pdf" },
      { label: "TD6", href: "./img/informatique/td6.pdf" },
      { label: "TD7", href: "./img/informatique/td7.pdf" },
      { label: "TD8", href: "./img/informatique/td8.pdf" },
    ],
  },
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "Proposition de correction", href: "./img/informatique/correction.pdf" }],
  },
]} />

Il faut manier les corrections de l'informatique avec précaution. Les codes demandés sont
relativement simple en 1A, l'idée est de vous faire réflechir et de vous
sensibilier au paradigme de l'informatique. Ne foncez pas dessus !

</MatiereSection>

<MatiereSection icon="📐" title="Mathématiques">

### Mathématiques fondamentales

Responsable : [Ghislaine Godinaud](https://www.math.u-bordeaux.fr/imb/fiche-personnelle?uid=ggodinau)

Cette section est un peu vide et à besoin de `contribution`.

<ResourceList groups={[
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "TD — correction partielle", href: "./img/mathematiques/TD.pdf" }],
  },
]} />

### Spé maths

Responsable : [Eric Charpentier](https://www.math.u-bordeaux.fr/imb/fiche-personnelle?uid=echarpen)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Equations différentielles", href: "./img/mathematiques/1.pdf" },
      { label: "Compléments sur les suites numériques", href: "./img/mathematiques/2.pdf" },
      { label: "Fonctions numériques de variable réelle", href: "./img/mathematiques/3.pdf" },
      { label: "Divisibilité dans Z", href: "./img/mathematiques/4.pdf" },
      { label: "Cours", href: "./img/mathematiques/cours.pdf" },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "TD", href: "./img/mathematiques/spe_td.pdf" }],
  },
]} />

</MatiereSection>

<MatiereSection icon="🌀" title="Physique">

### Electrocinétique

Responsable : Mourad Aiche

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Introduction", href: "./img/physique/electro/Introduction.pdf" },
      { label: "Analyse de circuit", href: "./img/physique/electro/analyse.pdf" },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [
      { label: "TD1 — sujet", href: "./img/physique/electro/TD1.pdf" },
      { label: "TD2 — sujet", href: "./img/physique/electro/TD2.pdf" },
    ],
  },
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "TD — correction", href: "./img/physique/electro/TD.pdf" }],
  },
]} />

### Mécanique du point

Responsable : Jean Christophe Caillon

Cette section est un peu vide et à besoin de `contribution`.

<ResourceList groups={[
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "TD — correction", href: "./img/physique/meca/TD.pdf" }],
  },
]} />

### Outils mathématiques

Responsable : Daniel Blaudez

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "1- Calcul Vectoriel", href: "./img/physique/outils/1.pdf" },
      { label: "2- Calcul Différentiel.1", href: "./img/physique/outils/2.pdf" },
      { label: "2- Calcul Différentiel.2", href: "./img/physique/outils/3.pdf" },
      { label: "3- Système de coordonnées", href: "./img/physique/outils/4.pdf" },
      { label: "4- Intégrales simples", href: "./img/physique/outils/5.pdf" },
      { label: "5- Intégrales doubles", href: "./img/physique/outils/6.pdf" },
      { label: "6- Intégrales triple", href: "./img/physique/outils/7.pdf" },
      { label: "7- Intégrales curvilignes", href: "./img/physique/outils/8.pdf" },
      { label: "8- Champs vectoriel et scalaire.1", href: "./img/physique/outils/9.pdf" },
      { label: "8- Champs vectoriel et scalaire.2", href: "./img/physique/outils/10.pdf" },
    ],
  },
]} />

</MatiereSection>
```

- [ ] **Step 2: Diff-check every href against the original file**

Run: `git show HEAD:docs/scolarite/cpbx/s1/index.md | grep -oE '\]\([^)]+\)' | sort > /tmp/s1-before.txt && grep -oE 'href: "[^"]+"' docs/scolarite/cpbx/s1/index.md | sed -E 's/href: "(.*)"/(\1)/' | sort > /tmp/s1-after.txt && diff /tmp/s1-before.txt /tmp/s1-after.txt`
Expected: no output (identical href sets). If there's a diff, fix the mismatched entry before continuing.

- [ ] **Step 3: Verify build**

Run: `yarn build 2>&1 | tail -40`
Expected: build succeeds, no broken-link warnings for this file.

- [ ] **Step 4: Commit**

```bash
git add docs/scolarite/cpbx/s1/index.md
git commit -m "refactor: redesign CPBx semestre 1 page with new resource components"
```

---

## Task 9: Convert `docs/scolarite/cpbx/s2/index.md`

**Files:**
- Modify: `docs/scolarite/cpbx/s2/index.md`

**Interfaces:**
- Consumes: same components as Task 8.

- [ ] **Step 1: Replace file content**

Replace the full content of `docs/scolarite/cpbx/s2/index.md` with:

```mdx
---
title: Cycle Préparatoire De Bordeaux - Semestre 2
---

import DossierHeader from "@site/src/components/DossierHeader";
import MatiereSection from "@site/src/components/MatiereSection";
import ResourceList from "@site/src/components/ResourceList";

<DossierHeader school="cpbx" crumbs={["CPBx", "Semestre 2"]} />

<MatiereSection icon="🧪" title="Chimie">

### Chimie Inorganique

Responsable : [Dany Carlier-Larregaray](https://www.icmcb-bordeaux.cnrs.fr/carlier-larregaray-dany/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Notions fondamentales 1", href: "chimie/inorga/diapo/1.pdf" },
      { label: "Notions fondamentales 2", href: "chimie/inorga/diapo/2.pdf" },
      { label: "Empilements compacts", href: "chimie/inorga/diapo/3.pdf" },
      { label: "Sites interstitiels", href: "chimie/inorga/diapo/4.pdf" },
      { label: "Limite de la stabilité", href: "chimie/inorga/diapo/5.pdf" },
      { label: "Notes de cours", href: "chimie/inorga/cours.pdf" },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "TD", href: "chimie/inorga/td.pdf" }],
  },
]} />

### Chimie Organique

Responsable : [Denis Deffieux](http://www.sasn.u-bordeaux1.fr/annuaire/deffieux.html)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Partie A", href: "chimie/orga/1.pdf" },
      { label: "Partie B", href: "chimie/orga/2.pdf" },
      { label: "Partie C", href: "chimie/orga/3.pdf" },
      { label: "Aide de cours", href: "chimie/orga/aide.pdf" },
      { label: "Notes de cours", href: "chimie/orga/cours.pdf" },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [
      { label: "TD — énoncé", href: "chimie/orga/td-enonce.pdf" },
      { label: "TD — prise de note", href: "chimie/orga/td.pdf" },
    ],
  },
]} />

</MatiereSection>

<MatiereSection icon="📐" title="Mathématiques">

### Analyse

Responsable : [Mouez Dimassi](https://www.math.u-bordeaux.fr/~mdimassi/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: "maths/ncours.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "maths/ntd.pdf" }],
  },
]} />

### Algèbre

Responsable : [Eric Charpentier](https://www.math.u-bordeaux.fr/~echarpen/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: "maths/gcours.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "maths/gtd.pdf" }],
  },
]} />

</MatiereSection>

<MatiereSection icon="🌀" title="Physique">

### Electrocinétique

Responsable : Mourad Aiche

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Régime Transitoire", href: "physique/elec/1.pdf" },
      { label: "AOP", href: "physique/elec/2.pdf" },
      { label: "Circuits électriques en régime transitoires", href: "physique/elec/3.pdf" },
      { label: "Cours", href: "physique/elec/cours.pdf" },
      { label: "Fiche", href: "physique/elec/fiche.pdf" },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "TD — sujet", href: "physique/elec/td-sujet.pdf" }],
  },
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "TD — correction", href: "physique/elec/td.pdf" }],
  },
]} />

### Thermodynamique

Responsable : Daniel Blaudez

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Fiche", href: "physique/Fiche-Thermodynamique.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "physique/TD-Thermodynamique.pdf" }],
  },
]} />

### Optique

Responsable : [Christine Grauby-Heywang](https://www.loma.cnrs.fr/christine-grauby-heywang/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Fiche", href: "physique/Fiche-Optique.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "physique/TD-Optique.pdf" }],
  },
]} />

### Electromagnétisme

Responsable : [Jérome Cayssol](https://www.loma.cnrs.fr/jerome-cayssol/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: "physique/Cours-Electromagnétisme.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "physique/TD-Electromagnétisme.pdf" }],
  },
]} />

### Travaux Pratiques

Pour l'instant les travaux pratiques du semestre 2 n'ont pas changés depuis 10
ans. Faites attention à la partie mécanique, la théorie est juste mais la
pratique possède plusieurs défaut. En plus une proposition du compte rendu à
faire sur le deuxième TP d'optique.

<ResourceList groups={[
  {
    type: "support",
    title: "Supports",
    items: [
      { label: "Proposition de solution", href: "physique/TP.pdf" },
      { label: "Compte rendu — TP optique", href: "physique/optique.pdf" },
    ],
  },
]} />

</MatiereSection>
```

- [ ] **Step 2: Diff-check every href against the original file**

Run: `git show HEAD:docs/scolarite/cpbx/s2/index.md | grep -oE '\]\([^)]+\)' | sort > /tmp/s2-before.txt && grep -oE 'href: "[^"]+"' docs/scolarite/cpbx/s2/index.md | sed -E 's/href: "(.*)"/(\1)/' | sort > /tmp/s2-after.txt && diff /tmp/s2-before.txt /tmp/s2-after.txt`
Expected: no output.

- [ ] **Step 3: Verify build**

Run: `yarn build 2>&1 | tail -40`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add docs/scolarite/cpbx/s2/index.md
git commit -m "refactor: redesign CPBx semestre 2 page with new resource components"
```

---

## Task 10: Convert `docs/scolarite/cpbx/s3/index.md`

**Files:**
- Modify: `docs/scolarite/cpbx/s3/index.md`

**Interfaces:**
- Consumes: same components as Task 8. Note: this page has PDFs both at `s3/` root (`Chimie-cours.pdf`, `Chimie-TD.pdf`) and under `s3/informatique/`, `s3/maths/`, `s3/physique/` — paths below are copied verbatim from the current file, do not normalize them.

- [ ] **Step 1: Replace file content**

Replace the full content of `docs/scolarite/cpbx/s3/index.md` with:

```mdx
---
title: Cycle Préparatoire De Bordeaux - Semestre 3
---

import DossierHeader from "@site/src/components/DossierHeader";
import MatiereSection from "@site/src/components/MatiereSection";
import ResourceList from "@site/src/components/ResourceList";

<DossierHeader school="cpbx" crumbs={["CPBx", "Semestre 3"]} />

<MatiereSection icon="💻" title="Informatique" responsable={{ name: "Frantisek Kardos", href: "https://www.labri.fr/index.php?n=Annuaires.Profile&id=Kardos_ID1346656366" }}>

Au semestre 3, en informatique on vous demande de commencer à réfléchir à des
solutions algorithmiques plus complexes que au premier semestre. L'idée n'est
pas d'avoir un code fonctionnel à tout prix mais de vous sensibiliser à
l'établissement d'une reflexion algorithmique et à faire de l'abstraction par
rapport à la machine. Ainsi, recopier la correction sans comprendre ni réflechir est juste inutile.

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: "informatique/cours.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "informatique/TD.pdf" }],
  },
]} />

</MatiereSection>

<MatiereSection icon="🧪" title="Chimie" responsable={{ name: "Jean Christophe Soetens", href: "http://theo.ism.u-bordeaux1.fr/index.php" }}>

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: "Chimie-cours.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "Chimie-TD.pdf" }],
  },
]} />

</MatiereSection>

<MatiereSection icon="📐" title="Mathématiques">

### Analyse

Responsable : [Laurent Michel](https://www.math.u-bordeaux.fr/~lamichel/enseignement.html)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: "maths/ncours.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "maths/ntd.pdf" }],
  },
]} />

### Algèbre

Responsable : [Nicolas Popoff](https://www.math.u-bordeaux.fr/~npopoff/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: "maths/gcours.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "maths/gtd.pdf" }],
  },
]} />

</MatiereSection>

<MatiereSection icon="🌀" title="Physique">

### Thermodynamique

Responsable : Julien Burgin

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: "physique/Thermo-cours.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "physique/Thermo-TD.pdf" }],
  },
]} />

### Electromagnétisme

Responsable : [Jérome Cayssol](https://www.loma.cnrs.fr/jerome-cayssol/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: "physique/Electromagnétisme-cours.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "physique/Electromagnétisme-TD.pdf" }],
  },
]} />

### Travaux Pratiques

Pour l'instant les travaux pratiques du semestre 3 n'ont pas changés depuis 10
ans. Normalement tous les TPs sont correct.

<ResourceList groups={[
  {
    type: "support",
    title: "Supports",
    items: [{ label: "Proposition de solution", href: "physique/TP-S3.pdf" }],
  },
]} />

</MatiereSection>
```

- [ ] **Step 2: Diff-check every href against the original file**

Run: `git show HEAD:docs/scolarite/cpbx/s3/index.md | grep -oE '\]\([^)]+\)' | sort > /tmp/s3-before.txt && grep -oE 'href: "[^"]+"' docs/scolarite/cpbx/s3/index.md | sed -E 's/href: "(.*)"/(\1)/' | sort > /tmp/s3-after.txt && diff /tmp/s3-before.txt /tmp/s3-after.txt`
Expected: no output.

- [ ] **Step 3: Verify build**

Run: `yarn build 2>&1 | tail -40`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add docs/scolarite/cpbx/s3/index.md
git commit -m "refactor: redesign CPBx semestre 3 page with new resource components"
```

---

## Task 11: Convert `docs/scolarite/cpbx/s4/index.md`

**Files:**
- Modify: `docs/scolarite/cpbx/s4/index.md`

**Interfaces:**
- Consumes: same components as Task 8. The "Projet" `##` section has no responsable line and a `###` sub-heading naming one specific project — kept as a `MatiereSection` nested title via plain markdown, since `MatiereSection` doesn't support nesting titles inside itself (render the project name as a plain `####`-level bold line inside the section, not another `MatiereSection`).

- [ ] **Step 1: Replace file content**

Replace the full content of `docs/scolarite/cpbx/s4/index.md` with:

```mdx
---
title: Cycle Préparatoire De Bordeaux - Semestre 4
---

import DossierHeader from "@site/src/components/DossierHeader";
import MatiereSection from "@site/src/components/MatiereSection";
import ResourceList from "@site/src/components/ResourceList";

<DossierHeader school="cpbx" crumbs={["CPBx", "Semestre 4"]} />

<MatiereSection icon="💻" title="Informatique" responsable={{ name: "Frantisek Kardos", href: "https://www.labri.fr/index.php?n=Annuaires.Profile&id=Kardos_ID1346656366" }}>

Au semestre 4 le cours d'informatique propose de mettre en place un jeu de votre
choix (dont le thème change chaque année !). Pour ces qui sont les plus
intéressé (souvent les ENSEIRB-Info) c'est une occasion de réaliser un projet
complet en informatique. Ne foncez surtout pas tête baissée, prenez le temps de
réflechir à comment va s'organiser les fichiers, les fonctions etc. Amusez vous !

</MatiereSection>

<MatiereSection icon="📐" title="Mathématiques">

### Calcul différentiel

Responsable : [Patrick Fisher](https://www.math.u-bordeaux.fr/~pfischer/Welcome.html)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Notes de cours", href: "maths/diff.pdf" },
      { label: "Fiche — Séries de Fourier", href: "maths/fourier.pdf" },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "maths/diff-td.pdf" }],
  },
]} />

### Calcul Intégral

Responsable : [Nicolas Popoff](https://www.math.u-bordeaux.fr/~npopoff/)

Attention, les notes de TD ne sont plus à jour.

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Notes de cours", href: "maths/int.pdf" },
      { label: "Fiche", href: "maths/int-fiches.pdf" },
    ],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "maths/int-td.pdf" }],
  },
]} />

### Probabilité

Responsable : Hervé Joint

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Notes de cours", href: "maths/proba.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "maths/proba-td.pdf" }],
  },
]} />

</MatiereSection>

<MatiereSection icon="🌀" title="Physique">

### Physique Quantique & Relativité

Responsable : Daniel Blaudez

Le sujet du DM change chaque année, la version fournie est indicative.

<ResourceList groups={[
  {
    type: "td",
    title: "Travaux dirigés",
    items: [
      { label: "Notes de TD", href: "physique/rel-quant.pdf" },
      { label: "DM", href: "physique/dm.pdf" },
    ],
  },
]} />

### Mécanique des fluides

Responsable : Jean Stéphane Baste

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [
      { label: "Fiche", href: "physique/meca.pdf" },
      { label: "Prise de notes", href: "physique/meca-cours.pdf" },
    ],
  },
  {
    type: "correction",
    title: "Correction",
    items: [{ label: "Premiers exercices", href: "physique/meca-td.pdf" }],
  },
]} />

### Optique

Responsable : [Pierre Langot](https://www.loma.cnrs.fr/pierre-langot/)

<ResourceList groups={[
  {
    type: "cours",
    title: "Cours",
    items: [{ label: "Fiche", href: "physique/Optique-fiches.pdf" }],
  },
  {
    type: "td",
    title: "Travaux dirigés",
    items: [{ label: "Notes de TD", href: "physique/opt-td.pdf" }],
  },
]} />

</MatiereSection>

<MatiereSection icon="🗂️" title="Projet">

Au semestre 4 le projet est un élément central. Ils peuvent totalement sauver
le semestre car ils fournissent des notes en LCO, Anglais mais aussi dans l'UE
projet (coefficient 6). Voici quelques exemples de projet qui ont marché les
années précendentes, vous pouvez les parcourir pour voir ce qui est attendu ou
juste par curiosité. Les différents professeurs ont différentes attentes qu'il
faut respecter.

**L'utilisation des Interfaces Cerveau-Machine dans la communication écrite**

<ResourceList groups={[
  {
    type: "projet",
    title: "Documents du projet",
    items: [
      { label: "Article Scientifique", href: "projet/article.pdf" },
      { label: "Avant projet diaporama", href: "projet/article-diap.pdf" },
      { label: "Avant projet", href: "projet/avant-projet.pdf" },
      { label: "Avant synthèse", href: "projet/avant-synthese.pdf" },
      { label: "Avant synthèse diaporama", href: "projet/avant-synthese-diap.pdf" },
      { label: "Corpus", href: "projet/corpus.pdf" },
      { label: "Rédaction", href: "projet/redac.pdf" },
      { label: "Mémoire", href: "projet/memoire.pdf" },
      { label: "Soutenance", href: "projet/soutenance.pdf" },
      { label: "Questions", href: "projet/questions.pdf" },
    ],
  },
]} />

</MatiereSection>
```

- [ ] **Step 2: Diff-check every href against the original file**

Run: `git show HEAD:docs/scolarite/cpbx/s4/index.md | grep -oE '\]\([^)]+\)' | sort > /tmp/s4-before.txt && grep -oE 'href: "[^"]+"' docs/scolarite/cpbx/s4/index.md | sed -E 's/href: "(.*)"/(\1)/' | sort > /tmp/s4-after.txt && diff /tmp/s4-before.txt /tmp/s4-after.txt`
Expected: no output.

- [ ] **Step 3: Verify build**

Run: `yarn build 2>&1 | tail -40`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add docs/scolarite/cpbx/s4/index.md
git commit -m "refactor: redesign CPBx semestre 4 page with new resource components"
```

---

## Task 12: Full verification and live preview

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run: `yarn build 2>&1 | tail -60`
Expected: build succeeds with zero broken-link warnings under `docs/scolarite/`.

- [ ] **Step 2: Start dev server for visual check**

Run: `yarn start` (foreground, leave running)
Expected: dev server opens at `http://localhost:3000`. Visit `/docs/scolarite`, `/docs/scolarite/cpbx`, and each `/docs/scolarite/cpbx/s1..s4` — confirm cards render with icons/colors, dossier header shows correct breadcrumb, resource groups show correct counts, all links resolve to their PDFs, light and dark mode both legible.

- [ ] **Step 3: Report to user**

Tell the user the dev server URL and which pages to look at; do not commit anything for this task (verification-only).

---

## Follow-up (separate plan, not in this scope)

`docs/scolarite/enseirb/**` (166 files, deep nesting) needs the same treatment — `SubjectCardList` on every category-index page (école, semestre, matière-with-subfolders) and `ResourceList`/`DossierHeader` on every leaf matière page. Given the volume, that follow-up plan should batch by semestre and consider parallel subagents per semestre (files are independent). Not started here.
