import path from "node:path";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { themes } from "prism-react-renderer";
import social from "./data/social";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const config: Config = {
  title: "Sébastien Delpeuch",
  url: "https://delpeuch.net",
  baseUrl: process.env.BASE_URL || "/",
  favicon: "img/logo.svg",
  organizationName: "sedelpeuch",
  projectName: "sedelpeuch.net",
  onBrokenLinks: "warn",
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
          label: "Projets",
          position: "left",
          to: "docs/projects",
        },
        {
          label: "Enseignement",
          position: "left",
          to: "docs/enseignement",
        },
        {
          label: "Blog",
          position: "left",
          to: "blog",
        },
        {
          type: "dropdown",
          label: "Scolarité",
          position: "left",
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
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: "all",
            title: "Sébastien Delpeuch's Blog",
          },
          blogSidebarTitle: 'Tous les articles',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: ["./src/css/custom.scss"],
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    "docusaurus-plugin-image-zoom",
    "docusaurus-plugin-sass",
    ["@docusaurus/plugin-ideal-image", { disableInDev: false }],
    [
      "@docusaurus/plugin-pwa",
      {
        debug: true,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        pwaHead: [
          { tagName: "link", rel: "icon", href: "/img/logo.png" },
          { tagName: "meta", name: "theme-color", content: "#12affa" },
        ],
      },
    ],
  ],
  scripts: [
    {
      src: "https://plausible.io/js/script.js",
      defer: true,
      "data-domain": "delpeuch.net",
    },
  ],
  stylesheets: [
    "https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css",
    "https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css",
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid',
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
