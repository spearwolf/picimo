#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable no-console */
const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');

const program = require('commander');
const emoji = require('node-emoji');

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json')),
);

program.version(
  packageJson.version,
  '-v, --version',
  'show the current version',
);

program.option(
  '-r, --root <path>',
  'your project root directory',
  path.resolve,
  process.cwd(),
);

function initialize(root) {
  console.log(emoji.get('coffee'), packageJson.name, packageJson.version);
  const projectDir = path.resolve(root || process.cwd());
  process.env.PICIMO_PROJECT_DIR = projectDir;
  return projectDir;
}

function startDevServer({root}) {
  const projectDir = initialize(root);
  spawn(
    'webpack-dev-server',
    ['--config', path.resolve(__dirname, '../webpack.config.js')],
    {
      cwd: projectDir,
      shell: true,
      stdio: 'inherit',
    },
  );
}

function build({root}) {
  const projectDir = initialize(root);
  spawn(
    'webpack',
    ['--config', path.resolve(__dirname, '../webpack.config.js')],
    {
      cwd: projectDir,
      shell: true,
      stdio: 'inherit',
    },
  );
}

async function main() {
  program
    .command('build')
    .description('build project')
    .action(build);
  program
    .command('start')
    .description('start local dev server')
    .action(startDevServer);
  await program.parseAsync(process.argv);
}

main();
