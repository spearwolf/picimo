/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const path = require('path');

const colors = require('colors');
const emoji = require('node-emoji');

const isProd = process.env.NODE_ENV === 'production';
const root = process.env.PICIMO_PROJECT_DIR || process.cwd();

if (isProd) {
  console.log(emoji.get('package'), 'production build');
} else {
  console.log(emoji.get('construction'), 'development mode activated');
}

console.log(emoji.get('circus_tent'), 'project dir', colors.green(root));

module.exports = {
  entry: path.join(root, 'src/index.js'),
  output: {
    path: path.resolve(root, 'public'),
    filename: 'bundle.js',
  },
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'eval',
  devServer: {
    port: 3000,
    contentBase: [path.join(root, 'public')],
    watchContentBase: true,
    compress: true,
    host: '0.0.0.0',
    useLocalIp: true,
    disableHostCheck: true,
  },
  stats: 'minimal',
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
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  debug: false,
                  useBuiltIns: 'usage',
                  corejs: {version: 3, proposals: true},
                  bugfixes: true,
                  loose: false,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
    alias: {
      picimo: path.join(__dirname, '../picimo/src'),
      'datgui-context-hook': path.join(__dirname, '../datgui-context-hook/src'),
    },
  },
};
