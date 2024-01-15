import path from 'node:path'
import type {Config} from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import {themes} from 'prism-react-renderer'
import social from './data/social'

const config: Config = {
    title: 'Sébastien Delpeuch',
    url: 'https://delpeuch.net',
    baseUrl: '/',
    favicon: 'img/favicon.ico',
    organizationName: 'sedelpeuch',
    projectName: 'sedelpeuch.net',
    customFields: {
        bio: 'Ingénieur en robotique',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi eget nunc ultricies aliquam. Donec euismod, nisl eget tempor aliquam, nunc nisl ultricies nunc, vitae',
    },
    themeConfig: {
        docs: {
            sidebar: {
                hideable: true,
            },
        },
        navbar: {
            logo: {
                alt: 'navbar',
                src: 'img/logo.webp',
                srcDark: 'img/logo.webp',
            },
            hideOnScroll: true,
            items: [
                {
                    label: 'Project',
                    position: 'right',
                    to: 'project',
                },
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
        tableOfContents: {
            minHeadingLevel: 2,
            maxHeadingLevel: 4,
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
                    sidebarPath: 'sidebars.ts',
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
    ],
}

export default config
