# Migration Guide

## v0.0.38 &rarr; v0.0.39

- the npm package now exports an es2017 javascript module (using the native `import` syntax). **_Please be aware, that you need to transpile the picimo module by yourself (e.g. using babeljs) if you need it!_**
- `Logger` &rarr; `.log(..)` and `.debug(..)`  now work as expected

## v0.0.37 &rarr; v0.0.38

- three.js is now a _normal_ dependency, no more a _peer_ dependency
- picimo npm package properties `exports`, `main` and `module` are pointing all to the same picimo.js

## v0.0.36 &rarr; v0.0.37

- the picimo npm package now only exports a modern javascript module via the (package.json) `exports` property. no more legacy umd sources are created and exported!
- three.js updated to r127

## v0.0.35 &rarr; v0.0.36

- `Stage2D` isn't a `THREE.Scene` anymore. Instead it _has_ now a `.scene` property &mdash; so change all `stage.add(...)` statements to `stage.scene.add(...)`
- the three.js dependency updated to r126 - all typescript defintions there moved into a separate `@types/three` package
