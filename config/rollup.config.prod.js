import autoprefixer from 'autoprefixer'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import sass from 'node-sass'

export default {
  entry: 'src/blitpunk.js',
  format: 'umd',
  sourceMap: false,
  moduleName: 'blitpunk',
  plugins: [
    postcss({
      preprocessor: (content, id) => new Promise((resolve, reject) => {
        const result = sass.renderSync({ file: id })
        resolve({ code: result.css.toString() })
      }),
      plugins: [
        autoprefixer
      ],
      sourceMap: false,
      extract: true,
      extensions: ['.scss', '.css']
    }),
    resolve({
      extensions: [ '.js', '.json' ],
      customResolveOptions: {
        moduleDirectory: '.'
      }
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
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
}
