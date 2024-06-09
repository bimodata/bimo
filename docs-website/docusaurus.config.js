/* eslint-disable camelcase */
// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';
import path from 'path';
import 'dotenv/config';

const defaultLocale = 'fr';

process.env.DOCUSAURUS_CURRENT_LOCALE ??= defaultLocale;

function getSiteTagline() {
  switch (process.env.DOCUSAURUS_CURRENT_LOCALE) {
    case 'en': return 'An Open Source public transit data transformation platform.';
    default: return 'Une plateforme Open Source de transformation de données de transport public.';
  }
}

function isSubPath(subPath, parentPath) {
  const relativePath = path.relative(parentPath, subPath);
  return relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
}

const blogRelPath = './blog';
const examplesRelPath = './examples';
const examplesFullPath = path.resolve(examplesRelPath);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Bimo',
  tagline: getSiteTagline(),
  favicon: 'img/favicon.ico',

  // j'avais réussi à faire marcher sur PC perso avec bimodata.com, mais ça ne marchait toujours pas sur PC SNCF ...
  // je crois que le domaine est vraiment blacklisté sur SNCF - on va essayer un redirect
  url: 'https://bimodata.github.io/',
  baseUrl: '/',

  organizationName: 'bimodata',
  projectName: 'bimodata.github.io',
  deploymentBranch: 'main',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale,
    locales: Array.from(new Set([defaultLocale, 'fr', 'en'])),
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/bimodata/bimo/tree/develop/docs-website',
          editLocalizedFiles: true,
        },
        blog: {
          showReadingTime: true,
          path: blogRelPath,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'Tous nos articles',
          authorsMapPath: '../authors/authors.yml',
        },
        theme: { customCss: './src/css/custom.css' },
      }),
    ],
  ],
  plugins: [
    ['@docusaurus/plugin-content-blog',
      /** @type {import('@docusaurus/plugin-content-blog').Options} */
      ({
        id: 'examples',
        routeBasePath: 'examples',
        path: examplesRelPath,
        showReadingTime: false,
        blogSidebarTitle: 'Tous nos exemples',
        blogSidebarCount: 'ALL',
        authorsMapPath: '../authors/authors.yml',
      }),
    ],
  ],
  markdown: {
    parseFrontMatter: async (params) => {
      const result = await params.defaultParseFrontMatter(params);
      const { filePath } = params;
      const { hide_blog_post_date } = result.frontMatter;

      if (hide_blog_post_date === undefined) {
        const isExample = isSubPath(filePath, examplesFullPath);
        result.frontMatter.hide_blog_post_date = isExample;
      }
      return result;
    },
  },
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/bimo-social-card-fr.jpg',
      navbar: {
        title: 'Bimo',
        hideOnScroll: false,
        logo: {
          alt: 'Logo Bimo',
          src: 'img/bimo-dark-blue.png',
          srcDark: 'img/bimo-light-blue.png',
        },
        items: [
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: '/examples', label: 'Exemples', position: 'left' },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'localeDropdown',
            position: 'right',
            // dropdownItemsAfter: [
            //   {
            //     to: 'https://my-site.com/help-us-translate',
            //     label: 'Help us translate',
            //   },
            // ],
          },
          {
            href: 'mailto:gael.hameon@gmail.com',
            label: 'Contact',
            position: 'right',
          },
          {
            href: 'https://github.com/bimodata/bimo',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            label: 'Blog',
            to: '/blog',
          },
          {
            label: 'Exemples',
            to: '/examples',
          },
          {
            label: 'Documentation',
            to: '/docs/intro',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/bimodata/bimo',
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Gaël Haméon`,
      },
      prism: {
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.vsDark,
      },
    }),
};

export default config;
