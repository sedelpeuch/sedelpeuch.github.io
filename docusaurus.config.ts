import path from "node:path";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { themes } from "prism-react-renderer";
import social from "./data/social";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const baseUrl = process.env.BASE_URL || "/";

// Anciennes URL publiques (billets redatés ou renommés, pages déplacées ou
// retirées) : cible actuelle -> anciens chemins. Une source ne doit jamais
// être une URL encore servie.
const movedPages: Record<string, string[]> = {
  "/blog": ["/blog/idea"],
  "/blog/2024/01/01/devops-roadmap": [
    "/blog/2024/02/02/devops-roadmap",
    "/blog/2024/03/24/devops-roadmap",
    "/blog/2024/12/20/devops-roadmap",
  ],
  "/blog/2024/01/01/devops-roadmap-2024": [
    "/blog/2024/01/01/devops-roadmap-acquis",
    "/blog/2024/12/20/devops-roadmap-acquis",
    "/blog/2025/01/12/devops-roadmap-2024",
  ],
  "/blog/2024/12/20/02-network/nginx": [
    "/blog/2024/01/15/02-network/nginx",
    "/blog/2024/03/24/02-network/nginx",
    "/blog/2024/05/05/02-network/nginx",
  ],
  "/blog/2024/12/20/02-network/proxy-vs-reverse-proxy": [
    "/blog/2024/02/01/02-network/proxy-vs-reverse-proxy",
    "/blog/2024/03/31/02-network/proxy-vs-reverse-proxy",
    "/blog/2024/05/12/02-network/proxy-vs-reverse-proxy",
  ],
  "/blog/2024/12/20/03-containerization/difference-conteneurisation-virtualisation": [
    "/blog/2024/03/31/03-containerization/difference-conteneurisation-virtualisation",
    "/blog/2024/10/15/03-containerization/difference-conteneurisation-virtualisation",
  ],
  "/blog/2024/12/20/03-containerization/docker": [
    "/blog/2024/02/18/03-containerization/docker",
    "/blog/2024/02/18/contenerisation-docker",
    "/blog/2024/03/03/03-containerization/docker",
    "/blog/2024/07/15/03-containerization/docker",
  ],
  "/blog/2024/12/20/03-containerization/docker-best-practices": [
    "/blog/2024/03/10/03-containerization/docker-best-practices",
    "/blog/2024/03/17/03-containerization/docker-best-practices",
    "/blog/2024/03/17/contenerisation-docker-best-practices",
    "/blog/2024/08/30/03-containerization/docker-best-practices",
  ],
  "/blog/2024/12/20/03-containerization/docker-containers": [
    "/blog/2024/03/05/03-containerization/docker-containers",
    "/blog/2024/03/10/03-containerization/docker-containers",
    "/blog/2024/07/30/03-containerization/docker-containers",
  ],
  "/blog/2024/12/20/03-containerization/ghcr": [
    "/blog/2024/02/18/03-containerization/ghrc",
    "/blog/2024/02/18/04-ci-cd/ghrc",
    "/blog/2024/02/18/ci-cd-ghrc",
    "/blog/2024/03/24/03-containerization/ghrc",
    "/blog/2024/09/31/03-containerization/ghrc",
    "/blog/2024/12/20/03-containerization/ghrc",
  ],
  "/blog/2024/12/20/04-ci-cd/action": [
    "/blog/2024/02/04/04-ci-cd/action",
    "/blog/2024/02/04/ci-cd-action",
    "/blog/2024/03/02/ci-cd-action",
    "/blog/2024/03/28/04-ci-cd/action",
  ],
  "/blog/2024/12/20/04-ci-cd/github-actions": [
    "/blog/2024/02/02/04-ci-cd/github-actions",
    "/blog/2024/02/22/04-ci-cd/github-actions",
  ],
  "/blog/2024/12/20/04-ci-cd/github-actions-architecture-reutilisable": [
    "/blog/2024/02/25/04-ci-cd/exemple",
    "/blog/2024/03/03/04-ci-cd/exemple",
    "/blog/2024/03/03/ci-cd-exemple",
    "/blog/2024/06/11/04-ci-cd/exemple",
    "/blog/2024/12/20/04-ci-cd/exemple",
  ],
  "/blog/2024/12/20/04-ci-cd/github-arc": [
    "/blog/2024/02/18/04-ci-cd/github-arc",
    "/blog/2024/02/25/04-ci-cd/github-arc",
    "/blog/2024/02/25/ci-cd-github-arc",
    "/blog/2024/05/10/04-ci-cd/github-arc",
  ],
  "/blog/2024/12/20/04-ci-cd/self-host-runner": [
    "/blog/2024/02/11/04-ci-cd/self-host-runner",
    "/blog/2024/02/11/ci-cd-self-host-runner",
    "/blog/2024/02/13/self-host-runner",
    "/blog/2024/04/15/04-ci-cd/self-host-runner",
  ],
  "/blog/2024/12/20/04-ci-cd/workflow": [
    "/blog/2024/02/03/04-ci-cd/workflow",
    "/blog/2024/02/04/04-ci-cd/workflow",
    "/blog/2024/02/04/ci-cd-workflow",
    "/blog/2024/02/13/ci-cd-workflow",
    "/blog/2024/03/17/04-ci-cd/workflow",
  ],
  "/blog/2024/12/20/06-orchestration/docker-compose": [
    "/blog/2024/03/17/03-containerization/docker-compose",
    "/blog/2024/04/01/06-orchestration/docker-compose",
    "/blog/2024/04/07/03-containerization/docker-compose",
    "/blog/2024/11/01/06-orchestration/docker-compose",
  ],
  "/blog/2024/12/20/06-orchestration/orchestration-dokku": [
    "/blog/2024/03/10/06-orchestration/orchestration-dokku",
    "/blog/2024/03/10/orchestration-dokku",
    "/blog/2024/04/07/06-orchestration/orchestration-dokku",
    "/blog/2024/11/30/06-orchestration/orchestration-dokku",
  ],
  "/blog/2024/12/20/09-scripting/fastapi": [
    "/blog/2024/08/26/09-scripting/fastapi",
    "/blog/2024/08/26/python-fastapi",
    "/blog/2024/12/15/09-scripting/fastapi",
  ],
  "/blog/2025/01/01/devops-roadmap-2025": [
    "/blog/2025/11/21/devops-roadmap-2025",
  ],
  "/blog/2025/01/12/06-orchestration/k8s-basic-components": [
    "/blog/2025/02/05/06-orchestration/k8s-basic-components",
  ],
  "/blog/2025/01/12/06-orchestration/k8s-introduction": [
    "/blog/2025/02/01/06-orchestration/k8s-introduction",
  ],
  "/blog/2025/01/12/06-orchestration/k8s-secrets-configmaps": [
    "/blog/2025/02/15/06-orchestration/k8s-secrets-configmaps",
  ],
  "/blog/2025/01/12/06-orchestration/k8s-storage": [
    "/blog/2025/02/10/06-orchestration/k8s-storage",
  ],
  "/blog/2025/01/13/02-network/nginx-proxy-manager": [
    "/blog/2025/01/12/02-network/nginx-proxy-manager",
  ],
  "/blog/2025/06/06/03-containerization/debugging-docker-containers": [
    "/blog/2024/03/16/03-containerization/debugging-docker-containers",
    "/blog/2024/08/15/03-containerization/debugging-docker-containers",
  ],
  "/blog/2025/06/06/06-orchestration/renouveler-certificats": [
    "/blog/2025/06/06/06-orchestration/renouveller-certificats",
  ],
  "/blog/2025/06/06/09-scripting/poetry-python-dependency": [
    "/blog/2025/03/01/09-scripting/poetry-python-dependency",
  ],
  "/blog/2025/06/06/09-scripting/pydantic-validation-donnees": [
    "/blog/2025/03/30/09-scripting/pydantic-validation-donnees",
  ],
  "/blog/2025/06/09/02-network/traefik": [
    "/blog/2025/02/15/02-network/traefik",
    "/blog/2025/03/15/02-network/traefik",
  ],
  "/blog/2025/06/09/08-iac/ansible-introduction": [
    "/blog/2025/04/05/08-iac/ansible-introduction",
  ],
  "/blog/2025/06/09/08-iac/ansible-zsh-automation": [
    "/blog/2025/04/25/08-iac/ansible-zsh-automation",
  ],
  "/blog/2025/08/04/09-scripting/graphql": [
    "/blog/2025/07/01/09-scripting/graphql",
  ],
  "/blog/2025/08/04/09-scripting/strawberry": [
    "/blog/2025/07/15/09-scripting/strawberry",
  ],
  "/blog/2025/11/21/06-orchestration/kubectl-commandes-essentielles": [
    "/blog/2025/08/01/06-orchestration/kubectl-commandes-essentielles",
  ],
  "/blog/2025/11/21/07-monitoring/loki-logs-management": [
    "/blog/2025/10/30/07-monitoring/loki-logs-management",
  ],
  "/blog/2025/11/21/07-monitoring/prometheus-introduction": [
    "/blog/2025/10/15/07-monitoring/prometheus-introduction",
  ],
  "/blog/2025/11/21/08-iac/ansible-playbooks-avances": [
    "/blog/2025/05/15/08-iac/ansible-playbooks-avances",
  ],
  "/blog/2025/11/21/09-scripting/python-async-await": [
    "/blog/2025/09/01/09-scripting/python-async-await",
  ],
  "/blog/2025/11/28/08-iac/ansible-vault": [
    "/blog/2025/06/05/08-iac/ansible-vault",
  ],
  "/blog/2025/12/09/09-scripting/ruff-linting-formatting": [
    "/blog/2025/07/20/09-scripting/ruff-linting-formatting",
  ],
  "/blog/2026/01/01/devops-roadmap-2026": [
    "/blog/2025/12/19/devops-roadmap-2026",
  ],
  "/docs/projects": [
    "/docs/enseignement",
    "/docs/learning",
    "/docs/projects/fraiseuse-cnc-bois",
    "/docs/projects/g-rez-vos-codes-sources-avec-git",
    "/docs/projects/gnu-make",
    "/docs/projects/imprimantes-3d-sla",
    "/docs/projects/recherche-de-chemin-travers-l-algorithme-a-en-c",
    "/docs/projects/traitement-d-image-pour-la-d-tection-de-tag-aruco-avec-opencv-en-python",
    "/project",
  ],
  "/docs/projects/associatif/application-ultimaker-s-rie-s": [
    "/docs/projects/application-de-suivi-ultimaker-s-rie-s",
    "/docs/projects/application-ultimaker-s-rie-s",
  ],
  "/docs/projects/associatif/easy-booked-eirlab": [
    "/docs/projects/easy-booked-eirlab",
  ],
  "/docs/projects/associatif/ez-wheel-navigation": [
    "/docs/projects/ez-wheel-navigation",
  ],
  "/docs/projects/associatif/haricot-apringalle": [
    "/docs/projects/haricot-apringalle",
  ],
  "/docs/projects/associatif/luciole": ["/docs/projects/luciole"],
  "/docs/projects/associatif/reachy-mobile": ["/docs/projects/reachy-mobile"],
  "/docs/projects/associatif/ronoco": ["/docs/projects/ronoco"],
  "/docs/projects/associatif/vertical-plotter": [
    "/docs/projects/vertical-plotter",
  ],
  "/docs/projects/associatif/wolf": ["/docs/projects/wolf"],
  "/docs/projects/personnel/delpeuch-net": ["/docs/projects/delpeuch-net"],
  "/docs/projects/personnel/delpeuch-net-blog": [
    "/docs/projects/delpeuch-net-blog",
  ],
  "/docs/projects/personnel/homelab": [
    "/docs/projects/fervantfactory",
    "/docs/projects/personnel/fervantfactory",
  ],
  "/docs/projects/personnel/template-latex": ["/docs/projects/template-latex"],
  "/docs/projects/professionnel": [
    "/docs/projects/professionnel/6tron-backend",
  ],
  "/docs/projects/professionnel/github-arc-kubeadm": [
    "/docs/projects/github-arc-kubeadm",
  ],
  "/docs/projects/professionnel/robocup-home-2023-catie": [
    "/docs/projects/robocup-home-2023-catie",
  ],
  "/about": ["/contact"],
  "/docs/scolarite/associatif": ["/associatif"],
  // Ancien site (avant Docusaurus). Barre finale : même forme que les routes
  // des pages index, sinon le plugin rejette la cible.
  "/docs/scolarite/cpbx/": ["/cpbx"],
  "/docs/scolarite/cpbx/s1/": ["/cpbx/cpbx_semestre_1"],
  "/docs/scolarite/cpbx/s2/": ["/cpbx/cpbx_semestre_2"],
  "/docs/scolarite/cpbx/s3/": ["/cpbx/cpbx_semestre_3"],
  "/docs/scolarite/cpbx/s4/": ["/cpbx/cpbx_semestre_4"],
  "/docs/scolarite/enseirb/s5/": ["/semestre5"],
  "/docs/scolarite/enseirb/s6/": ["/semestre6"],
  "/docs/scolarite/enseirb/s7/": ["/semestre7"],
  "/docs/scolarite/enseirb/s8/": ["/semestre8"],
  "/docs/scolarite/enseirb/s9/": ["/semestre9"],
};
// Étiquettes qui n'existent plus (pages /blog/tags/<x> et /docs/tags/<x>).
const removedBlogTags = [
  "alternatives", "ansible", "api", "async", "asyncio", "automation", "aws",
  "ci-cd", "cli", "containers", "conteneur", "data-validation", "debugging",
  "dependances", "dev-ops", "docker", "docker-compose", "fast-api",
  "formatting", "git-hub", "ia-c", "kubectl", "kubernetes", "linting", "logs",
  "loki", "nginx", "nginx-proxy-manager", "observabilite", "oh-my-zsh",
  "packaging", "performance", "prometheus", "proxy", "python", "registry",
  "reverse-proxy", "roadmap", "ruff", "securite", "tooling", "traefik", "uv",
  "vault", "virtualization", "vm", "zsh",
];
const removedDocTags = [
  "automatisation", "autonome", "best-practices", "blog", "capteur", "ci-cd", "cmake", "cpp",
  "informatique", "jardinage", "js", "mecanique", "memoire", "migration",
  "modelisation", "multi-techno", "portfolio", "qualite", "rapport",
  "securite", "template", "tests",
];

const config: Config = {
  title: "Sébastien Delpeuch",
  tagline: "Ingénieur DevOps & Robotique · CATIE Bordeaux",
  url: "https://delpeuch.net",
  baseUrl,
  favicon: "img/logo.svg",
  organizationName: "sedelpeuch",
  projectName: "sedelpeuch.net",
  onBrokenLinks: "warn",
  customFields: {
    description:
      "Portfolio de Sébastien Delpeuch, ingénieur en robotique et DevOps au CATIE (Bordeaux). Articles techniques sur Kubernetes, Python, CI/CD, ROS2 et projets professionnels.",
  },
  i18n: {
    defaultLocale: "fr",
    locales: ["fr"],
  },
  themeConfig: {
    navbar: {
      logo: {
        alt: "navbar",
        src: "img/logo.svg",
      },
      items: [
        {
          label: "Résumé",
          position: "left",
          to: "about",
        },
        {
          label: "Blog",
          position: "left",
          to: "blog",
          type: "dropdown",
          items: [
            {
              label: "Réseau",
              to: "blog/tags/network",
            },
            {
              label: "Conteneurisation",
              to: "blog/tags/containerization",
            },
            {
              label: "CI/CD",
              to: "blog/tags/cicd",
            },
            {
              label: "Cloud",
              to: "blog/tags/cloud",
            },
            {
              label: "Orchestration",
              to: "blog/tags/orchestration",
            },
            {
              label: "Observabilité",
              to: "blog/tags/monitoring",
            },
            {
              label: "Infrastructure as Code",
              to: "blog/tags/iac",
            },
            {
              label: "Scripting",
              to: "blog/tags/scripting",
            },
          ],
        },
        {
          label: "Projets",
          position: "left",
          to: "docs/projects",
        },
        {
          type: "dropdown",
          label: "Scolarité",
          position: "right",
          to: "docs/scolarite",
          items: [
            {
              label: "Associations",
              to: "docs/scolarite/associatif",
            },
            {
              label: "ENSEIRB-MATMECA : Semestre 9",
              to: "docs/scolarite/enseirb/s9",
            },
            {
              label: "ENSEIRB-MATMECA : Semestre 8",
              to: "docs/scolarite/enseirb/s8",
            },
            {
              label: "ENSEIRB-MATMECA : Semestre 7",
              to: "docs/scolarite/enseirb/s7",
            },
            {
              label: "ENSEIRB-MATMECA : Semestre 6",
              to: "docs/scolarite/enseirb/s6",
            },
            {
              label: "ENSEIRB-MATMECA : Semestre 5",
              to: "docs/scolarite/enseirb/s5",
            },
            {
              label: "CPBx : Semestre 4",
              to: "docs/scolarite/cpbx/s4",
            },
            {
              label: "CPBx : Semestre 3",
              to: "docs/scolarite/cpbx/s3",
            },
            {
              label: "CPBx : Semestre 2",
              to: "docs/scolarite/cpbx/s2",
            },
            {
              label: "CPBx : Semestre 1",
              to: "docs/scolarite/cpbx/s1",
            },
          ],
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Social",
          items: [{ label: "GitHub", href: social.github.href }],
        },
      ],
    },
    prism: {
      theme: themes.oneLight,
      darkTheme: themes.oneDark,
      additionalLanguages: [
        "bash",
        "json",
        "java",
        "python",
        "php",
        "graphql",
        "rust",
        "toml",
        "protobuf",
        "hcl",
        "nginx",
        "docker",
        "ini",
        "powershell",
        "promql",
        "sql",
        "scheme",
        "cmake",
        "http",
        "django",
      ],
      defaultLanguage: "python",
      magicComments: [
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-error-line",
          line: "This will error",
        },
      ],
    },
    liveCodeBlock: { playgroundPosition: "top" },
    zoom: {
      selector: ".markdown :not(em) > img",
      background: {
        light: "rgb(255, 255, 255)",
        dark: "rgb(50, 50, 50)",
      },
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    metadata: [
      {
        name: "keywords",
        content:
          "DevOps, Kubernetes, robotique, Python, CATIE, Bordeaux, ingénieur, ROS2, Docker, CI/CD, GitHub Actions",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://delpeuch.net/img/sde.jpg" },
      { property: "og:site_name", content: "Sébastien Delpeuch" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: "https://delpeuch.net/img/sde.jpg" },
      { name: "google-site-verification", content: "uqWo4pfjrT_gmqh5o5ABrp3XB37t-Pfq5FwP_eXAwKI" },
    ],
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          sidebarPath: "sidebars.json",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
        },
        blog: {
          showReadingTime: true,
          // $ seul reste du texte (prix en dollars) : formules entre $$ ... $$.
          remarkPlugins: [[remarkMath, { singleDollarTextMath: false }]],
          rehypePlugins: [rehypeKatex],
          feedOptions: {
            type: "all",
            title: "Sébastien Delpeuch's Blog",
            description:
              "Articles techniques sur le DevOps, Kubernetes, Python, CI/CD et la robotique.",
          },
          blogSidebarTitle: "Tous les articles",
          blogSidebarCount: "ALL",
          tags: "tags.yaml",
        },
        theme: {
          customCss: ["./src/css/custom.scss"],
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    "./plugins/projects-data",
    "./plugins/series-data",
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          ...Object.entries(movedPages).map(([to, from]) => ({ from, to })),
          {
            from: removedBlogTags.map((tag) => `/blog/tags/${tag}`),
            to: "/blog/tags",
          },
          {
            from: removedDocTags.map((tag) => `/docs/tags/${tag}`),
            to: "/docs/tags",
          },
        ],
        // Réorganisation des docs : enseirb et cpbx sont passés sous scolarite.
        createRedirects(existingPath: string) {
          const match = existingPath.match(/^\/docs\/scolarite\/((?:enseirb|cpbx)(?:\/.*)?)$/);
          return match ? [`/docs/${match[1]}`] : undefined;
        },
      },
    ],
    "docusaurus-plugin-image-zoom",
    "docusaurus-plugin-sass",
    ["@docusaurus/plugin-ideal-image", { disableInDev: false }],
    [
      "@docusaurus/plugin-pwa",
      {
        debug: false,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        pwaHead: [
          { tagName: "link", rel: "manifest", href: `${baseUrl}manifest.json` },
          { tagName: "link", rel: "icon", href: `${baseUrl}img/logo.svg` },
          { tagName: "meta", name: "theme-color", content: "#12affa" },
        ],
      },
    ],
  ],
  scripts: [
    {
      src: "https://cloud.umami.is/script.js",
      defer: true,
      "data-website-id": "a249df0c-9eb1-4242-adf8-084b8163ae7d",
    },
  ],
  stylesheets: [
    "https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css",
    "https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css",
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-nH0MfJ44wi1dd7w6jinlyBgljjS8EJAh2JBoRad8a3VDw2K69vfaaqm4WnR+gXtA",
      crossorigin: "anonymous",
    },
  ],
  markdown: {
    mermaid: true,
  },
  themes: [
    "@docusaurus/theme-mermaid",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        indexBlog: true,
        indexDocs: true,
        docsRouteBasePath: "/",
        hashed: true,
        searchBarPosition: "right",
      },
    ],
  ],
};

export default config;
