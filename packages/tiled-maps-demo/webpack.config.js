/* eslint-disable */
// tslint:disable:object-literal-sort-keys
const path = require("path");

module.exports = {
  entry: {
    "bundle": [ "@babel/polyfill", "./src/main.js" ],
  },
  output: {
    path: path.resolve(__dirname, "public"),
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: [
      "./public",
      "./assets/exports",
    ],
    host: "0.0.0.0",
    useLocalIp: true,
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.m?[jt]s$/,
        include: [
          path.resolve('src'),
          /picimo.core/,
        ],
        // exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: path.resolve('babel.config.js'),
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [ ".ts", ".js", ".json" ],
    alias: {
      '@picimo/core': path.join(__dirname, '../picimo-core/src'),
    },
  },
};
