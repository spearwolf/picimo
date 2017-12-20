#!/usr/bin/env node
const fs = require('fs')
const colors = require('colors')
const program = require('commander')
const { execSync } = require('child_process')
const _ = require('lodash')

program
  .version('0.2.4')
  .usage('[<options>...] [<search>]')
  .option('--raw', 'Show raw import/export statements from all source files')
  .option('--zero', 'Show the full list of sources from all import statements')
  .option('--json', 'JSON output (include sourceFiles, sources and importedBy sections)')
  .option('--externals', 'Show only external npm package references')
  .option('--ignore-tests', 'Ignore sources from **/__specs__/ and test/')
  .option('-N, --not-referenced', 'Show all sources which are not referenced by imports')
  .option('-R, --references', 'Show for source files from where they are referenced; you can filter the source files by <search>')
  .parse(process.argv)

const NOT_REFERENCED = program.notReferenced
const REFERENCES = program.references
const EXTERNALS_ONLY = program.externals
const NO_SPECS = program.ignoreTests
const SEARCH = program.args[0]
const SHOW_JSON = program.json
const SHOW_RAW = program.raw
const SHOW_ZERO = program.zero

let flagsUsedNo = 0
if (NOT_REFERENCED) ++flagsUsedNo
if (REFERENCES) ++flagsUsedNo
if (SEARCH) ++flagsUsedNo
if (SHOW_JSON) ++flagsUsedNo
if (SHOW_RAW) ++flagsUsedNo
if (SHOW_ZERO) ++flagsUsedNo

if (flagsUsedNo > 1 && !(flagsUsedNo === 2 && SEARCH && REFERENCES)) {
  console.log('Error: the options -R, -O, -J, -N and --raw can\'t be used together.')
  console.log('use -h (or --help) for details.')
  process.exit(1)
}

const SHOW_DEFAULT_OUTPUT = flagsUsedNo === 0

const filesList = execSync('./source-files.sh', { cwd: __dirname, encoding: 'utf-8' }).split('\n')

const filterExternals = imports => imports.filter(im => !EXTERNALS_ONLY || im.isExternal)

const jsonOut = {
  sourceFiles: [],
  sources: {},
  importedBy: {}
}

filesList.forEach((filename) => {
  if (!filename) return

  if (NO_SPECS && (filename.startsWith('test') || filename.indexOf('__specs__') >= 0)) {
    return
  }

  // step-0) load source file

  const lines = fs.readFileSync(filename, 'utf-8').split('\n')
  const imports = []
  let isImport = false

  jsonOut.sourceFiles.push(filename)

  const addImport = (sourceFile, importFile, lineNo) => {
    const im = parseImport(sourceFile, importFile, lineNo)
    imports.push(im)
    if (!jsonOut.sources[sourceFile]) {
      jsonOut.sources[sourceFile] = []
    }
    jsonOut.sources[sourceFile].push(`${im.isExternal ? 'external!' : ''}${im.fullImportFile || im.importFile}`)
    if (!jsonOut.importedBy[im.fullImportFile]) {
      jsonOut.importedBy[im.fullImportFile] = []
    }
    jsonOut.importedBy[im.fullImportFile].push(sourceFile)
  }

  // step-1) parse source file - extract all import statements

  lines.forEach((line, idx) => {
    if (!isImport) {
      const tLine = line.trim()
      if (tLine.startsWith('import') || tLine.startsWith('export')) {
        const m = line.match(/(import|export)(\s+.+from)?\s+'([^']+)'[\s;]*$/)
        if (m) {
          if (SHOW_RAW) console.log(line)
          addImport(filename, m[m.length - 1], idx)
        } else if (tLine.match(/(import|export)\s+[^{]*{\s*$/)) {
          if (SHOW_RAW) console.log(line)
          isImport = true
        }
      }
    } else {
      if (SHOW_RAW) console.log(line)
      const m = line.match(/^[^}]*\}\s+from\s+'([^']+)'[\s;]*$/)
      if (m) {
        isImport = false
        addImport(filename, m[m.length - 1], idx)
      }
    }
  })

  // step-2-a) show full imports info as human readable text (for current source file)

  if ((SEARCH && !REFERENCES) || SHOW_ZERO || SHOW_DEFAULT_OUTPUT) {
    if (imports.length) {
      if (!SEARCH) {
        if (SHOW_ZERO) {
          imports.forEach(im => console.log(im.importFile))
        } else {
          const showImports = filterExternals(imports)
          if (showImports.length) {
            console.log()
            console.log(colors.bold(`${filename}:`))
            console.log(showImports.map(im => {
              const isExternal = im.isExternal ? '(external) ' : ''
              return im.isExternal ? `- ${im.lineNo}: ${isExternal}${im.fullImportFile}` : `- ${im.lineNo}: ${isExternal}${im.importFile} -> ${im.fullImportFile}`
            }).join('\n'))
          }
        }
      } else {
        const found = []
        filterExternals(imports).forEach(im => {
          const idx = im.fullImportFile.indexOf(SEARCH)
          if (idx >= 0) {
            const isExternal = im.isExternal ? '(external) ' : ''
            found.push(`- ${im.lineNo}: ${isExternal}${im.isAbsolute ? '' : `${im.importFile} -> `}${im.fullImportFile.slice(0, idx)}${colors.bgYellow(SEARCH)}${im.fullImportFile.slice(idx + SEARCH.length, im.fullImportFile.length)}`)
          }
        })
        if (found.length) {
          console.log()
          console.log(colors.bold(`${filename}:`))
          found.forEach(line => console.log(line))
        }
      }
    }
  }
})

// step-2-b) show json output

if (SHOW_JSON) {
  console.log(JSON.stringify(jsonOut, null, 2))
}

// step-2-c) show sources which are not referenced by imports

if (NOT_REFERENCED) {
  _.uniq(jsonOut.sourceFiles.filter(source => !jsonOut.importedBy[source])).sort().forEach(src => console.log(src))
}

// step-2-d) show references

if (REFERENCES) {
  jsonOut.sourceFiles.forEach(source => {
    const hasReferences = !!jsonOut.importedBy[source]
    if (hasReferences) {
      if (SEARCH) {
        const idx = source.indexOf(SEARCH)
        if (idx === -1) return
        console.log()
        console.log(colors.bold(`${source.slice(0, idx)}${colors.bgYellow(SEARCH)}${source.slice(idx + SEARCH.length, source.length)}:`))
      } else {
        console.log()
        console.log(colors.bold(`${source}:`))
      }
      jsonOut.importedBy[source].forEach(src => console.log('-', src))
    }
  })
}

// the end.  o==)----- --

// appendix) helpers --------------------------------------------------------------

function parseImport (sourceFile, importFile, lineNo) {
  let fullImportFile = importFile
  let isAbsolute = importFile[0] !== '.'
  if (!isAbsolute) {
    const path = sourceFile.split('/')
    path.pop()
    if (importFile.startsWith('./')) {
      fullImportFile = `${path.join('/')}${importFile.substr(1)}`
    } else {
      if (fullImportFile.startsWith('../')) {
        do {
          fullImportFile = fullImportFile.substr(3)
          path.pop()
        } while (fullImportFile.startsWith('../'))
        if (path.length) {
          fullImportFile = `${path.join('/')}/${fullImportFile}`
        }
      }
    }
  }
  if (importFile.startsWith('picimo')) {
    fullImportFile = importFile.replace('picimo', 'src/picimo')
  } else if (importFile.startsWith('common')) {
    fullImportFile = importFile.replace('common', 'src/common')
  } else if (importFile.startsWith('bootstrap')) {
    fullImportFile = importFile.replace('bootstrap', 'src/bootstrap')
  }
  if (!fullImportFile.endsWith('.js')) {
    if (fs.existsSync(`${fullImportFile}.js`)) {
      fullImportFile = `${fullImportFile}.js`
    } else if (fs.existsSync(`${fullImportFile}/index.js`)) {
      fullImportFile = `${fullImportFile}/index.js`
    }
  }
  const isExternal = isAbsolute && (!fs.existsSync(importFile) && !fs.existsSync(fullImportFile))
  return {
    isExternal,
    isAbsolute,
    lineNo,
    sourceFile,
    importFile,
    fullImportFile
  }
}
