import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'SSV',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.ssv.network/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ssvlabs', // Usually your GitHub org/user name.
  projectName: 'ssv-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          editUrl:
            'https://github.com/ssvlabs/gitbook-docs/tree/main/',
          showLastUpdateTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-PYFERXZQP7',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'SSV Docs Logo',
        src: 'img/ssv_docs_w.avif',
        srcDark: 'img/ssv_docs.png',
      },
      items: [
        {to: '/learn/introduction', label: 'Learn', position: 'left'},
        {to: '/developers/', label: 'Developers', position: 'left'},
        {to: '/stakers/', label: 'Stakers', position: 'left'},
        {to: '/operators/', label: 'Operators', position: 'left'},
        {
          href: 'https://github.com/ssvlabs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'SSV',
          items: [
            {
              label: 'SSV Network',
              href: 'https://ssv.network/',
            },
            {
              label: 'SSV Labs',
              href: 'https://ssvlabs.io/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/5vT22pRBrf',
            },
            {
              label: 'Twitter',
              href: 'https://x.com/ssv_network',
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/c/SSVnetwork',
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: 'YXTLMSGB48',
      // Public API key: it is safe to commit it
      apiKey: '085fa557da240e5496727edfb32e2fb9',
      indexName: 'ssv',
    },
  } satisfies Preset.ThemeConfig,
    plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['html'],
        createRedirects(existingPath) {
          console.log('[Redirect plugin] Existing path:', existingPath);
          const redirectFolders: Record<string, string> = {
            '/operators/operator-node/setup-sidecars/enabling-dkg': '/operators/operator-node/node-setup/enabling-dkg',
          };
          const redirectFiles: Record<string, string> = {
            '/operators/operator-node/setup-sidecars/configuring-mev': '/operators/operator-node/node-setup/configuring-mev',
            '/operators/operator-node/setup-sidecars/configuring-primev': '/operators/operator-node/node-setup/configuring-primev',
            '/developers/quickstart':'/developers/SSV-SDK/examples/bulk-register-validators'
          };
          for (const [newPath, oldPath] of Object.entries(redirectFolders)) {
            if (existingPath === newPath || existingPath.startsWith(`${newPath}/`)) {
              const subPath = existingPath.slice(newPath.length);
              const fromPath = `${oldPath}${subPath}`;
              console.log(`[Redirect plugin] Redirecting folder: ${fromPath} → ${existingPath}`);
              return [fromPath];
            }
          }
          if (redirectFiles[existingPath]) {
            const from = redirectFiles[existingPath];
            console.log(`[Redirect plugin] Redirecting file: ${from} → ${existingPath}`);
            return [from];
          }
          return undefined;
        },
      },
    ],
  ]
};

export default config;
