// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/blitpunk.js',
  format: 'umd',
  sourceMap: false,
  moduleName: 'blitpunk',
  plugins: [
    resolve({
      extensions: [ '.js', '.json' ],
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      // include: 'node_modules/**',  // Default: undefined
      sourceMap: false
    }),
    babel({
      babelrc: false,
      presets: [
        ["env", {
          modules: false,
          targets: {
            browsers: [
              "safari >= 10",
              "ios_saf >= 10",
              "firefox >= 52",
              "chrome >= 60"
            ]
          }
        }]
      ],
      exclude: 'node_modules/**' // only transpile our source code
    })
  ],
  dest: 'dist/blitpunk.js' // equivalent to --output
};
