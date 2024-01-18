import path from 'node:path'
import type {Config} from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import {themes} from 'prism-react-renderer'
import social from './data/social'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
    title: 'Sébastien Delpeuch',
    url: 'https://delpeuch.net',
    baseUrl: '/',
    favicon: 'img/favicon.ico',
    organizationName: 'sedelpeuch',
    projectName: 'sedelpeuch.net',
    themeConfig: {
        navbar: {
            logo: {
                alt: 'navbar',
                src: 'img/logo.webp',
            },
            items: [
                {
                    label: 'Projets',
                    position: 'left',
                    to: 'project',
                },
                {
                    label: 'Associatif',
                    position: 'left',
                    to: 'associatif',
                },
                {
                    type: 'dropdown',
                    label: 'CPBx',
                    position: 'left',
                    items: [
                        {
                            label: 'Semestre 4',
                            to: 'docs/cpbx/s4',
                        },
                        {
                            label: 'Semestre 3',
                            to: 'docs/cpbx/s3',
                        },
                        {
                            label: 'Semestre 2',
                            to: 'docs/cpbx/s2',
                        },
                        {
                            label: 'Semestre 1',
                            to: 'docs/cpbx/s1',
                        },
                    ],
                },
                {
                    type: 'dropdown',
                    label: 'ENSEIRB-MATMECA',
                    position: 'left',
                    items: [
                        {
                            label: 'Semestre 9',
                            to: 'docs/enseirb/s9',
                        },
                        {
                            label: 'Semestre 8',
                            to: 'docs/enseirb/s8',
                        },
                        {
                            label: 'Semestre 7',
                            to: 'docs/enseirb/s7',
                        },
                        {
                            label: 'Semestre 6',
                            to: 'docs/enseirb/s6',
                        },
                        {
                            label: 'Semestre 5',
                            to: 'docs/enseirb/s5',
                        },
                    ],
                },
                {
                    type: 'dropdown',
                    label: 'CPBx',
                    position: 'left',
                    items: [
                        {
                            label: 'Semestre 4',
                            to: 'docs/enseirb/s4',
                        },
                        {
                            label: 'Semestre 3',
                            to: 'docs/enseirb/s3',
                        },
                        {
                            label: 'Semestre 2',
                            to: 'docs/enseirb/s2',
                        },
                        {
                            label: 'Semestre 1',
                            to: 'docs/enseirb/s1',
                        }
                    ]
                }
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Social',
                    items: [
                        {label: 'GitHub', href: social.github.href},
                    ],
                },
            ],
        },
        prism: {
            theme: themes.oneLight,
            darkTheme: themes.oneDark,
            additionalLanguages: [
                'bash',
                'json',
                'java',
                'python',
                'php',
                'graphql',
                'rust',
                'toml',
                'protobuf',
            ],
            defaultLanguage: 'python',
            magicComments: [
                {
                    className: 'theme-code-block-highlighted-line',
                    line: 'highlight-next-line',
                    block: {start: 'highlight-start', end: 'highlight-end'},
                },
                {
                    className: 'code-block-error-line',
                    line: 'This will error',
                },
            ],
        },
        liveCodeBlock: {playgroundPosition: 'top'},
        zoom: {
            selector: '.markdown :not(em) > img',
            background: {
                light: 'rgb(255, 255, 255)',
                dark: 'rgb(50, 50, 50)',
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
            'classic',
            {
                docs: {
                    path: 'docs',
                    sidebarPath: 'sidebars.json',
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                },
                theme: {
                    customCss: ['./src/css/custom.scss'],
                },
            } satisfies Preset.Options,
        ],
    ],
    plugins: [
        'docusaurus-plugin-image-zoom',
        'docusaurus-plugin-sass',
        path.resolve(__dirname, './src/plugin/plugin-baidu-tongji'),
        path.resolve(__dirname, './src/plugin/plugin-baidu-push'),
        ['@docusaurus/plugin-ideal-image', {disableInDev: false}],
        [
            '@docusaurus/plugin-pwa',
            {
                debug: true,
                offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
                pwaHead: [
                    {tagName: 'link', rel: 'icon', href: '/img/logo.png'},
                    {tagName: 'link', rel: 'manifest', href: '/manifest.json'},
                    {tagName: 'meta', name: 'theme-color', content: '#12affa'},
                ],
            },
        ],
    ],
    stylesheets: [
        'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css',
        'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css',
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        }
    ],
}

export default config
