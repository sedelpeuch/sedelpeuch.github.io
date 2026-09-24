// Regroupe les billets du blog par série à partir du frontmatter
// (`series: homelab`, `series_order` optionnel) et expose le résultat en données
// globales (usePluginData("series-data")). Ajouter un billet à une série se fait
// donc dans le billet lui-même, sans liste à maintenir ailleurs.
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ROOT = "blog";

// Libellés affichés ; une série absente de la table utilise son identifiant.
const LABELS = {
  homelab: "Homelab",
  terraform: "Terraform",
  aws: "AWS",
  kubernetes: "Kubernetes",
  "github-actions": "GitHub Actions",
  docker: "Docker",
  ansible: "Ansible",
  python: "Python",
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.mdx?$/.test(e.name) && !e.name.startsWith("_") ? [p] : [];
  });
}

// Même règle que le plugin blog de Docusaurus pour un fichier daté
// `AAAA-MM-JJ-slug.md` rangé dans un sous-dossier : /blog/AAAA/MM/JJ/<dossier>/<slug>.
function permalinkOf(rel, data) {
  const dir = path.dirname(rel);
  const base = path.basename(rel).replace(/\.mdx?$/, "");
  const m = base.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  if (data.slug) return data.slug.startsWith("/") ? `/blog${data.slug}` : `/blog/${data.slug}`;
  if (!m) return `/blog/${path.join(dir, base).split(path.sep).join("/")}`;
  const [, y, mo, d, slug] = m;
  const folder = dir === "." ? "" : `${dir.split(path.sep).join("/")}/`;
  return `/blog/${y}/${mo}/${d}/${folder}${slug}`;
}

module.exports = function seriesDataPlugin(context) {
  const root = path.join(context.siteDir, ROOT);
  return {
    name: "series-data",
    getPathsToWatch() {
      return [path.join(root, "**/*.{md,mdx}")];
    },
    async loadContent() {
      const series = {};
      for (const file of walk(root)) {
        const { data } = matter(fs.readFileSync(file, "utf8"));
        if (!data.series || data.draft || data.unlisted) continue;
        const rel = path.relative(root, file);
        const base = path.basename(rel);
        (series[data.series] ??= []).push({
          title: data.title ?? base,
          permalink: permalinkOf(rel, data),
          source: `@site/${ROOT}/${rel.split(path.sep).join("/")}`,
          sortKey: `${base.slice(0, 10)}-${String(data.series_order ?? 0).padStart(3, "0")}-${base}`,
        });
      }
      return Object.fromEntries(
        Object.entries(series).map(([id, posts]) => [
          id,
          {
            id,
            label: LABELS[id] ?? id,
            posts: posts
              .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
              .map(({ sortKey, ...p }) => p),
          },
        ]),
      );
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData({ series: content });
    },
  };
};
