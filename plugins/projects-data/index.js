// Collecte les fiches <ProjectMeta /> des pages docs/projects et les expose en
// données globales (usePluginData("projects-data")). La page projet reste la
// source unique : l'index des projets et les encarts « projet lié » du blog
// lisent ces mêmes valeurs.
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ROOT = "docs/projects";
const KINDS = { professionnel: "pro", personnel: "perso", associatif: "asso" };

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.mdx?$/.test(e.name) ? [p] : [];
  });
}

// Extrait les props d'un <ProjectMeta ... /> écrit en MDX : chaînes entre
// guillemets doubles et tableau `stack={[...]}`. Format volontairement contraint.
function parseMeta(body) {
  const m = body.match(/<ProjectMeta\b([\s\S]*?)\/>/);
  if (!m) return null;
  const attrs = m[1];
  const meta = {};
  for (const [, key, value] of attrs.matchAll(/(\w+)="((?:[^"\\]|\\.)*)"/g)) {
    meta[key] = value.replace(/\\"/g, '"');
  }
  const stack = attrs.match(/stack=\{\s*(\[[\s\S]*?\])\s*\}/);
  if (stack) {
    try {
      meta.stack = JSON.parse(stack[1]);
    } catch {
      meta.stack = [];
    }
  }
  return meta.start ? meta : null;
}

module.exports = function projectsDataPlugin(context) {
  const root = path.join(context.siteDir, ROOT);
  return {
    name: "projects-data",
    getPathsToWatch() {
      return [path.join(root, "**/*.{md,mdx}")];
    },
    async loadContent() {
      return walk(root)
        .filter((file) => {
          const base = path.basename(file);
          return !base.startsWith("_") && !/^index\.mdx?$/.test(base);
        })
        .map((file) => {
          const { data, content } = matter(fs.readFileSync(file, "utf8"));
          const meta = parseMeta(content);
          if (!meta || data.draft || data.unlisted) return null;
          const rel = path.relative(root, file).replace(/\.mdx?$/, "");
          const dir = rel.split(path.sep)[0];
          return {
            title: data.title ?? rel,
            description: data.description ?? "",
            permalink: `/docs/projects/${data.slug ?? rel.split(path.sep).join("/")}`,
            kind: KINDS[dir] ?? "perso",
            ...meta,
          };
        })
        .filter(Boolean);
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData({ projects: content });
    },
  };
};
