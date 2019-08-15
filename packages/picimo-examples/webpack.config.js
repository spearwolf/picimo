/* eslint-disable */
// tslint:disable:object-literal-sort-keys
const path = require("path");

const polyfills = ['core-js/stable', 'regenerator-runtime/runtime'];

module.exports = {
  entry: {
    "picimo-examples": [ ...polyfills, "./src/main.js" ],
  },
  output: {
    path: path.resolve(__dirname, "public"),
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    contentBase: [
      "./public",
      "./assets",
      "../../node_modules",
    ],
    watchContentBase: true,
    compress: true,
    host: "0.0.0.0",
    useLocalIp: true,
    disableHostCheck: true,
  },
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
        include: [
          path.resolve('src'),
          /picimo/,
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
      picimo: path.join(__dirname, '../picimo/src'),
    },
  },
};
