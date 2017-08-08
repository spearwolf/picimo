#!/usr/bin/env node
const fs = require('fs')
const colors = require('colors')
const program = require('commander')
const { execSync } = require('child_process')

program
  .version('0.2.0')
  .usage('[options] [<search>]')
  .option('-R, --raw', 'Show raw import statements')
  .option('-0, --zero', 'Show the full list of all imported source files')
  .option('-J, --json', 'Json output')
  .parse(process.argv)

const RAW = program.raw && !program.json
const ZERO = program.zero && !program.json
const JSON_OUTPUT = program.json
const SEARCH = !JSON_OUTPUT && !RAW && program.args[0]

const filesList = execSync('./source-files.sh', { cwd: __dirname, encoding: 'utf-8' }).split('\n')

const jsonOut = {
  sourceFiles: [],
  sources: {}
}

filesList.forEach((filename) => {
  if (!filename) return

  // step-0) load source file

  const lines = fs.readFileSync(filename, 'utf-8').split('\n')
  const imports = []
  let isImport = false

  jsonOut.sourceFiles.push(filename)

  const addImport = (sourceFile, importFile, lineNo) => {
    const imp = parseImport(sourceFile, importFile, lineNo)
    imports.push(imp)
    jsonOut.sources[sourceFile] = imp
  }

  // step-1) parse source file - extract all import statements

  lines.forEach((line, idx) => {
    if (!isImport) {
      const tLine = line.trim()
      if (tLine.startsWith('import')) {
        const m = line.match(/import(\s+.+from)?\s+'([^']+)'[\s;]*$/)
        if (m) {
          if (RAW) console.log(line)
          // imports.push(parseImport(filename, m[m.length - 1], idx))
          addImport(filename, m[m.length - 1], idx)
        } else if (tLine.match(/import\s+[^{]*{\s*$/)) {
          if (RAW) console.log(line)
          isImport = true
        }
      }
    } else {
      if (RAW) console.log(line)
      const m = line.match(/^[^}]*\}\s+from\s+'([^']+)'[\s;]*$/)
      if (m) {
        isImport = false
        // imports.push(parseImport(filename, m[m.length - 1], idx))
        addImport(filename, m[m.length - 1], idx)
      }
    }
  })

  // step-2-a) show full imports info as human readable text (for current source file)

  if (SEARCH || (!RAW && !JSON_OUTPUT)) {
    if (imports.length) {
      if (!SEARCH) {
        if (ZERO) {
          imports.forEach(im => console.log(im.importFile))
        } else {
          console.log()
          console.log(colors.bold(`${filename}:`))
          console.log(imports.map(im => {
            return im.isAbsolute ? `- ${im.lineNo}: ${im.fullImportFile}` : `- ${im.lineNo}: ${im.importFile} -> ${im.fullImportFile}`
          }).join('\n'))
        }
      } else {
        const found = []
        imports.forEach(im => {
          const idx = im.fullImportFile.indexOf(SEARCH)
          if (idx >= 0) {
            found.push(`- ${im.lineNo}: ${im.fullImportFile.slice(0, idx)}${colors.bgYellow(SEARCH)}${im.fullImportFile.slice(idx + SEARCH.length, im.fullImportFile.length)}`)
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

if (JSON_OUTPUT) {
  console.log(JSON.stringify(jsonOut, null, 2))
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
  if (!fullImportFile.endsWith('.js')) {
    if (fs.existsSync(`${fullImportFile}.js`)) {
      fullImportFile = `${fullImportFile}.js`
    } else if (fs.existsSync(`${fullImportFile}/index.js`)) {
      fullImportFile = `${fullImportFile}/index.js`
    }
  }
  const isLibrary = isAbsolute && !fs.existsSync(importFile)
  return {
    isLibrary,
    isAbsolute,
    lineNo,
    sourceFile,
    importFile,
    fullImportFile
  }
}
