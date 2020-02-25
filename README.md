# ![picimo](./picimo.png)

P I C T U R E S &nbsp; I N &nbsp; M O T I O N

picimo is a [creative coding](https://en.wikipedia.org/wiki/Creative_coding) project containing several javascript &or; typescript libraries and demos
loosely based on realtime 2d &and; 3d [sprite](https://en.wikipedia.org/wiki/Sprite_(computer_graphics)) rendering concepts and techniques using [three.js](https://threejs.org) &rarr; webgl

this is the main github repository for the picimo project and all of its related sub-projects.

the repository is organized into sub-directories containing the various projects. Check out the README.md files for specific projects to get more details:

| packages | what's inside? |
|-----------|-------------|
| [`picimo`](packages/picimo/) | the core library |
| [`picimo-r3f`](packages/picimo-r3f/) | react components based on the fabulous react-three-fiber |
| [`kitchen-sink`](packages/kitchen-sink/) | a SPA with examples for almost all features of the picimo core library |

## Development

When developing across all the projects in this repository, first install [git](https://git-scm.com/), [node.js](https://nodejs.org/) and [yarn](https://classic.yarnpkg.com/lang/en/).

Then, perform the following steps to get set up for development:

```sh
git clone git@github.com:spearwolf/picimo.git
cd picimo
yarn
yarn build
```

You should now be ready to work on any of the picimo projects :rocket:
