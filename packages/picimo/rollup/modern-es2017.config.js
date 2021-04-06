/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
/* eslint-env node */
import path from 'path';

import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';

import {
  name,
  extensions,
  outputDir,
  makePlugins,
  makeVersionWithBuild,
} from './shared.config';

const EXTERNALS = [
  [/^@babel\/runtime/, null],
  [/^eventize-js/, null],
  [/^three$/, null],
  [/^three\/examples\/jsm/, null],
  [/three\.module/, 'three'],
];

function rollupPluginPicimoExternals() {
  return {
    name: 'rollup-plugin-picimo-externals',
    resolveId(source) {
      for (const [regex, id] of EXTERNALS) {
        if (regex.test(source)) {
          return {id: id ?? source, external: true};
        }
      }
      return null;
    },
  };
}

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
    rollupPluginPicimoExternals(),
    typescript(),
    ...makePlugins(makeVersionWithBuild('es2017'), () =>
      babel({
        extensions,
        rootMode: 'upward',
        runtimeHelpers: true,
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
    ),
  ],
};
