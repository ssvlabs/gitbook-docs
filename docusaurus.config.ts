import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SSV',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ssvlabs', // Usually your GitHub org/user name.
  projectName: 'ssv-docs', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',

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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
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
        {to: '/build/', label: 'Build', position: 'left'},
        {to: '/stakers/', label: 'Stakers', position: 'left'},
        {to: '/operators/', label: 'Operators', position: 'left'},
        {to: '/based-applications/', label: 'Based Applications', position: 'left'},
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
              href: 'https://discord.com/invite/ssvnetworkofficial',
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
  } satisfies Preset.ThemeConfig,
};

export default config;
