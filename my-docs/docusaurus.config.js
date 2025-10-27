// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Zeotap SDK Docs',
  tagline: '',
  favicon: 'img/zeotap_favicon.png',

  // Set the production url of your site here
  // url: 'https://your-docusaurus-site.example.com',
  // // Set the /<baseUrl>/ pathname under which your site is served
  // // For GitHub pages deployment, it is often '/<projectName>/'
  // baseUrl: '/',

  url: 'https://sdkdocs.zeotap.com/', 
  baseUrl: '/',


  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zeotap', // Usually your GitHub org/user name.
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
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'websdk',
        path: 'docs/websdk',
        routeBasePath: 'websdk/docs',
        sidebarPath: './sidebars.js',
        breadcrumbs: true,
        showLastUpdateTime: true
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'websdk-releases',
        path: 'release-notes/websdk',
        routeBasePath: 'websdk/release-notes',
        blogTitle: 'WebSDK Release Notes',
        blogDescription: 'WebSDK product updates and changes',
        blogSidebarTitle: 'Recent Releases',
        blogSidebarCount: 'ALL',
        showReadingTime: false,
        postsPerPage: 'ALL',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'gtm',
        path: 'docs/gtm',
        routeBasePath: 'gtm/docs',
        sidebarPath: './sidebars.js',
        breadcrumbs: true,
        showLastUpdateTime: true
      },
    ],
    // [
    //   '@docusaurus/plugin-content-blog',
    //   {
    //     id: 'gtm-releases',
    //     path: 'release-notes/gtm',
    //     routeBasePath: 'gtm/release-notes',
    //     blogTitle: 'GTM Release Notes',
    //     blogDescription: 'GTM integration updates and changes',
    //     blogSidebarTitle: 'Recent Releases',
    //     blogSidebarCount: 'ALL',
    //     showReadingTime: false,
    //     postsPerPage: 'ALL',
    //   },
    // ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'adobe',
        path: 'docs/adobe',
        routeBasePath: 'adobeLaunch/docs',
        sidebarPath: './sidebars.js',
        breadcrumbs: true,
        showLastUpdateTime: true
      },
    ],
    // [
    //   '@docusaurus/plugin-content-blog',
    //   {
    //     id: 'adobe-releases',
    //     path: 'release-notes/adobe',
    //     routeBasePath: 'adobeLaunch/release-notes',
    //     blogTitle: 'Adobe Launch Release Notes',
    //     blogDescription: 'Adobe Launch integration updates and changes',
    //     blogSidebarTitle: 'Recent Releases',
    //     blogSidebarCount: 'ALL',
    //     showReadingTime: false,
    //     postsPerPage: 'ALL',
    //   },
    // ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'iossdk',
        path: 'docs/iossdk',
        routeBasePath: 'iossdk/docs',
        sidebarPath: './sidebars.js',
        breadcrumbs: true,
        showLastUpdateTime: true
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'iossdk-releases',
        path: 'release-notes/iossdk',
        routeBasePath: 'iossdk/release-notes',
        blogTitle: 'iOS SDK Release Notes',
        blogDescription: 'iOS SDK product updates and changes',
        blogSidebarTitle: 'Recent Releases',
        blogSidebarCount: 'ALL',
        showReadingTime: false,
        postsPerPage: 'ALL',
        onUntruncatedBlogPosts: 'ignore',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'reactnativesdk',
        path: 'docs/reactnativesdk',
        routeBasePath: 'reactnativesdk/docs',
        sidebarPath: './sidebars.js',
        breadcrumbs: true,
        showLastUpdateTime: true
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'reactnativesdk-releases',
        path: 'release-notes/reactnativesdk',
        routeBasePath: 'reactnativesdk/release-notes',
        blogTitle: 'React Native SDK Release Notes',
        blogDescription: 'React Native SDK product updates and changes',
        blogSidebarTitle: 'Recent Releases',
        blogSidebarCount: 'ALL',
        showReadingTime: false,
        postsPerPage: 'ALL',
        onUntruncatedBlogPosts: 'ignore',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/zeotap_logo.svg',
      navbar: {
        title: '',
        logo: {
          alt: 'Zeotap',
          src: 'img/zeotap_logo.svg',
        },
        items: [
          {
            position: 'left',
            label: 'WebSDK',
            items: [
              {
                label: 'Documentation',
                to: '/websdk/docs/intro',
              },
              {
                label: 'Release Notes',
                to: '/websdk/release-notes',
              },
            ],
          },
          {
            position: 'left',
            label: 'GTM',
            items: [
              {
                label: 'Documentation',
                to: '/gtm/docs/intro',
              },
              // {
              //   label: 'Release Notes',
              //   to: '/gtm/release-notes',
              // },
            ],
          },
          {
            position: 'left',
            label: 'Adobe',
            items: [
              {
                label: 'Documentation',
                to: '/adobeLaunch/docs/intro',
              },
              // {
              //   label: 'Release Notes',
              //   to: '/adobeLaunch/release-notes',
              // },
            ],
          },
          {
            position: 'left',
            label: 'iOS SDK',
            items: [
              {
                label: 'Documentation',
                to: '/iossdk/docs/intro',
              },
              {
                label: 'Release Notes',
                to: '/iossdk/release-notes',
              },
            ],
          },
          {
            position: 'left',
            label: 'React Native SDK',
            items: [
              {
                label: 'Documentation',
                to: '/reactnativesdk/docs/intro',
              },
              {
                label: 'Release Notes',
                to: '/reactnativesdk/release-notes',
              },
            ],
          },
          {
            href: 'https://github.com/zeotap/zeotap-web-sdk-docs/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'WebSDK',
            items: [
              {
                label: 'Documentation',
                to: '/websdk/docs/intro',
              },
              {
                label: 'Release Notes',
                to: '/websdk/release-notes',
              },
            ],
          },
          {
            title: 'GTM',
            items: [
              {
                label: 'Documentation',
                to: '/gtm/docs/intro',
              },
              {
                label: 'Release Notes',
                to: '/gtm/release-notes',
              },
            ],
          },
          {
            title: 'iOS SDK',
            items: [
              {
                label: 'Documentation',
                to: '/iossdk/docs/intro',
              },
              {
                label: 'Release Notes',
                to: '/iossdk/release-notes',
              },
            ],
          },
          {
            title: 'React Native SDK',
            items: [
              {
                label: 'Documentation',
                to: '/reactnativesdk/docs/intro',
              },
              {
                label: 'Release Notes',
                to: '/reactnativesdk/release-notes',
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
