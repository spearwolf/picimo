/* eslint-env node */
import fs from 'fs';
import path from 'path';

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

import {sizeSnapshot} from 'rollup-plugin-size-snapshot';
import {terser} from 'rollup-plugin-terser';

import bannerPlugin from './scripts/bannerPlugin';

const extensions = ['.js', '.ts'];

const root = path.resolve(__dirname, '.');
const packageJson = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf-8'),
);

export default {
  input: 'src/index.ts',
  output: {
    name: 'picimo',
    file: path.join(root, 'dist', 'picimo.mjs'),
    sourcemap: true,
    sourcemapFile: path.join(root, 'dist', 'picimo.mjs.map'),
    format: 'esm',
  },
  external: ['three'],
  plugins: [
    bannerPlugin(packageJson), // eslint-disable-line
    commonjs(),
    babel({
      extensions,
      rootMode: 'upward',
      runtimeHelpers: true,
      exclude: 'node_modules/@babel/**',
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            modules: false,
            useBuiltIns: false,
            targets: {
              esmodules: true,
            },
            bugfixes: true,
            loose: true,
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
      output: {comments: /^!/},
    }),
  ],
};
