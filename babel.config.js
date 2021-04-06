/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-env node */
const emoji = require('node-emoji');

console.log(emoji.get('loudspeaker'), 'babel.config.js');

module.exports = {
  // presets: ['@babel/preset-typescript', '@babel/preset-react'],
  presets: ['@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['@babel/plugin-proposal-decorators', {decoratorsBeforeExport: false}],
    ['@babel/plugin-proposal-class-properties', {loose: false}],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {loose: false, useBuiltIns: true},
    ],
  ],
};
