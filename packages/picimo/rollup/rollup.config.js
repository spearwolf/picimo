/* eslint-env node */
import path from 'path';

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import {sizeSnapshot} from 'rollup-plugin-size-snapshot';
import {terser} from 'rollup-plugin-terser';

import createBannerPlugin from './bannerPlugin';
import {makeVersionWithBuild} from './makeVersionWithBuild';
import {rewriteExternalsPlugin} from './rewriteExternalsPlugin';

const projectDir = path.resolve(path.join(path.dirname(__filename), '..'));
const outputDir = projectDir;

const packageJson = require(path.join(projectDir, 'package.json'));
const {name} = packageJson;
const version = makeVersionWithBuild('es2017')(packageJson.version);

const extensions = ['.js', '.ts', '.json'];

export default {
  input: 'src/index.ts',
  output: {
    name,
    file: path.join(outputDir, `${name}.js`),
    sourcemap: true,
    sourcemapFile: path.join(outputDir, `${name}.js.map`),
    format: 'esm',
  },
  plugins: [
    rewriteExternalsPlugin([
      /^@babel\/runtime/,
      'eventize-js',
      'three',
      /^three\/examples\/jsm/,
      [/three\.module/, 'three'],
    ]),
    typescript(),
    createBannerPlugin({...packageJson, version}),
    commonjs(),
    resolve({
      extensions,
    }),
    babel({
      extensions,
      rootMode: 'upward',
      babelHelpers: 'runtime',
      exclude: [/\/core-js\//, 'node_modules/@babel/**'],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: {version: 3, proposals: true},
          },
        ],
      ],
    }),
    replace({
      preventAssignment: true,
      NODE_ENV: JSON.stringify('production'),
      PACKAGE_VERSION: JSON.stringify(version),
      'log.VERBOSE': 'false',
      'log.DEBUG': 'false',
    }),
    terser({
      output: {comments: /^!/},
    }),
    sizeSnapshot(),
  ],
};
