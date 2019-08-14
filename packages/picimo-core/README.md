[![npm version](https://badge.fury.io/js/@picimo/core.svg)](https://badge.fury.io/js/@picimo/core)

# @picimo/core

A typescript library for my personal 2.5d browser game dev experiments based on [three.js](https://threejs.org/)

## Development Setup

You will need [Node.js](https://nodejs.org/) **version v10+** and [yarn](https://yarnpkg.com/).

After cloning the repo, run:

```sh
$ yarn install
```

To run all tests:

```sh
$ yarn test
```

To start the examples, run:

```sh
$ yarn start
```

## How to use in your project using unkpg.com CDN

```html

  <!-- 🚨 OPTIONAL: fetch() polyfill to support IE 11 -->
  <script nomodule src="https://unpkg.com/whatwg-fetch@latest"></script>

  <script src="https://unpkg.com/three@latest"></script>
  <script src="https://unpkg.com/@picimo/core@latest"></script>

```
