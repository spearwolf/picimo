#!/usr/bin/env node
const path = require('path')
const colors = require('colors')
const shelljs = require('shelljs')
const program = require('commander')

const VARIANTS = ['legacy', 'safari', 'modern', 'bootstrap']

const PROJECT_DIR = path.join(__dirname, '..')
const WEBPACK = path.join(PROJECT_DIR, 'node_modules', '.bin', 'webpack')

const VALID_VARIANTS = `Valid variants are:${VARIANTS.map(v => `\n - ${colors.bold(v)}`).join('')}`

program
  .version('0.1.0')
  .usage('[<options>...]')
  .option('--variant <value>', 'Build library for a variant')
  .option('-l, --list', 'List all valid variants')
  .option('-D, --development', 'use development mode (default: production)')
  .parse(process.argv)

if (program.list) {
  console.log(VALID_VARIANTS)
  process.exit()
}

const { variant } = program

if (variant && !VARIANTS.includes(variant)) {
  err(1, 'unknown variant:', colors.bold.blue(variant), `\n${VALID_VARIANTS}`)
}

function build (variant, dev) {
  banner('Building library variant:', colors.bold.red(variant), colors.bold(dev ? '(development)' : '(production)'))
  shelljs.exec(`${WEBPACK} --config ${PROJECT_DIR}/config/webpack.lib.${dev ? 'dev' : 'prod'}.${variant}.config.js`)
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
  build(variant, program.development)
} else {
  VARIANTS.forEach((variant) => {
    build(variant, true)
    build(variant, false)
  })
}
byebye()
