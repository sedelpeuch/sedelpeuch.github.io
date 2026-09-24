// Regroupe les billets du blog :
// - par série, à partir du frontmatter (`series: homelab`, `series_order`
//   optionnel) : parcours pensés pour être lus dans l'ordre ;
// - par catégorie, d'après le dossier (`07-monitoring` → monitoring) : sert à la
//   navigation précédent / suivant des billets hors série.
// Le résultat est exposé en données globales (usePluginData("series-data")).
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { walkMarkdown: walk, blogPermalink: permalinkOf } = require("../lib/blog");

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

module.exports = function seriesDataPlugin(context) {
  const root = path.join(context.siteDir, ROOT);
  return {
    name: "series-data",
    getPathsToWatch() {
      return [path.join(root, "**/*.{md,mdx}")];
    },
    async loadContent() {
      const series = {};
      const categories = {};
      for (const file of walk(root)) {
        const { data } = matter(fs.readFileSync(file, "utf8"));
        if (data.draft || data.unlisted) continue;
        const rel = path.relative(root, file);
        const base = path.basename(rel);
        const post = {
          title: data.title ?? base,
          permalink: permalinkOf(rel, data),
          source: `@site/${ROOT}/${rel.split(path.sep).join("/")}`,
          sortKey: `${base.slice(0, 10)}-${String(data.series_order ?? 0).padStart(3, "0")}-${base}`,
        };
        const folder = rel.split(path.sep)[0];
        if (/^\d{2}-/.test(folder)) {
          (categories[folder.replace(/^\d{2}-/, "")] ??= []).push(post);
        }
        if (data.series) (series[data.series] ??= []).push(post);
      }
      const sorted = (posts) =>
        posts
          .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
          .map(({ sortKey, ...p }) => p);
      return {
        categories: Object.fromEntries(
          Object.entries(categories).map(([id, posts]) => [id, sorted([...posts])]),
        ),
        series: Object.fromEntries(
        Object.entries(series).map(([id, posts]) => [
          id,
          {
            id,
            label: LABELS[id] ?? id,
            posts: sorted([...posts]),
          },
        ]),
        ),
      };
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
