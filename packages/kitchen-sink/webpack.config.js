/* eslint-disable */
// tslint:disable:object-literal-sort-keys
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const webpack = require('webpack');
const express = require('express');

const picimoPackageJson = require('../picimo/package.json');

const polyfills = ['core-js/stable', 'regenerator-runtime/runtime'];

const demosJson = require('./demos.json');

// =================================================

const entries = {};

demosJson.forEach((section) => {
  section.demos.forEach(({id, entry}) => {
    if (id && entry) {
      entries[id] = [...polyfills, entry];
    }
  });
});

// =================================================

const examples = glob
  .sync('../../examples/*/package.json')
  .map((packageJsonPath) => JSON.parse(fs.readFileSync(packageJsonPath)))
  .filter(({picimo}) => picimo)
  .map(({picimo: {id, title, url, public, sourceUrl}}) => ({
    id: id ?? title.replace(/[#.\s]*/g, ''),
    title,
    url,
    public,
    sourceUrl,
  }));

console.log(
  'serve examples:',
  examples.map((example) => example.title),
);

// =================================================

module.exports = {
  entry: {
    ...entries,
    'picimo-examples': [...polyfills, './src/main.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  mode: 'development',
  devtool: 'eval',
  devServer: {
    port: 3000,
    contentBase: ['./public', '../picimo', '../../node_modules'],
    after: function (app) {
      examples.forEach((example) => {
        app.use(
          example.url,
          express.static(
            path.resolve(__dirname, `../../examples/${example.public}`),
          ),
        );
      });
    },
    watchContentBase: true,
    compress: true,
    host: '0.0.0.0',
    useLocalIp: true,
    disableHostCheck: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      PACKAGE_VERSION: JSON.stringify(`${picimoPackageJson.version}-dev`),
      EXAMPLES: JSON.stringify({section: 'Examples', demos: examples}),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
          publicPath: '/',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS
        ],
      },
      {
        test: /\.m?[jt]s$/,
        include: [path.resolve('src'), /picimo/],
        // exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve('babel.config.js'),
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      picimo: path.join(__dirname, '../picimo/src'),
    },
  },
};
