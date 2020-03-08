/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const path = require('path');

const emoji = require('node-emoji');

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  console.log(emoji.get('package'), 'production build is enabled');
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'eval',
  devServer: {
    port: 3000,
    contentBase: ['./public'],
    watchContentBase: true,
    compress: true,
    host: '0.0.0.0',
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
        test: /\.[jt]s?$/,
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
    extensions: ['.ts', '.js', '.json'],
    alias: {
      picimo: path.join(__dirname, '../../packages/picimo/src'),
      'picimo-r3f': path.join(__dirname, '../../packages/picimo-r3f/src'),
    },
  },
};
