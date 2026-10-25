// Regroupe les billets du blog :
// - par série, à partir du frontmatter (`series: terraform`, `series_order`
//   optionnel) : parcours pensés pour être lus dans l'ordre ;
// - par catégorie, d'après le dossier (`07-monitoring` → monitoring) : sert à la
//   navigation précédent / suivant des billets hors série.
// Le résultat est exposé en données globales (usePluginData("series-data")).
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { walkMarkdown: walk, blogPermalink: permalinkOf, blogDate } = require("../lib/blog");

const ROOT = "blog";

// Libellés affichés ; une série absente de la table utilise son identifiant.
const LABELS = {
  terraform: "Terraform",
  aws: "AWS",
  kubernetes: "Kubernetes",
  "github-actions": "GitHub Actions",
  docker: "Docker",
  ansible: "Ansible",
  python: "Python",
  prometheus: "Prometheus",
  opentelemetry: "OpenTelemetry",
};

// Présentation d'une série sur la page /blog/series ; facultative.
const DESCRIPTIONS = {
  terraform:
    "Infrastructure as Code avec Terraform, du premier apply à la gestion de plusieurs environnements, en passant par les data sources, les boucles, les modules, les dépendances et le state distant.",
  aws: "Services AWS de base, du compte Free Tier à un cluster EKS observé avec CloudWatch : calcul, CLI, serverless, stockage, réseau et registre d'images.",
  kubernetes:
    "Kubernetes de l'architecture du cluster à l'exploitation : ressources de base, configuration, stockage persistant, certificats, kubectl, puis haute disponibilité et déploiements sans interruption.",
  ansible:
    "Automatisation avec Ansible, de l'inventaire et des premiers playbooks à un cas pratique complet, puis rôles, collections et chiffrement des secrets avec Vault.",
  docker:
    "Docker en profondeur : images et conteneurs, bonnes pratiques de construction, débogage d'un conteneur en panne et sauvegarde des volumes.",
  prometheus:
    "Supervision avec Prometheus, du modèle de collecte et de PromQL au routage des alertes par Alertmanager, puis aux règles d'alerte d'un cluster Kubernetes.",
  "github-actions":
    "CI/CD avec GitHub Actions, des workflows et actions réutilisables à une architecture mutualisée entre dépôts, puis l'exécution sur des runners auto-hébergés et ARC sur Kubernetes.",
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
          date: blogDate(rel),
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
        // Date de génération : référence de l'« activité récente » de la roadmap.
        generatedAt: Date.now(),
        categories: Object.fromEntries(
          Object.entries(categories).map(([id, posts]) => [id, sorted([...posts])]),
        ),
        series: Object.fromEntries(
        Object.entries(series).map(([id, posts]) => [
          id,
          {
            id,
            label: LABELS[id] ?? id,
            description: DESCRIPTIONS[id],
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
