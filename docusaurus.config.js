// @ts-check

const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

// Automatically detect the repository name for GitHub Pages deployment (e.g. in forks)
const githubRepository = (process.env.GITHUB_REPOSITORY || '').trim();
const parts = githubRepository ? githubRepository.split('/') : [];
const [organizationName, projectName] = parts.length === 2
  ? parts
  : ['docwire', 'docwire.io']; // Default to main repo

const currentBranch = process.env.CURRENT_BRANCH || 'master';

// Production settings for the main repository
const isProd = githubRepository === 'docwire/docwire.io';
const prodUrl = 'https://docwire.io';
const prodBaseUrl = '/';

// Fallback settings for forks and local development
const devUrl = `https://${organizationName}.github.io`;
const devBaseUrl = `/${projectName}/`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Docwire',
  tagline: 'Award-winning modern data processing in C++20',
  favicon: 'img/FaviconLogo.png',

  // Set the URL and base URL depending on the environment
  url: isProd ? prodUrl : devUrl,
  baseUrl: isProd ? prodBaseUrl : devBaseUrl,

  // GitHub pages deployment config.
  organizationName, // Your GitHub username
  projectName, // Your repo name

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

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
        blog: {
          showReadingTime: true,
          editUrl:
            `https://github.com/${organizationName}/${projectName}/tree/${currentBranch}/`,
          beforeDefaultRemarkPlugins: [
            require('./src/plugins/remark-youtube'),
            require('./src/plugins/remark-static-images'),
          ],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        pages: {
          beforeDefaultRemarkPlugins: [
            require('./src/plugins/remark-youtube'),
            require('./src/plugins/remark-static-images'),
          ],
        },
        gtag: {
          trackingID: isProd ? 'G-KEVHQDD6GK' : 'G-0000000000',
          anonymizeIP: true,
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'tech-dive',
        routeBasePath: 'tech-dive',
        path: './tech-dive',
        showReadingTime: true,
        beforeDefaultRemarkPlugins: [
          require('./src/plugins/remark-youtube'),
          require('./src/plugins/remark-static-images'),
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Docwire Logo',
          src: 'img/logoDocWire.JPG',
        },
        items: [
          { to: '/about-us', label: 'About Us', position: 'left' },
          { to: '/showcases', label: 'Showcases', position: 'left' },
          {
            href: 'https://docwire.readthedocs.io/',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/docwire/docwire/releases',
            label: 'Download',
            position: 'left',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: '/tech-dive', label: 'Tech Dive', position: 'left' },
          { to: '/contact-us', label: 'Contact Us', position: 'right', className: 'button-pill nav-cta' },
          {
            href: 'https://github.com/docwire/docwire',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Legal',
            items: [
              {
                label: 'Privacy Policy',
                to: '/privacy',
              },
              {
                label: 'Terms of Use',
                to: '/terms-of-service',
              },
            ],
          },
        ],
        copyright: `© DocWire SDK<br/>© SILVERCODERS Ltd.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;