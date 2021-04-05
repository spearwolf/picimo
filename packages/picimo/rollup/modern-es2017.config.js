/* eslint-env node */
import path from 'path';

import typescript from '@rollup/plugin-typescript';

import {
  name,
  outputDir,
  makePlugins,
  makeVersionWithBuild,
} from './shared.config';

export default {
  input: 'src/index.ts',
  output: {
    name,
    file: path.join(outputDir, `${name}.js`),
    sourcemap: true,
    sourcemapFile: path.join(outputDir, `${name}.js.map`),
    format: 'esm',
  },
  external: ['eventize-js', 'three', /\/node_modules\/three\//],
  plugins: [typescript(), ...makePlugins(makeVersionWithBuild('es2017'))],
};
