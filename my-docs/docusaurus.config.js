// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Zeotap SDK',
  tagline: '',
  favicon: 'img/zeotap_favicon.png',

  // Set the production url of your site here
  // url: 'https://your-docusaurus-site.example.com',
  // // Set the /<baseUrl>/ pathname under which your site is served
  // // For GitHub pages deployment, it is often '/<projectName>/'
  // baseUrl: '/',

  url: 'https://rishabh-zeo.github.io/', // Your GitHub username or org name here
  baseUrl: '/zeotap-web-sdk-docs/', // *** The name of your GitHub repository ***


  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rishabh-zeo', // Usually your GitHub org/user name.
  projectName: 'zeotap-web-sdk-docs', // Usually your repo name.

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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          path: './blog',
          routeBasePath: 'release-notes', 
          blogTitle: 'Release Notes',
          blogDescription: 'All product updates and changes',
          blogSidebarTitle: 'All Versions',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '',
        logo: {
          alt: 'Zeotap',
          src: 'img/zeotap_logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'DocumentationSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/release-notes', 
            label: 'Release Notes', 
            position: 'left'
          },
          {
            href: 'https://github.com/zeotap',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
              {
                label: 'Release Notes',
                to: '/releaseNotes',
              },
            ],
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Zeotap. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
