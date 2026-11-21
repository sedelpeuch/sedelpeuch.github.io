"""Mechanical checks for a blog article (see SKILL.md).

Usage: python3 -I .claude/skills/blog-article/check.py blog/<dir>/<file>.md
Exit code 1 when at least one ERROR is reported. WARN lines need a human look.
"""

import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
FORBIDDEN_HEADINGS = re.compile(
    r"^#{2,4}\s+(Prérequis|Installation|Étape|Utilisation|Bonnes pratiques|"
    r"Exemple complet|Configuration complète|En résumé|Pour aller plus loin)",
    re.IGNORECASE,
)
PRONOUNS = re.compile(r"(?<![\w'])(je|j'|tu|vous|nous|on)(?![\w'])", re.IGNORECASE)
TICS = re.compile(
    r"(Il est important de|En résumé|En bref|génial|puissant|indispensable|"
    r"tout simplement|il suffit de)",
    re.IGNORECASE,
)


def main(path: Path) -> int:
    errors: list[str] = []
    warns: list[str] = []
    text = path.read_text(encoding="utf-8")

    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        print("ERROR frontmatter missing")
        return 1
    front, body = m.group(1), text[m.end() :]

    title = re.search(r'^title:\s*"(.+)"\s*$', front, re.MULTILINE)
    if not title:
        errors.append("title missing or not in double quotes")
    desc = re.search(r'^description:\s*"(.+)"\s*$', front, re.MULTILINE)
    if not desc:
        errors.append("description missing or not in double quotes")
    elif len(desc.group(1)) > 250:
        warns.append(
            f"description is {len(desc.group(1))} chars (target 250 max, no enumeration)"
        )
    if re.search(r"^authors:", front, re.MULTILINE):
        errors.append("authors field present")
    tags = re.search(r"^tags:(.*)$", front, re.MULTILINE)
    if not tags or "devops" not in tags.group(1):
        errors.append("tags missing or without devops")
    folder = re.match(r"\d{2}-(.+)$", path.resolve().parent.name)
    if tags and folder and folder.group(1).replace("-", "") not in tags.group(1):
        errors.append(
            f"tags without the folder category '{folder.group(1).replace('-', '')}'"
        )
    series = re.search(r"^series:\s*(\S+)\s*$", front, re.MULTILINE)
    if series:
        plugin = (ROOT / "plugins/series-data/index.js").read_text(encoding="utf-8")
        block = re.search(r"const LABELS = \{(.*?)\};", plugin, re.DOTALL)
        known = (
            re.findall(r'^\s*"?([\w-]+)"?:', block.group(1), re.MULTILINE)
            if block
            else []
        )
        if series.group(1) not in known:
            errors.append(
                f"series '{series.group(1)}' not in LABELS of plugins/series-data/index.js"
            )
    today = date.today().isoformat()
    for target in re.findall(r"\]\((\./[^)\s#]+\.mdx?)", text):
        name = Path(target).name
        linked = re.match(r"(\d{4}-\d{2}-\d{2})-", name)
        if (path.parent / target).parent.joinpath(f"_{name}").exists():
            warns.append(
                f"links to a draft (_{name}): publish it first or drop the link"
            )
        elif linked and linked.group(1) > today:
            warns.append(f"links to an article dated in the future ({target})")

    # Split prose from fenced code blocks.
    blocks = list(
        re.finditer(r"^```([^\n]*)\n(.*?)^```", body, re.DOTALL | re.MULTILINE)
    )
    prose = re.sub(r"^```[^\n]*\n.*?^```", "", body, flags=re.DOTALL | re.MULTILINE)
    prose_no_inline = re.sub(r"`[^`\n]+`", "", prose)
    prose_no_inline = re.sub(r"<[^>]+>", "", prose_no_inline)
    prose_no_inline = re.sub(r"\]\([^)]*\)", "]", prose_no_inline)

    code_blocks = []
    for b in blocks:
        lang = b.group(1).strip()
        lines = b.group(2).rstrip("\n").count("\n") + 1
        if not lang:
            errors.append("code block without language")
        if lang in ("text", "mermaid"):
            continue
        code_blocks.append((lang, lines))
    if len(code_blocks) > 1:
        errors.append(f"{len(code_blocks)} code blocks (max 1): {code_blocks}")
    for lang, lines in code_blocks:
        if lines > 5:
            errors.append(f"{lang} block of {lines} lines (max 5)")
    diagrams = len(blocks) - len(code_blocks)
    if diagrams > 1:
        errors.append(
            f"{diagrams} text/mermaid blocks (max 1 diagram; options and regexps go in prose)"
        )

    if "<!--truncate-->" not in body:
        errors.append("<!--truncate--> missing")
    else:
        intro = body.split("<!--truncate-->")[0].strip()
        paras = [p for p in re.split(r"\n\s*\n", intro) if p.strip()]
        words = len(intro.split())
        if len(paras) != 1:
            errors.append(f"intro has {len(paras)} paragraphs (expected 1)")
        if not 70 <= words <= 150:
            warns.append(f"intro is {words} words (target 70-150)")

    if re.search(r"^# ", prose, re.MULTILINE):
        errors.append("H1 in body")
    for line in prose.splitlines():
        if FORBIDDEN_HEADINGS.match(line):
            errors.append(f"tutorial-style heading: {line.strip()}")
    if "## Application / Projet lié" not in body:
        errors.append("section '## Application / Projet lié' missing")
    if not re.search(r"^## .*(Limites|Pièges|ne couvre pas)", body, re.MULTILINE):
        warns.append("no 'Limites' / 'Pièges et limites' section")

    raw_lines = re.sub(r"<[^>]+>", "", prose).splitlines()
    for line, raw in zip(prose_no_inline.splitlines(), raw_lines):
        if "—" in line or "–" in line:
            errors.append(f"dash: {line.strip()[:80]}")
        for p in PRONOUNS.findall(line):
            errors.append(f"pronoun '{p}': {line.strip()[:80]}")
        if re.match(r"^\s*[-*]\s+\*\*(?!`)", raw):
            warns.append(f"bold prose label in list: {raw.strip()[:80]}")
        for t in TICS.findall(line):
            warns.append(f"tic '{t}': {line.strip()[:80]}")
    contrasts = len(
        re.findall(
            r"\bpas\b[^.\n]{0,60}\bmais\b|,\s*pas\s+(celui|celle|le|la|les|un|une)\b",
            prose_no_inline,
        )
    )
    if contrasts > 2:
        warns.append(f"{contrasts} 'pas X mais Y' style contrasts")

    words = len(prose_no_inline.split())
    if not 1200 <= words <= 2500:
        warns.append(f"body is ~{words} words (target 1200-2500)")

    for target in re.findall(r"\]\(([^)\s]+)\)", body) + re.findall(
        r'to="([^"]+)"', body
    ):
        target = target.split("#")[0]
        if not target or target.startswith(("http", "mailto")):
            continue
        if target.startswith("/docs/"):
            base = ROOT / target.lstrip("/")
            cands = [
                base.with_suffix(".md"),
                base.with_suffix(".mdx"),
                base / "index.md",
            ]
            if not any(c.exists() for c in cands):
                errors.append(f"broken docs link: {target}")
        elif target.startswith("/blog/"):
            m2 = re.match(r"/blog/(\d{4})/(\d{2})/(\d{2})/([^/]+)/([^/]+)/?$", target)
            if m2:
                y, mo, d, folder, slug = m2.groups()
                if not (ROOT / "blog" / folder / f"{y}-{mo}-{d}-{slug}.md").exists():
                    errors.append(f"broken blog permalink: {target}")
        elif (
            target.endswith((".md", ".mdx"))
            and not (path.parent / target).resolve().exists()
            and not (path.parent / target)
            .parent.joinpath(f"_{Path(target).name}")
            .exists()
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
