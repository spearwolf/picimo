/* eslint-env node */
console.log('🚀 babel.config.js');

module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-decorators', {decoratorsBeforeExport: false}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {loose: true, useBuiltIns: true},
    ],
  ],
};
