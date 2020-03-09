## `@picimo/example-app-shell`

Creating a new webpack config for a new project can be challenging and time consuming.
This package contains a common webpack config and launcher for the [picimo examples](../../examples).

As convention is expected that your entry point is `./src/index.js`
and you have a `./public/` folder which serves as the public root folder for the webpack-dev-server.

### Quick Start

Add the npm package to your project.

> NOTE: the `@picimo/example-app-shell` package is intended only for your use within the `picimo` monorep!

```sh
$ yarn add --dev @picimo/example-app-shell
```

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

_That's all_ &mdash; With `yarn start` you can now start a local dev server. Use `yarn build` to create the build output.

And don't forget to set the `NODE_ENV=production` environment variable if you want to output _production_ builds.
