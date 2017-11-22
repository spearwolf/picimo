#!/usr/bin/env node
const path = require('path')
const colors = require('colors')
const shelljs = require('shelljs')
const program = require('commander')
const uniq = require('lodash/uniq')

const VARIANTS = [
  'legacy',
  'safari',
  'modern',
  'es6-module'
]
const BOOTSTRAP = 'bootstrap'

VARIANTS.push(/* should be always the last --> */BOOTSTRAP)

const OUTPUT = {
  'es6-module': 'dist/blitpunk.mjs'
}

const PROJECT_DIR = path.join(__dirname, '..')
const WEBPACK = path.join(PROJECT_DIR, 'node_modules', '.bin', 'webpack')
const UGLIFYJS = path.join(PROJECT_DIR, 'node_modules', '.bin', 'uglifyjs')

const VALID_VARIANTS = `Valid variants are:${VARIANTS.map(v => `\n - ${colors.bold(v)}`).join('')}`

program
  .version('0.1.3')
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
  return () => new Promise((resolve, reject) => {
    // console.log('START', `${variant}${dev ? '-dev' : ''}`)
    if (!silent) {
      banner('Building library variant:', colors.bold.red(variant), colors.bold(dev ? '(development)' : '(production)'))
    }
    let cmd = `${WEBPACK} --config ${PROJECT_DIR}/config/webpack.lib.${dev ? 'dev' : 'prod'}.${variant}.config.js`
    if (silent) cmd += ' --display none'
    shelljs.exec(cmd, { silent }, (code, stdout, stderr) => {
      if (code) {
        if (silent) err(code, `build:${variant}`, stdout, stderr)
        reject(stderr)
      } else if (!dev) {
        resolve(minify(variant, dev, silent, OUTPUT[variant]))
      } else {
        resolve()
      }
    })
  })
}

function minify (variant, dev, silent, filepath) {
  return new Promise((resolve, reject) => {
    let jsFile

    if (filepath) {
      jsFile = filepath
    } else {
      let subDir
      let subVariant
      if (variant === BOOTSTRAP) {
        return resolve()
      } else {
        subDir = 'dist/variants'
        subVariant = `-${variant}`
      }
      jsFile = `${subDir}/blitpunk${dev ? '-dev' : ''}${subVariant}.js`
    }

    jsFile = path.join(PROJECT_DIR, jsFile)

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

const runPreBuilds = []
const runPostBuilds = []
const allBuildSteps = []

const addBuildStep = (buildStep, addTo = runPreBuilds) => {
  allBuildSteps.push(buildStep)
  addTo.push(buildStep)
}

if (variant) {
  if (buildBoth) {
    addBuildStep({ variant: `${variant}-dev`, promise: build(variant, true, true) })
    addBuildStep({ variant, promise: build(variant, false, true) }, runPostBuilds)
  } else {
    if (buildDev) addBuildStep({ variant, promise: build(variant, true, false) })
    if (buildProd) addBuildStep({ variant, promise: build(variant, false, false) })
  }
} else {
  VARIANTS.filter(variant => variant !== BOOTSTRAP).forEach((variant) => {
    if (buildDev) addBuildStep({ variant: `${variant}-dev`, promise: build(variant, true, true) })
    if (buildProd) addBuildStep({ variant, promise: build(variant, false, true) })
  })
  if (buildDev) addBuildStep({ variant: `${BOOTSTRAP}-dev`, promise: build(BOOTSTRAP, true, true) }, runPostBuilds)
  if (buildProd) addBuildStep({ variant: BOOTSTRAP, promise: build(BOOTSTRAP, false, true) }, runPostBuilds)
}

let progressBar
let progress = 0
const progressStep = 1 / allBuildSteps.length

if (allBuildSteps.length === 1 && buildBoth) {
  console.log('Building Library variant:', colors.bold.red(variant))
} else if (allBuildSteps.length > 1) {
  console.log(`Library variants: ${uniq(allBuildSteps.map(b => colors.bold.red(b.variant))).join(', ')}`)
}

const updateProgressBar = build => build.promise().then(() => {
  console.log('Built successfully:', colors.bold.blue(build.variant))
  if (progressBar) {
    progress += progressStep
    progressBar.update(progress)
  }
})

const startBuild = (build) => {
  if (Array.isArray(build)) {
    return Promise.all(build.map(startBuild))
  }
  return updateProgressBar(build)
}

const finishBuild = () => {
  if (progressBar) {
    progressBar.stop()
    console.log()
  }
  byebye()
}

startBuild(runPreBuilds).then(() => startBuild(runPostBuilds)).then(finishBuild)
