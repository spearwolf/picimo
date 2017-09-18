#!/usr/bin/env node
const path = require('path')
const colors = require('colors')
const shelljs = require('shelljs')
const program = require('commander')
const { terminal } = require('terminal-kit')
const uniq = require('lodash/uniq')

const VARIANTS = ['legacy', 'safari', 'modern', /* should be always the last --> */'bootstrap']

const PROJECT_DIR = path.join(__dirname, '..')
const WEBPACK = path.join(PROJECT_DIR, 'node_modules', '.bin', 'webpack')
const UGLIFYJS = path.join(PROJECT_DIR, 'node_modules', '.bin', 'uglifyjs')

const VALID_VARIANTS = `Valid variants are:${VARIANTS.map(v => `\n - ${colors.bold(v)}`).join('')}`

program
  .version('0.1.2')
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

function build (variant, dev, silent) {
  return new Promise((resolve, reject) => {
    if (!silent) {
      banner('Building library variant:', colors.bold.red(variant), colors.bold(dev ? '(development)' : '(production)'))
    }
    let cmd = `${WEBPACK} --config ${PROJECT_DIR}/config/webpack.lib.${dev ? 'dev' : 'prod'}.${variant}.config.js`
    if (silent) cmd += ' --display none'
    shelljs.exec(cmd, { silent }, (code, stdout, stderr) => {
      if (code) {
        if (silent) err(code, `build:${variant}`, stderr)
        reject(stderr)
      } else if (!dev) {
        resolve(minify(variant, dev, silent))
      } else {
        resolve()
      }
    })
  })
}

function minify (variant, dev, silent) {
  return new Promise((resolve, reject) => {
    let subDir
    let subVariant
    if (variant === 'bootstrap') {
      // subDir = dev ? 'dist/dev' : 'dist'
      // subVariant = ''
      return resolve()
    } else {
      subDir = 'dist/variants'
      subVariant = `-${variant}`
    }
    const jsFile = path.join(PROJECT_DIR, `${subDir}/blitpunk${dev ? '-dev' : ''}${subVariant}.js`)
    if (!silent) {
      console.log()
      console.log(colors.bold.blue('Uglify:'), jsFile)
    }
    const cmd = `${UGLIFYJS} --compress --mangle -o ${jsFile} ${jsFile}`
    shelljs.exec(cmd, { silent }, (code, stdout, stderr) => {
      if (code) {
        if (silent) err(code, `minfiy:${variant}`, stderr)
        return reject(stderr)
      }
      resolve()
    })
  })
}

function banner (...args) {
  console.log('#=-=---- ----- --- -  -', '\n')
  console.log(' ', ...args, '\n')
  console.log('o===}----- -- '.padEnd(80, '-'))
}

function byebye () {
  console.log(colors.bold.green('Thanky you and have a nice day!'))
}

function err (exitCode, ...args) {
  console.log(colors.bgRed('ERROR'), ...args)
  process.exit(exitCode)
}

// START o)===]}------ ---  -

const allBuilds = []
if (variant) {
  if (buildBoth) {
    allBuilds.push({
      variant,
      promise: build(variant, true, true).then(() => build(variant, false, true))
    })
  } else {
    if (buildDev) allBuilds.push({ variant, promise: build(variant, true, false) })
    if (buildProd) allBuilds.push({ variant, promise: build(variant, false, false) })
  }
} else {
  VARIANTS.forEach((variant) => {
    if (buildDev) allBuilds.push({ variant, promise: build(variant, true, true) })
    if (buildProd) allBuilds.push({ variant, promise: build(variant, false, true) })
  })
}

let progressBar
let progress = 0
const progressStep = 1 / allBuilds.length

if (allBuilds.length === 1 && buildBoth) {
  console.log('Building Library variant:', colors.bold.red(variant))
} else if (allBuilds.length > 1) {
  console.log(`Library variants: ${uniq(allBuilds.map(b => colors.bold.red(b.variant))).join(', ')}`)
  progressBar = terminal.progressBar({
    title: 'Building',
    width: 80,
    eta: true,
    percent: true
  })
}

Promise.all(allBuilds.map(b => {
  if (progressBar) {
    return b.promise.then(() => {
      progress += progressStep
      progressBar.update(progress)
    })
  } else {
    return b.promise
  }
})).then(() => {
  if (progressBar) {
    progressBar.stop()
    console.log()
  }
  byebye()
})
