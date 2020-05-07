---
id: Introduction
title: Introduction
---

**picmo** is a typescript library for creating realtime 2.5d gfx in html5. It's based upon the fantastic [three.js](https://threejs.org/) library which itself is based on WebGL.

One of the first ideas for this library was that it should be as simple as possible to display [pixel art](https://en.wikipedia.org/wiki/Pixel_art) graphics in a responsive design aware environment ([&rarr; Projection](./src/projection/README.md))

As a consequence thereof a key feature of picimo is that it is easy to create custom sprites with webgl shaders and provide an extremely simple OO-based API (&rarr; [About Sprites and Vertex Objects](./src/sprites/README.md)) to handle those sprites without having to worry about the otherwise necessary WebGL boilerplate and internals such as attribute buffer arrays or geometry instancing.

Those who work with sprites will quickly realize that an easy way to import [spritesheet images and texture-atlas definitions](https://en.wikipedia.org/wiki/Texture_atlas) could be very handy. Picimo supports importing tilesets via grid-aligned spritesheet images or texture altases from json files (exported by tools such as [TexturePacker](https://www.codeandweb.com/texturepacker)).

For more detailed API usage and examples, please visit the [kitchen-sink app](../kitchen-sink) or if you are more on the [_react_](https://reactjs.org/)-side, please try the gorgeous components from [picimo-r3f](../picimo-r3f).

## How to import in your own projects

The `picimo` npm package can be installed from [NPM](https://npmjs.org):

```sh
yarn add three picimo
```

The [picimo npm package](https://www.npmjs.com/package/picimo) offers three different build fragments:

- the original typescript sources (referenced by `package.json:types`) to use the package in your typescript projects
- the ES5 javascript universal umd/amd module (referenced by `package.json:main`) which can be &hellip;
  - &hellip; imported directly in the browser (in this case it is assumed that the three.js library can be found under the global variable `THREE`)
  - &hellip; used with the most classical javascript module loaders without further processing
- the ES2019 javascript module (referenced by `package.json:module`) which can be used with modern javascript bundlers and should be transpiled by yourself to your dedicated browser target environments

It can also be used from the [unpkg.com CDN](https://unpkg.com):

```html
  <!-- 🚨 OPTIONAL: fetch() polyfill to support IE 11 -->
  <script nomodule src="https://unpkg.com/whatwg-fetch@latest"></script>

  <script src="https://unpkg.com/three@latest"></script>
  <script src="https://unpkg.com/picimo@latest"></script>
```


## Development

You will need [Node.js](https://nodejs.org/) **version v10+** and [yarn](https://yarnpkg.com/).

After cloning the repo, run:

```sh
$ yarn install
```

To compile and build the sources:

```sh
$ yarn build
```

To run all linters and tests at once:

```sh
$ yarn test
```

### Build System Overview

Picimo is a pure typescript library, which is transpiled using [rollup](https://rollupjs.org/) and [babel](https://babeljs.io/) and is available as a [npm package](https://www.npmjs.com/package/picimo) as build output.

[Karma](https://karma-runner.github.io/) and [mocha](https://mochajs.org/) are used for testing.

To increase the general software quality [eslint](https://eslint.org/) and [prettier](https://prettier.io/) are used and should be utilized for each commit.
