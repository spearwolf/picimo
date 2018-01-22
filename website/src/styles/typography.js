import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import theme from 'typography-theme-parnassus';
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants';
import merge from 'lodash/merge';

import siteConfig from '../../site-config';

theme.plugins = [
  new CodePlugin(),
];

const headerFontFamily = 'PT Sans Caption';
const headerFontWeight = 700;

const bodyFontFamily = 'Merriweather';

theme.googleFonts[0] = {
  name: headerFontFamily,
  styles: [`${headerFontWeight}`],
};
theme.googleFonts[1].name = bodyFontFamily;

Object.assign(theme, {
  baseFontSize: '16px',
  baseLineHeight: 1.6,
  scaleRatio: 1.6,
  paragraphSpacing: 1,
  headerFontFamily: [headerFontFamily, 'sans-serif'],
  headerWeight: headerFontWeight,
  bodyFontFamily: [bodyFontFamily, 'serif'],
  bodyColor: siteConfig.colors.text.normal,
  headerColor: siteConfig.colors.text.header,
});

const origOverrideStyles = theme.overrideStyles;

theme.overrideStyles = (...args) => merge(origOverrideStyles(...args), {
  a: {
    color: siteConfig.colors.text.link,
    boxShadow: 'none',
  },
  'tt,code': {
    backgroundColor: siteConfig.colors.text.preformattedBg,
  },
  pre: {
    backgroundColor: siteConfig.colors.text.preformattedBg,
  },
  blockquote: {
    color: siteConfig.colors.text.blockquote,
    borderColor: siteConfig.colors.text.blockquoteBorder,
  },
  [MOBILE_MEDIA_QUERY]: {
    blockquote: {
      borderColor: siteConfig.colors.text.blockquoteBorder,
    },
  },
});

export default new Typography(theme);
