[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

<img src="doc/logo/picimo-1024.png" alt="pictures in motion logo" width="256">

> pictures in motion

`picimo` is an upgrade to [spearwolf/picimo.old](https://github.com/spearwolf/picimo.old) that features a rewritten core to improve the overall developer experience including *custom elements* support.

*WORK IN PROGRESS* .. *DEMO FIRST &mdash; DOCUMENTATION COMES LATER* :wink:

> don't hesitate if you want to be an early adopter and see all the magic of webgl based sprite and shader programming with custom elements ..

## How to setup your local development environment

### Prerequisites

- [Node ^8.0.0](https://nodejs.org/)
- [yarn v1.3+](https://yarnpkg.com/)

### Build the library

Before you start using *picimo* you'll first need to build the library.

```sh
yarn run build
````

This will internally run the script [scripts/build-libs.js](scripts/build-libs.js) and install the library artifacts into your local `dists/` folder.

The compiled and minified file is at `dist/picimo.js`, with `dist/dev/picimo-dev.js` being the uncompressed (with source maps included) library.
The files `dist/picimo.*.js` (uncompressed: `dist/dev/picimo.*.js`) are also needed, they will be loaded on demand at runtime.

See `examples/` for usage examples.

You can start a local html server which serves all the examples at localhost by running the command:

```sh
yarn run examples
```

The special `dist/picimo.mjs` (uncompressed: `dist/dev/picimo-dev.mjs`) is a native es module and can loaded as standalone module in your browser with the script element.

```html
<script type="module" src="picimo.mjs"></script>
```

### Run the tests

There are multiple ways to test different aspects of the library:

| command | description |
|---------|-------------|
| `yarn test` | runs all the tests from `src/**/__specs__/*.test.js` with [karma](https://karma-runner.github.io/2.0/index.html) using a locally installed *Chrome* browser |
| `yarn run testrunner` | starts a local http server which serves the *bootstrap* and *visual screenshot* tests as html pages from `testrunner/` folder |


