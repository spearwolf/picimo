[![npm version](https://badge.fury.io/js/picimo.svg)](https://badge.fury.io/js/picimo)

# picimo

.. is a typescript library for creating realtime 2.5d gfx in html5. It's based upon the fantastic [three.js](https://threejs.org/) library which itself is based on WebGL.

A key feature of picimo is that it is easy to create sprites (with custom shaders) and provide an extremely simple OO-based API to use these sprites without having to worry about the WebGL boilerplate and internals such as attribute buffer arrays or geometry instancing.

## Development Setup

You will need [Node.js](https://nodejs.org/) **version v10+** and [yarn](https://yarnpkg.com/).

After cloning the repo, run:

```sh
$ yarn install
```

To run all linters and tests at once:

```sh
$ yarn test
```

To get an idea about the api, please try the [kitchen-sink app](../kitchen-sink) or if you are more on the [react](https://reactjs.org/)-side, please try the gorgeous components from [picimo-r3f](../picimo-r3f).

### Build System

Picimo is a pure typescript library, which is transpiled using [rollup](https://rollupjs.org/) and [babel](https://babeljs.io/) and is available as an [npm package](https://www.npmjs.com/package/picimo) as build output.

[Karma](https://karma-runner.github.io/) and [mocha](https://mochajs.org/) are used for testing.

To increase the general software quality [eslint](https://eslint.org/) and [prettier](https://prettier.io/) are used.

## How to use in your project using unkpg.com CDN

```html

  <!-- 🚨 OPTIONAL: fetch() polyfill to support IE 11 -->
  <script nomodule src="https://unpkg.com/whatwg-fetch@latest"></script>

  <script src="https://unpkg.com/three@latest"></script>
  <script src="https://unpkg.com/picimo@latest"></script>

```
