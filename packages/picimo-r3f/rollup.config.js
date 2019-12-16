/* eslint-env node */
import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

import bannerPlugin from './scripts/bannerPlugin';

const extensions = [
  '.js',
  '.jsx',
  '.ts',
  '.jsx',
];

const root = path.resolve(__dirname, '.');
const packageJson = require(path.join(root, 'package.json'))

export default {
  input: 'src/index.ts',
  output: {
    name: 'picimo_r3f',
    file: path.join(root, 'dist', 'picimo-r3f.min.js'),
    sourcemap: true,
    sourcemapFile: path.join(root, 'dist', 'picimo-r3f.min.js.map'),
    format: 'umd',
    globals: {
      three: 'THREE',
      picimo: 'picimo',
      react: 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
    },
  },
  external: [
    'three',
    'picimo',
    'react',
    'react-dom',
    'prop-types',
  ],
  plugins: [
    bannerPlugin(packageJson), // eslint-disable-line
    commonjs(),
    babel({
      extensions,
      runtimeHelpers: true,
      exclude: 'node_modules/@babel/**',
      presets: [
        [
          '@babel/preset-env', {
            debug: false,
            modules: false,
            useBuiltIns: false,
          },
        ],
      ],
    }),
    resolve({
      extensions,
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    replace({
      NODE_ENV: JSON.stringify('production'),
      PACKAGE_VERSION: JSON.stringify(packageJson.version),
    }),
    sizeSnapshot(),
    terser({
      output: { comments: /^!/ },
    }),
  ],
};
