## `@picimo/example-app-shell`

Creating a new webpack config for a new project can be challenging and time consuming.
This package contains a common webpack config and launcher for the [picimo examples](../../examples).

As convention is expected that your entry point is `./src/index.js`
and you have a `./public/` folder which serves as the public root folder for the webpack-dev-server.

Code is automatically transformed using:
- [Babel](https://babeljs.io/) (includes [react](https://babeljs.io/docs/en/babel-preset-react) and [typescript](https://babeljs.io/docs/en/next/babel-preset-typescript.html) presets)
- CSS/SCSS:
  - [style-loader](https://github.com/webpack-contrib/style-loader)
  - [css-loader](https://github.com/webpack-contrib/css-loader)
  - [sass-loader](https://github.com/webpack-contrib/sass-loader)
- [file-loader](https://github.com/webpack-contrib/file-loader) for images
  

### Quick Start

Add the npm package to your project.

```sh
$ yarn add --dev @picimo/example-app-shell
```
> :warning: NOTE: the `@picimo/example-app-shell` package is intended only for your use within the `picimo` monorep!


After that you should extend your `package.json` with:

```js
{
    // ...

    "scripts": {
        "start": "picimo-example-cli start",
        "build": "picimo-example-cli build"
    },

    // ...
    
    "browserslist": [
        "last 2 chrome versions",
        "last 2 firefox versions"
    ],

    // ...
}
```

:heavy_check_mark: _that's all_

With `yarn start` you can now start a local dev server. Use `yarn build` to create the build output.

And don't forget to set the `NODE_ENV=production` environment variable if you want to output _production_ builds.

_happy coding_ ;-) :mushroom:
