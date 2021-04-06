/* eslint-disable */
module.exports = (api) => {
  api.cache(true);

  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-decorators', {decoratorsBeforeExport: false}],
    ['@babel/plugin-proposal-class-properties', {loose: false}],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {loose: false, useBuiltIns: true},
    ],
  ];

  const presets = [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
  ];

  return {
    plugins,
    presets,
  };
};
