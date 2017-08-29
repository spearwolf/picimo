#!/usr/bin/env node
const path = require('path')
const colors = require('colors')
const shelljs = require('shelljs')
const program = require('commander')

const VARIANTS = ['legacy', 'safari', 'modern', /* should be always the last --> */'bootstrap']

const PROJECT_DIR = path.join(__dirname, '..')
const WEBPACK = path.join(PROJECT_DIR, 'node_modules', '.bin', 'webpack')
const UGLIFYJS = path.join(PROJECT_DIR, 'node_modules', '.bin', 'uglifyjs')

const VALID_VARIANTS = `Valid variants are:${VARIANTS.map(v => `\n - ${colors.bold(v)}`).join('')}`

program
  .version('0.1.1')
  .usage('[<options>...]')
  .option('--variant <value>', 'Build library for a variant')
  .option('-l, --list', 'List all valid variants')
  .option('-D, --development', 'build for development (default: production and development)')
  .option('-P, --production', 'build for production (default: production and development)')
  .parse(process.argv)

if (program.list) {
  console.log(VALID_VARIANTS)
  process.exit()
}

const { variant } = program

const buildBoth = !!(program.development && program.production) || (!program.development && !program.production)
const buildDev = !!program.development || buildBoth
const buildProd = !!program.production || buildBoth

if (variant && !VARIANTS.includes(variant)) {
  err(1, 'unknown variant:', colors.bold.blue(variant), `\n${VALID_VARIANTS}`)
}

function build (variant, dev) {
  banner('Building library variant:', colors.bold.red(variant), colors.bold(dev ? '(development)' : '(production)'))
  shelljs.exec(`${WEBPACK} --config ${PROJECT_DIR}/config/webpack.lib.${dev ? 'dev' : 'prod'}.${variant}.config.js`)
  if (!dev) {
    let subDir
    let subVariant
    if (variant === 'bootstrap') {
      // subDir = dev ? 'dist/dev' : 'dist'
      // subVariant = ''
      return
    } else {
      subDir = 'dist/variants'
      subVariant = `-${variant}`
    }
    const jsFile = path.join(PROJECT_DIR, `${subDir}/blitpunk${dev ? '-dev' : ''}${subVariant}.js`)
    console.log()
    console.log(colors.bold.blue('Uglify:'), jsFile)
    shelljs.exec(`${UGLIFYJS} --compress --mangle -o ${jsFile} ${jsFile}`)
  }
}

function banner (...args) {
  console.log()
  console.log('#=-=---- ----- --- -  -', '\n')
  console.log(' ', ...args, '\n')
  console.log('o===}----- -- '.padEnd(80, '-'))
}

function byebye () {
  console.log()
  console.log(colors.bold.green('Thanky you and have a nice day!'))
}

function err (exitCode, ...args) {
  console.log(colors.bold.red('Error:'), ...args)
  process.exit(exitCode)
}

// START o)===]}------ ---  -

if (variant) {
  if (buildDev) build(variant, true)
  if (buildProd) build(variant, false)
} else {
  VARIANTS.forEach((variant) => {
    if (buildDev) build(variant, true)
    if (buildProd) build(variant, false)
  })
}
byebye()
