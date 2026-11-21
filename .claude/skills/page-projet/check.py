"""Mechanical checks for a project page (see SKILL.md).

Usage: python3 -I .claude/skills/page-projet/check.py docs/projects/<kind>/<page>.md
Exit code 1 when at least one ERROR is reported. WARN lines need a human look.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DATED_OPENER = re.compile(
    r"(?:^|\. )(?:En|Depuis|Jusqu'en) (?:janvier|février|mars|avril|mai|juin|juillet|"
    r"août|septembre|octobre|novembre|décembre) \d{4}",
)
TICS = re.compile(
    r"(Le détail est dans l'article|gain de temps significatif|Il est important de|"
    r"En résumé|En bref|n'est qu'une hypothèse)",
    re.IGNORECASE,
)


def parse_meta(body: str) -> dict | None:
    """Same contract as plugins/projects-data/index.js parseMeta."""
    m = re.search(r"<ProjectMeta\b([\s\S]*?)/>", body)
    if not m:
        return None
    attrs = m.group(1)
    meta: dict = {k: v for k, v in re.findall(r'(\w+)="((?:[^"\\]|\\.)*)"', attrs)}
    stack = re.search(r"stack=\{\s*(\[[\s\S]*?\])\s*\}", attrs)
    if stack:
        try:
            meta["stack"] = json.loads(stack.group(1))
        except json.JSONDecodeError:
            meta["stack"] = "INVALID"
    return meta


def main(path: Path) -> int:
    errors: list[str] = []
    warns: list[str] = []
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        print("ERROR frontmatter missing")
        return 1
    front, body = m.group(1), text[m.end() :]

    for key in ("title", "description", "tags"):
        if not re.search(rf"^{key}:", front, re.MULTILINE):
            errors.append(f"frontmatter: {key} missing")

    meta = parse_meta(body)
    if meta is None:
        errors.append("<ProjectMeta /> missing")
    else:
        for key in ("start", "role", "domain"):
            if not meta.get(key):
                errors.append(
                    f"ProjectMeta: {key} missing or not a double-quoted string"
                )
        if meta.get("stack") in (None, "INVALID"):
            errors.append("ProjectMeta: stack missing or not valid JSON")
        else:
            icons = (ROOT / "src/components/techIcons.ts").read_text(encoding="utf-8")
            known = {
                k.lower()
                for k in re.findall(r'^\s*"?([^":]+?)"?:\s*"', icons, re.MULTILINE)
            }
            missing = [s for s in meta["stack"] if s.lower() not in known]
            if missing:
                warns.append(f"stack without icon (shown as text): {missing}")
        if meta.get("end") and meta.get("end") == meta.get("start"):
            warns.append(
                "end == start: rendered as a one-off; only for a bounded event"
            )
        if meta.get("end"):
            warns.append(
                f"end={meta['end']}: page shows 'terminé'; check nothing is still maintained"
            )

    blocks = re.sub(r"^```[^\n]*\n.*?^```", "", body, flags=re.DOTALL | re.MULTILINE)
    prose = re.sub(r"`[^`\n]+`", "", blocks)
    prose = re.sub(r"<[^>]+>", "", prose)

    if not re.search(r"^## (Le )?[Cc]ontexte", body, re.MULTILINE):
        errors.append("section '## Contexte' missing")
    if not re.search(r"^## Résultats", body, re.MULTILINE):
        errors.append("section '## Résultats' missing")
    if not re.search(r"(?<![\w])(J'|j'|je |Je )", prose):
        errors.append("no first person: project pages are written with 'je'")

    for line in prose.splitlines():
        if "—" in line or "–" in line:
            errors.append(f"dash: {line.strip()[:80]}")
        for t in TICS.findall(line):
            warns.append(f"tic '{t}': {line.strip()[:80]}")
    results = re.search(r"^## Résultats\n(.*?)(?=^## |\Z)", body, re.DOTALL | re.MULTILINE)
    if results and len(re.findall(r"^\s*[-*]\s+\*\*", results.group(1), re.MULTILINE)) >= 2:
        warns.append("Résultats as a bold-label list: write sentences with measured facts")
    dated = DATED_OPENER.findall(prose)
    if len(dated) > 4:
        warns.append(
            f"{len(dated)} dated openers ('En octobre 2026, ...'): date only state changes"
        )
    contrasts = len(re.findall(r"\bpas\b[^.\n]{0,60}\bmais\b", prose))
    if contrasts:
        warns.append(f"{contrasts} 'pas X mais Y' contrast(s)")

    for target in re.findall(r"\]\(([^)\s]+)\)", body):
        target = target.split("#")[0]
        if not target or target.startswith(("http", "mailto")):
            continue
        if target.startswith("/blog/"):
            m2 = re.match(r"/blog/(\d{4})/(\d{2})/(\d{2})/([^/]+)/([^/]+)/?$", target)
            if m2:
                y, mo, d, folder, slug = m2.groups()
                if not (ROOT / "blog" / folder / f"{y}-{mo}-{d}-{slug}.md").exists():
                    errors.append(f"broken blog permalink: {target}")
        elif target.startswith("/docs/"):
            base = ROOT / target.lstrip("/")
            if not any(
                c.exists()
                for c in (
                    base.with_suffix(".md"),
                    base.with_suffix(".mdx"),
                    base / "index.md",
                )
            ):
                errors.append(f"broken docs link: {target}")
        elif (
            target.endswith((".md", ".mdx"))
            and not (path.parent / target).resolve().exists()
        ):
            errors.append(f"broken relative link: {target}")

    for e in errors:
        print("ERROR", e)
    for w in warns:
        print("WARN ", w)
    if not errors and not warns:
        print("OK")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(Path(sys.argv[1])))
