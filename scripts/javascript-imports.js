#!/usr/bin/env node
const fs = require('fs')
const colors = require('colors')
const program = require('commander')
const { execSync } = require('child_process')

program
  .version('0.1.0')
  .option('-r, --raw', 'Show raw import statements')
  .option('-0, --zero', 'Show the full list of all imports')
  .parse(process.argv)

const RAW = program.raw
const ZERO = program.zero

const filesList = execSync('./source-files.sh', { cwd: __dirname, encoding: 'utf-8' }).split('\n')

filesList.forEach((filename) => {
  if (!filename) return

  const lines = fs.readFileSync(filename, 'utf-8').split('\n')
  const imports = []
  let isImport = false

  lines.forEach((line, idx) => {
    if (!isImport) {
      const tLine = line.trim()
      if (tLine.startsWith('import')) {
        const m = line.match(/import(\s+.+from)?\s+'([^']+)'[\s;]*$/)
        if (m) {
          if (RAW) console.log(line)
          imports.push(parseImport(filename, m[m.length - 1], idx))
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
        imports.push(parseImport(filename, m[m.length - 1], idx))
      }
    }
  })

  if (!RAW) {
    if (imports.length) {
      if (ZERO) {
        imports.forEach(im => console.log(im.importFile))
      } else {
        console.log()
        console.log(colors.bold(`${filename}:`))
        console.log(imports.map(im => {
          return im.isAbsolute ? `- ${im.lineNo}: ${im.fullImportFile}` : `- ${im.lineNo}: ${im.importFile} -> ${im.fullImportFile}`
        }).join('\n'))
      }
    }
  }
})

function parseImport (sourceFile, importFile, lineNo) {
  let fullImportFile = importFile
  let isAbsolute = importFile[0] !== '.'
  if (!isAbsolute) {
    const path = sourceFile.split('/')
    path.pop()
    if (importFile.startsWith('./')) {
      fullImportFile = `${path.join('/')}${importFile.substr(1)}`
    }
    let goUpCount = 0
    while (fullImportFile.startsWith('../')) {
      fullImportFile = fullImportFile.substr(3)
      ++goUpCount
    }
    for (let i = 0; i < goUpCount; ++i) {
      fullImportFile = `${path.pop()}/${fullImportFile}`
    }
  }
  return {
    isAbsolute,
    lineNo,
    sourceFile,
    importFile,
    fullImportFile
  }
}
