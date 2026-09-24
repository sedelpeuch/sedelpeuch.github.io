// Collecte les fiches <ProjectMeta /> des pages docs/projects et, dans l'autre
// sens, les <ProjectLink to="…"> des billets du blog, puis expose le tout en
// données globales (usePluginData("projects-data")) :
// - `projects` : la fiche de chaque projet (index des projets, encarts du blog) ;
// - `articles` : pour chaque permalien de projet, les billets qui y renvoient
//   (liste « articles liés » en bas des pages projets).
// Chaque relation n'est écrite qu'à un seul endroit.
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { walkMarkdown, blogPermalink, blogDate } = require("../lib/blog");

const ROOT = "docs/projects";
const BLOG = "blog";
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

// <ProjectLink to="…" title="…">phrase</ProjectLink> d'un billet.
function parseLinks(body) {
  return [...body.matchAll(/<ProjectLink\b([^>]*)>([\s\S]*?)<\/ProjectLink>/g)].map(([, attrs, text]) => ({
    to: (attrs.match(/\bto="([^"]+)"/) ?? [])[1],
    text: text.replace(/\s+/g, " ").trim(),
  })).filter((l) => l.to);
}

function collectArticles(blogRoot) {
  const articles = {};
  for (const file of walkMarkdown(blogRoot)) {
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    if (data.draft || data.unlisted) continue;
    const rel = path.relative(blogRoot, file);
    const folder = rel.split(path.sep)[0];
    for (const link of parseLinks(content)) {
      const key = link.to.replace(/\/+$/, "");
      (articles[key] ??= []).push({
        title: data.title ?? path.basename(rel),
        permalink: blogPermalink(rel, data),
        date: blogDate(rel),
        category: /^\d{2}-/.test(folder) ? folder.replace(/^\d{2}-/, "") : "",
        text: link.text,
      });
    }
  }
  for (const list of Object.values(articles)) list.sort((a, b) => b.date.localeCompare(a.date));
  return articles;
}

module.exports = function projectsDataPlugin(context) {
  const root = path.join(context.siteDir, ROOT);
  const blogRoot = path.join(context.siteDir, BLOG);
  return {
    name: "projects-data",
    getPathsToWatch() {
      return [path.join(root, "**/*.{md,mdx}"), path.join(blogRoot, "**/*.{md,mdx}")];
    },
    async loadContent() {
      const projects = walk(root)
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
      return { projects, articles: collectArticles(blogRoot) };
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
