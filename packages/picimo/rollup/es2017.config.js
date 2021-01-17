/* eslint-env node */
import path from 'path';

import typescript from '@rollup/plugin-typescript';

import {name, outputDir, external, makePlugins} from './shared.config';

export default {
  input: 'src/index.ts',
  output: {
    name,
    file: path.join(outputDir, `${name}.js`),
    sourcemap: true,
    sourcemapFile: path.join(outputDir, `${name}.js.map`),
    format: 'esm',
  },
  external,
  plugins: [
    typescript(),
    ...makePlugins({
      babel: false,
    }),
  ],
};
