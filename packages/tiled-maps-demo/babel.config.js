/* eslint-disable */
module.exports = api => {
  api.cache(true);

  const plugins = [
    ["@babel/plugin-proposal-object-rest-spread", { "loose": true, "useBuiltIns": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": false }],
  ];

  const presets = [
    "@babel/preset-typescript",
    ["@babel/preset-env", {
      useBuiltIns: "entry"
    }],
  ];

  return {
    plugins,
    presets,
  };
};
