#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
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
const ES6_MODULE = 'es6-module'

VARIANTS.push(/* should be always the last --> */BOOTSTRAP)

const OUTPUT = {
  [ES6_MODULE]: 'dist/blitpunk.mjs',
  [`${ES6_MODULE}-dev`]: 'dist/dev/blitpunk-dev.mjs',
  modern: '.build/prod/blitpunk-modern.js',
  safari: '.build/prod/blitpunk-safari.js',
  legacy: '.build/prod/blitpunk-legacy.js',
  bootstrap: 'dist/blitpunk.js'
}

const PROJECT_DIR = path.join(__dirname, '..')

const API_MODULE_EXPORTS = path.join(PROJECT_DIR, 'src', 'blitpunk', 'api.mjs')

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
    let cmd = `${WEBPACK} --config ${PROJECT_DIR}/config/webpack.blitpunk/${dev ? 'dev.' : ''}${variant}.config.js`
    if (silent) cmd += ' --display none'
    shelljs.exec(cmd, { silent }, (code, stdout, stderr) => {
      if (code) {
        if (silent) err(code, `build:${variant}`, stdout, stderr)
        reject(stderr)
        return
      }
      let next = Promise.resolve()
      if (variant === ES6_MODULE) {
        next = appendModuleExports(path.join(PROJECT_DIR, OUTPUT[`${variant}${dev ? '-dev' : ''}`]), API_MODULE_EXPORTS, silent)
      }
      if (!dev) {
        next = next.then(() => minify(variant, dev, silent, path.resolve(PROJECT_DIR, OUTPUT[variant])))
      }
      resolve(next)
    })
  })
}

function minify (variant, dev, silent, jsFile) {
  return new Promise((resolve, reject) => {
    if (!jsFile) return resolve()

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

function appendModuleExports (filepath, apiExportsFile, silent) {
  return new Promise((resolve, reject) => {
    if (!silent) {
      console.log()
      console.log(colors.bold.blue('Append ES6 module exports:'), apiExportsFile, '->', filepath)
    }
    const enc = { encoding: 'utf8' }
    fs.readFile(filepath, enc, (err, a) => {
      if (err) {
        if (silent) err(err, `append-es6-module-exports: load source`)
        return reject(new Error('could not load source file'))
      }
      fs.readFile(apiExportsFile, enc, (err, b) => {
        if (err) {
          if (silent) err(err, `append-es6-module-exports: load api-exports`)
          return reject(new Error('could not load api-exports file'))
        }
        fs.writeFile(filepath, `${a}\n${b}`, enc, err => {
          if (err) {
            if (silent) err(err, `append-es6-module-exports: write source`)
            return reject(new Error('could not write source file'))
          }
          resolve()
        })
      })
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
