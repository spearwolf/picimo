import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import theme from 'typography-theme-parnassus';
import oc from 'open-color/open-color.json';
import merge from 'lodash/merge';

theme.plugins = [
  new CodePlugin(),
];

// overwrite font for headlines
theme.googleFonts[0] = {
  name: 'Inconsolata',
  styles: ['700'],
};
theme.googleFonts[1].name = 'Inconsolata';

Object.assign(theme, {
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  scaleRatio: 2.0,
  paragraphSpacing: 1,
  headerFontFamily: ['Inconsolata', 'sans-serif'],
  bodyFontFamily: ['Inconsolata', 'serif'],
});

const origOverrideStyles = theme.overrideStyles;

theme.overrideStyles = (...args) => merge(origOverrideStyles(...args), {
  a: {
    boxShadow: 'none',
  },
  'tt,code': {
    backgroundColor: oc.gray[1],
  },
  pre: {
    backgroundColor: oc.gray[1],
  },
});

export default new Typography(theme);
