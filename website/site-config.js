import oc from 'open-color/open-color.json';

export default {
  page: {
    htmlTitle: 'picimo',
    description: 'picimo website',
    keywords: ['javascript', 'webgl'],
    author: 'Wolfger Schramm <wolfger@spearwolf.de>',
  },
  colors: {
    page: {
      background: oc.gray[0],
    },
    text: {
      normal: oc.gray[7],
      link: oc.blue[9],
      header: oc.gray[8],
      tagTitle: oc.pink[7],
      preformattedBg: oc.gray[1],
      blockquote: oc.gray[6],
      blockquoteBorder: oc.gray[2],
    },
  },
  styles: {
    mainContentMaxWidth: '1200px',
    pageMarginH: '3rem',
    headerHeight: '55px',
    sidebarWidth: '12rem',
  },
};
