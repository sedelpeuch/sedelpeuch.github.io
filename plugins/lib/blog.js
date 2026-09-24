// Utilitaires partagés par les plugins qui lisent les billets du blog.
const fs = require("fs");
const path = require("path");

function walkMarkdown(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walkMarkdown(p);
    return /\.mdx?$/.test(e.name) && !e.name.startsWith("_") ? [p] : [];
  });
}

// Même règle que le plugin blog de Docusaurus pour un fichier daté
// `AAAA-MM-JJ-slug.md` rangé dans un sous-dossier : /blog/AAAA/MM/JJ/<dossier>/<slug>.
function blogPermalink(rel, data = {}) {
  const dir = path.dirname(rel);
  const base = path.basename(rel).replace(/\.mdx?$/, "");
  const m = base.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  if (data.slug) return data.slug.startsWith("/") ? `/blog${data.slug}` : `/blog/${data.slug}`;
  if (!m) return `/blog/${path.join(dir, base).split(path.sep).join("/")}`;
  const [, y, mo, d, slug] = m;
  const folder = dir === "." ? "" : `${dir.split(path.sep).join("/")}/`;
  return `/blog/${y}/${mo}/${d}/${folder}${slug}`;
}

/** Date AAAA-MM-JJ du nom de fichier, ou chaîne vide. */
function blogDate(rel) {
  const m = path.basename(rel).match(/^(\d{4}-\d{2}-\d{2})-/);
  return m ? m[1] : "";
}

module.exports = { walkMarkdown, blogPermalink, blogDate };
