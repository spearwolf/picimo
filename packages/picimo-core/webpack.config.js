/* eslint-env node */
const webpack = require('webpack');
const packageJson = require('./package.json');

const corejs = ['core-js/stable', 'regenerator-runtime/runtime'];

module.exports = {
  mode: 'development',
  devtool: 'source-maps',
  entry: {
    'version.bundle': [...corejs, './examples/src/version.js'],
    'hello-three-canvas.bundle': [...corejs, './examples/src/helloThreeCanvas.js'],
    'sprite-group-buffer-geometry.bundle': [...corejs, './examples/src/spriteGroupBufferGeometry.js'],
    'textured-sprites.bundle': [...corejs, './examples/src/texturedSprites.js'],
    'instanced-sprites.bundle': [...corejs, './examples/src/instancedSprites.js'],
    'instanced-geometry.bundle': [...corejs, './examples/src/instancedGeometry.js'],
    'bitmap-font.bundle': [...corejs, './examples/src/bitmapFont.js'],
    'simple-sprites.bundle': [...corejs, './examples/src/simpleSprites.js'],
  },
  devServer: {
    port: 3000,
    contentBase: [
      './examples',
      './dist',
      './node_modules',
    ],
    watchContentBase: true,
    compress: true,
    host: '0.0.0.0',
    open: true,
    useLocalIp: true,
    disableHostCheck: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      PACKAGE_VERSION: JSON.stringify(`${packageJson.version}-dev`),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                debug: true,
                useBuiltIns: 'entry',
                corejs: 3,
              }],
            ],
          },
        },
      },
    ],
  },
};
