# Migration Guide

## v0.0.36 &rarr; v0.0.37

- the picimo npm package now only exports a modern javascript module via the (package.json) `exports` property. no more legacy umd sources are created and exported!

## v0.0.35 &rarr; v0.0.36

- `Stage2D` isn't a `THREE.Scene` anymore. Instead it _has_ now a `.scene` property &mdash; so change all `stage.add(...)` statements to `stage.scene.add(...)`
- the three.js dependency updated to r126 - all typescript defintions there moved into a separate `@types/three` package
