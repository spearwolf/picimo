> ## 🛠 Status: In Development
> The _picimo_ package is currently in development. It's on the track to a 1.0 release, so I encourage you to use it and give me your feedback (or even better create pull requests if you want to contribute to this project), but be aware there are things that are not yet complete and you should expect some changes.
>
> If you want to use _picimo_ in your own projects, I recommend as long as the version is still at 0.0.x to check out the repository locally and use e.g. `yarn link` (the npm package is currently updated only sometimes and irregularly)


[![npm version](https://badge.fury.io/js/picimo.svg)](https://badge.fury.io/js/picimo)

# picimo

.. is a typescript library for creating realtime 2.5d gfx in html5. It's based upon the fantastic [three.js](https://threejs.org/) library which itself is based on WebGL.

One of the first ideas for this library was that it should be as simple as possible to display [pixel art](https://en.wikipedia.org/wiki/Pixel_art) graphics in a [responsive design aware environment](./src/projection/README.md).

As a consequence thereof a key feature of picimo is that it is easy to [create sprites (with custom shaders) and provide an extremely simple OO-based API](./src/sprites/README.md) to use these sprites without having to worry about the WebGL boilerplate and internals such as attribute buffer arrays or geometry instancing.

Those who work with sprites will quickly realize that an easy way to import [spritesheet images and texture-atlas definitions](https://en.wikipedia.org/wiki/Texture_atlas) could be very handy. Picimo supports importing tilesets via grid-aligned spritesheet images or texture altases from json files (exported by tools such as [TexturePacker](https://www.codeandweb.com/texturepacker)).

For more detailed API usage and examples, please visit the [kitchen-sink app](../kitchen-sink) or if you are more on the [_react_](https://reactjs.org/)-side, please try the gorgeous components from [picimo-r3f](../picimo-r3f).

## How to import in your own projects

The `picimo` npm package can be installed from [NPM](https://npmjs.org):

```sh
yarn add three picimo
```

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
