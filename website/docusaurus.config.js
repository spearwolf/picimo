// eslint-disable-next-line no-undef
module.exports = {
  title: 'picimo.js',
  tagline: 'Pictures in Motion',
  url: 'https://github.com/spearwolf/picimo',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'spearwolf', // Usually your GitHub org/user name.
  projectName: 'picimo', // Usually your repo name.
  themeConfig: {
    disableDarkMode: true,
    navbar: {
      title: 'picimo',
      logo: {
        alt: 'picimo nobinger avatar',
        src: 'img/picimo-logo256.png',
      },
      links: [
        {
          to: 'docs/Introduction',
          activeBasePath: 'docs',
          label: 'docs',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      // style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Style Guide',
        //       to: 'docs/doc1',
        //     },
        //     {
        //       label: 'Second Doc',
        //       to: 'docs/doc2',
        //     },
        //   ],
        // },
        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            // },
            // {
            //   label: 'Discord',
            //   href: 'https://discordapp.com/invite/docusaurus',
            // },
            {
              label: 'Twitter',
              href: 'https://twitter.com/spearwolf',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/spearwolf/picimo',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Wolfger Schramm. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/spearwolf/picimo/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/spearwolf/picimo/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
