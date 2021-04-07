> ## 🛠 Status: In Development
> The _picimo_ package is currently in development. It's on the track to a 1.0 release, so I encourage you to use it and give me your feedback (or even better create pull requests if you want to contribute to this project), but be aware there are things that are not yet complete and you should expect some changes.
>
> If you want to use _picimo_ in your own projects, I recommend as long as the version is still at 0.0.x to check out the repository locally and use e.g. `yarn link` (the npm package is currently updated only sometimes and irregularly)


[![npm version](https://badge.fury.io/js/picimo.svg)](https://badge.fury.io/js/picimo) [![bundlephobia](https://badgen.net/bundlephobia/minzip/picimo)](https://bundlephobia.com/result?p=picimo)

# picimo

.. is a typescript library for creating realtime 2.5d gfx in html5. It's based upon the fantastic [three.js](https://threejs.org/) library which itself is based on WebGL.

One of the first ideas for this library was that it should be as simple as possible to display [pixel art](https://en.wikipedia.org/wiki/Pixel_art) graphics in a responsive design aware environment ([&rarr; Projection](./src/projection/README.md))

As a consequence thereof a key feature of picimo is that it is easy to create custom sprites with webgl shaders and provide an extremely simple OO-based API (&rarr; [About Sprites and Vertex Objects](./src/sprites/README.md)) to handle those sprites without having to worry about the otherwise necessary WebGL boilerplate and internals such as attribute buffer arrays or geometry instancing.

Those who work with sprites will quickly realize that an easy way to import [spritesheet images and texture-atlas definitions](https://en.wikipedia.org/wiki/Texture_atlas) could be very handy. Picimo supports importing tilesets via grid-aligned spritesheet images or texture altases from json files (exported by tools such as [TexturePacker](https://www.codeandweb.com/texturepacker)).

For more detailed API usage and examples, please visit the [kitchen-sink app](../kitchen-sink) or the [examples/](../../examples/) directory.

## How to import in your own projects

The `picimo` npm package can be installed from [NPM](https://npmjs.org):

```sh
yarn add three picimo
```

The [picimo npm package](https://www.npmjs.com/package/picimo) offers the following build fragments:

- the typescript types (referenced by `package.json:types`) to use the package in your typescript projects
- a modern es2017 javascript module bundle (referenced by `package.json:exports` _and_ also by the `main` and `module` properties) which can be used with modern javascript bundlers and **_must be transpiled by yourself to your dedicated browser target environment!_**


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

[Jest](https://jestjs.io/) is used for testing.

To increase the general software quality [eslint](https://eslint.org/) and [prettier](https://prettier.io/) are used and should be utilized for each commit.
