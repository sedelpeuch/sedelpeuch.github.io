"""Roadmap state for one year, read from the same sources as the site.

Usage: python3 -I .claude/skills/roadmap/status.py [YEAR] [--today AAAA-MM-JJ]

Mirrors src/components/Roadmap/shared.tsx and Year.tsx: a topic is practiced
once an article references it (`dossier/slug`), "en cours" while its latest
article is under two months old. Prints, for the year: published and scheduled
articles, each objective domain with the topics worked this year and those still
"à venir", domains worked without an objective, articles attached to no topic,
and topic references that resolve to no article. Dated articles that git sees
as untracked or modified are flagged: they count on the local site but are not
online yet.
"""

import re
import subprocess
import sys
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
POST = re.compile(r"^(\d{4})-(\d{2})-(\d{2})-(.+)\.mdx?$")
RECENT = timedelta(days=60)


def parse_roadmap() -> list[dict]:
    text = (ROOT / "data/roadmap.ts").read_text(encoding="utf-8")
    domains: list[dict] = []
    for block in re.split(r'\n\s*\{\s*\n\s*number:\s*"', text)[1:]:
        number = block[:2]
        label = re.search(r'^\s*label:\s*"([^"]+)"', block, re.MULTILINE)
        topics = []
        body = block.split("topics:", 1)[1] if "topics:" in block else ""
        for t in re.finditer(r"\{([^{}]*?label:[^{}]*?)\}", body, re.DOTALL):
            raw = t.group(1)
            tl = re.search(r'label:\s*"([^"]+)"', raw)
            arts = re.search(r"articles:\s*\[([^\]]*)\]", raw, re.DOTALL)
            status = re.search(r'status:\s*"([^"]+)"', raw)
            since = re.search(r"since:\s*(\d{4})", raw)
            topics.append(
                {
                    "label": tl.group(1) if tl else "?",
                    "articles": re.findall(r'"([^"]+)"', arts.group(1)) if arts else [],
                    "status": status.group(1) if status else None,
                    "since": int(since.group(1)) if since else None,
                }
            )
        domains.append(
            {
                "number": number,
                "label": label.group(1) if label else "?",
                "topics": topics,
            }
        )
    return domains


def parse_posts() -> dict[str, tuple[date, str]]:
    posts: dict[str, tuple[date, str]] = {}
    for f in sorted((ROOT / "blog").glob("*/*.md*")):
        m = POST.match(f.name)
        if not m or f.name.startswith("_"):
            continue
        y, mo, d, slug = m.groups()
        title = re.search(
            r'^title:\s*"?(.+?)"?\s*$', f.read_text(encoding="utf-8"), re.MULTILINE
        )
        posts[f"{f.parent.name}/{slug}"] = (
            date(int(y), int(mo), int(d)),
            title.group(1) if title else slug,
        )
    return posts


def uncommitted() -> set[str]:
    """Blog refs whose file is untracked or modified (not published yet)."""
    try:
        out = subprocess.run(
            ["git", "status", "--porcelain", "--", "blog"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=True,
        ).stdout
    except (OSError, subprocess.CalledProcessError):
        return set()
    refs = set()
    for line in out.splitlines():
        p = Path(line[3:].strip())
        m = POST.match(p.name)
        if m and len(p.parts) >= 2:
            refs.add(f"{p.parent.name}/{m.group(4)}")
    return refs


def year_page(year: int) -> tuple[list[str], list[str], bool]:
    page = ROOT / f"src/pages/roadmap/{year}.mdx"
    if not page.exists():
        return [], [], False
    text = page.read_text(encoding="utf-8")
    objectives = re.findall(r'<Objective domain="(\d+)"', text)
    retros = re.findall(r'<Retro domain="(\d+)"', text)
    return objectives, retros, True


def main(argv: list[str]) -> int:
    today = date.today()
    if "--today" in argv:
        i = argv.index("--today")
        today = date.fromisoformat(argv[i + 1])
        del argv[i : i + 2]
    year = int(argv[0]) if argv else today.year

    domains = parse_roadmap()
    posts = parse_posts()
    objectives, retros, exists = year_page(year)

    published = {r: p for r, p in posts.items() if p[0].year == year and p[0] <= today}
    scheduled = {r: p for r, p in posts.items() if p[0].year == year and p[0] > today}
    print(f"# Roadmap {year} au {today.isoformat()}")
    print(f"page src/pages/roadmap/{year}.mdx : {'présente' if exists else 'ABSENTE'}")
    print(
        f"articles publiés : {len(published)} ; programmés (date future) : {len(scheduled)}"
    )
    for r, (d, t) in sorted(scheduled.items(), key=lambda x: x[1][0]):
        print(f"  programmé {d} {r} « {t} »")
    pending = sorted(r for r in published if r in uncommitted())
    for r in pending:
        print(
            f"  NON COMMITÉ {published[r][0]} {r} « {published[r][1]} » (pas encore en ligne)"
        )

    referenced: set[str] = set()
    broken: list[str] = []
    print("\n## Domaines")
    for dom in domains:
        worked, todo = [], []
        for t in dom["topics"]:
            arts = [a for a in t["articles"] if a in posts]
            broken += [
                f"{dom['number']} « {t['label']} » → {a}"
                for a in t["articles"]
                if a not in posts
            ]
            referenced.update(arts)
            this_year = [a for a in arts if a in published]
            dates = [posts[a][0] for a in arts if posts[a][0] <= today]
            status = t["status"] or (
                "en cours"
                if any(today - d < RECENT for d in dates)
                else "acquis"
                if dates
                else "à venir"
            )
            if this_year or (t["since"] == year and status == "acquis"):
                worked.append(
                    f"{t['label']} [{status}] : {', '.join(this_year) or 'sans article'}"
                )
            elif status == "à venir":
                todo.append(t["label"])
        mark = (
            "objectif"
            if dom["number"] in objectives
            else ("hors objectif" if worked else None)
        )
        if not mark:
            continue
        retro = " ; rétro écrite" if dom["number"] in retros else ""
        print(f"\n{dom['number']} {dom['label']} ({mark}{retro})")
        for w in worked:
            print(f"  travaillé : {w}")
        if not worked:
            print("  travaillé : rien cette année")
        if mark == "objectif" and todo:
            print(f"  à venir : {', '.join(todo)}")

    orphans = sorted(r for r in published if r not in referenced)
    print("\n## Articles de l'année rattachés à aucun sujet")
    for r in orphans:
        print(f"  {posts[r][0]} {r} « {posts[r][1]} »")
    if not orphans:
        print("  aucun")
    print("\n## Références de data/roadmap.ts sans article")
    for b in broken:
        print(f"  {b}")
    if not broken:
        print("  aucune")
    unknown = [
        n for n in objectives + retros if n not in {d["number"] for d in domains}
    ]
    if unknown:
        print(f"\nERREUR domaines inconnus dans la page : {unknown}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
