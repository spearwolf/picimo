import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import theme from 'typography-theme-parnassus';
import merge from 'lodash/merge';

theme.plugins = [
  new CodePlugin(),
];

// overwrite font for headlines
theme.googleFonts[0] = {
  name: 'Lobster',
  styles: ['400'],
};

theme.headerFontFamily = ['Lobster', 'sans-serif'];

const origOverrideStyles = theme.overrideStyles;

theme.overrideStyles = (...args) => merge(origOverrideStyles(...args), {
  a: {
    // we don't wanna underline/hover styles for links
    boxShadow: 'none',
  },
});

export default new Typography(theme);
