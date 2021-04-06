/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-env node */
import path from 'path';

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

import {sizeSnapshot} from 'rollup-plugin-size-snapshot';
import {terser} from 'rollup-plugin-terser';

import createBannerPlugin from './bannerPlugin';

export const projectDir = path.resolve(
  path.join(path.dirname(__filename), '..'),
);

const packageJson = require(path.join(projectDir, 'package.json'));

export const outputDir = projectDir;

export const bannerPlugin = (version) =>
  createBannerPlugin({...packageJson, version});

export const {name} = packageJson;

export const extensions = ['.js', '.ts', '.json'];

export const makeVersionWithBuild = (build) => {
  const today = new Date();
  let month = today.getUTCMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let date = today.getUTCDate();
  if (date < 10) {
    date = `0${date}`;
  }
  return (version) =>
    `${version}+${build}.${today.getUTCFullYear()}${month}${date}`;
};

export const makePlugins = (makeVersion, makeBabelPlugin) => {
  const version = makeVersion(packageJson.version);
  return [
    bannerPlugin(version),
    commonjs(),
    resolve({
      extensions,
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    makeBabelPlugin(),
    replace({
      NODE_ENV: JSON.stringify('production'),
      PACKAGE_VERSION: JSON.stringify(version),
      'log.VERBOSE': 'false',
      'log.DEBUG': 'false',
    }),
    sizeSnapshot(),
    terser({
      output: {comments: /^!/},
    }),
  ];
};
