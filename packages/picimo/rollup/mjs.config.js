/* eslint-env node */
import path from 'path';

import {name, outputDir, external, makePlugins} from './shared.config';

export default {
  input: 'src/index.ts',
  output: {
    name,
    file: path.join(outputDir, `${name}.mjs`),
    sourcemap: true,
    sourcemapFile: path.join(outputDir, `${name}.mjs.map`),
    format: 'esm',
  },
  external,
  plugins: makePlugins({
    babel: {
      presets: {
        '@babel/preset-env': {
          targets: {
            esmodules: true,
          },
        },
      },
    },
  }),
};
