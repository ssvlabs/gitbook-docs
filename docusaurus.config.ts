import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const subtreeRedirects: Record<string, string> = {
  '/operators/operator-node/setup-sidecars/enabling-dkg': '/operators/operator-node/node-setup/enabling-dkg',
  '/developers/examples': '/developers/SSV-SDK/examples',
  '/stakers/tools/ssv-dkg-client': '/developers/tools/ssv-dkg-client',
  '/learn/network-overview/performance': '/learn/performance',
  '/learn/network-overview/operators': '/operators/operator-onboarding',
  '/learn/network-overview/clusters': '/stakers/clusters',
  '/learn/network-overview/validators': '/stakers/validators',
};

const explicitRedirects = [
  {
    to: '/operators/operator-node/setup-sidecars/configuring-mev',
    from: ['/operators/operator-node/node-setup/configuring-mev'],
  },
  {
    to: '/operators/operator-node/setup-sidecars/configuring-primev',
    from: ['/operators/operator-node/node-setup/configuring-primev'],
  },
  {
    to: '/developers/integration-guides/',
    from: [
      '/developers/integration-guides/staking-pools',
      '/developers/integration-guides/staking-pools/initialization-stage',
      '/developers/integration-guides/staking-pools/maintenance-stage',
      '/developers/integration-guides/staking-pools/operation-stage',
      '/developers/integration-guides/staking-services',
    ],
  },
  {
    to: '/developers/examples/',
    from: ['/developers/code-examples-and-snippets'],
  },
  {
    to: '/learn/security/keyshares-structure',
    from: ['/developers/keyshares-structure'],
  },
  {
    to: '/learn/security/audits',
    from: ['/developers/security'],
  },
  {
    to: '/developers/api/ssv-api',
    from: ['/developers/tools/ssv-api'],
  },
  {
    to: '/stakers/tools/ssv-keys',
    from: ['/developers/tools/ssv-keys'],
  },
  {
    to: '/stakers/tools/ssv-scanner',
    from: ['/developers/tools/ssv-scanner'],
  },
  {
    to: '/developers/api/ssv-subgraph',
    from: ['/developers/tools/ssv-subgraph'],
  },
  {
    to: '/developers/api/subgraph-examples',
    from: ['/developers/tools/ssv-subgraph/subgraph-examples'],
  },
  {
    to: '/developers/api/',
    from: ['/developers/tools'],
  },
  {
    to: '/learn/network-overview/',
    from: [
      '/learn/protocol-overview',
      '/learn/introduction/network-overview',
    ],
  },
  {
    to: '/learn/network-overview/governance',
    from: ['/learn/introduction/governance'],
  },
  {
    to: '/learn/network-overview/oracles',
    from: ['/learn/introduction/oracles'],
  },
  {
    to: '/learn/tokenomics/',
    from: ['/learn/introduction/ssv-token'],
  },
  {
    to: '/learn/tech-overview',
    from: ['/learn/introduction/tech-overview'],
  },
  {
    to: '/stakers/validator-offboarding/exiting-a-validator',
    from: ['/stakers/cluster-management/exiting-a-validator'],
  },
  {
    to: '/stakers/validator-offboarding/removing-a-validator',
    from: ['/stakers/cluster-management/removing-a-validator'],
  },
  {
    to: '/stakers/validator-offboarding/withdrawing-eth',
    from: [
      '/stakers/cluster-management/withdrawing-eth',
      '/stakers/cluster-management/withdrawing-ssv',
    ],
  },
  {
    to: '/stakers/cluster-management/depositing-eth',
    from: ['/stakers/cluster-management/depositing-ssv'],
  },
  {
    to: '/stakers/validator-onboarding/',
    from: ['/stakers/validator-management'],
  },
  {
    to: '/stakers/solo-stakers/creating-a-new-validator',
    from: [
      '/stakers/validator-management/creating-a-new-validator',
      '/stakers/validator-management/dkg-ceremony',
    ],
  },
  {
    to: '/stakers/solo-stakers/distributing-a-validator',
    from: ['/stakers/validator-management/distributing-a-validator'],
  },
  {
    to: '/stakers/cluster-management/setting-fee-recipient-address',
    from: ['/stakers/validator-management/setting-fee-recipient-address'],
  },
  {
    to: '/learn/network-overview/clusters/cluster-creation',
    from: ['/stakers/validators/validator-onboarding'],
  },
  {
    to: '/learn/network-overview/clusters/update-operators',
    from: ['/stakers/validators/update-operators'],
  },
];

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
  markdown: {
      hooks: {
        onBrokenMarkdownLinks: 'warn', // or 'throw' / 'ignore'
        onBrokenMarkdownImages: 'warn', 
      },
    },
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
        {to: '/ssv-staking/', label: 'SSV Staking', position: 'left'},
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
        redirects: explicitRedirects,
        createRedirects(existingPath) {
          const normalizedPath =
            existingPath !== '/' && existingPath.endsWith('/')
              ? existingPath.slice(0, -1)
              : existingPath;

          for (const [newPath, oldPath] of Object.entries(subtreeRedirects)) {
            if (
              normalizedPath === newPath ||
              normalizedPath.startsWith(`${newPath}/`)
            ) {
              const subPath = normalizedPath.slice(newPath.length);
              return [`${oldPath}${subPath}`];
            }
          }

          return undefined;
        },
      },
    ],
  ]
};

export default config;
