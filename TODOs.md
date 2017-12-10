# &lt;picimo/&gt; Backlog

HTML Element API
----------------

- [ ] Render to texture ..
  - [ ] `<pi-picture/>` acts as single sprite renderer, support boilerplate example (background)
    - [ ] support boilerplate example (background shader)
    - [ ] support free styles buffers .. single quads, mesh, ..
    - [ ] extract `SpriteGroupElement->syncTextureMap()` into a `TextureMapComponent`
  - [ ] `<picimo-texture/>` acts as single texture source (similary to texture-atlas)
  - [ ] `<picimo-render-to-texture/>` acts as texture source and scene
- [ ] `<pi-canvas/>` should have a default projection
- [ ] projection= perspective support (distance, near, far), choose sensible defaults
  - [x] main work is done :smile:
  - [x] fix core/projection.js -> updateOrtho()
  - [x] utils/mat4.js -> perspective()
  - [x] distance
  - [ ] near/far
  - [ ] pixelRatio support
- [ ] transform= component .. camera?
- [ ] disconnectedCallback, free (glx) resources
  - [ ] support/verify html element insertions and deletions (appendChild, removeChild)
- [x] `<pi-sprite-group/>`
  - [ ] add support for all options from [src/core/SpriteGroup](src/core/sprite_group.js)
- [ ] texture component (picimo-texture, render-to-texture, canvas, video...)

Release
-------

- [ ] import examples
  - [ ] nobinger-benchy demo
  - [ ] labyrinth demo (3d-cube)
  - [ ] parallax endless (runner, scrolling)
  - [ ] dungeon-demo?
  - [ ] react integration (pong game?)
- [ ] picimo website setup
  - [ ] welcome page
  - [ ] examples
  - [ ] quickstart docs
  - [ ] quickstart jsfiddle?
  - [ ] documentation
    - [ ] custom elements docs
    - [ ] components docs
    - [ ] esdoc
- [ ] changelog
- [ ] npm package
- [x] build library using ~~rollup~~ webpack (with full source maps support)
  - [x] add dynamic loader (~~systemjs~~ webpack) to support lazy-loading of
    - [x] specialized builds for (chrome, ff, ios, legacy(ie11), ..)
    - [x] polyfills for URL, fetch, ..
- [x] multi-threaded builds (build-libs.js)
- [x] support native javascript modules
- [x] upgrade to new eventize api (npm package)

Next Release
------------

- [ ] tilemaps support `<picimo-tilemap .. />`
- [ ] spine support `<picimo-spine-loader .. />`

Think about
-----------

- [ ] "create an app" -> how to compile js,css,images,etc..to one single html (webpack?)
  - [ ] include js,assets updates from server..
- [ ] quick boostrap tool `picimo-cli`

Browser Support
---------------

- [ ] firefox windows support
- [ ] edge windows support
- [ ] ie11 support (needs polyfill for: URL, fetch, ..)
- [x] chrome/chromium linux support
- [x] firefox linux support
- [ ] safari mac support
- [ ] ios support
- [ ] android chrome support

Other
-----

- [ ] fix karma/code *coverage* generation!
- [x] remove *jab* reference?

Usage Examples
--------------

### Scrolling Font

(example is _partially outdated_, please look into [examples/](examples/))

```html
  <pi-canvas>
    <pi-texture-atlas id="tex1" src="atlas-url"/>
    <picimo-scene render-to-texture="my-texture">
      <pi-sprite-group
        id="my-sprites"
        descriptor="simple"
        capacity="100"
        vertex-shader="simple"
        fragment-shader="simple"
        primitive="TRIANGLES"
        texture-map="tex: tex1"
        vo-new="scale: 1; opacity: 1" />
    </picimo-scene>
    <picimo-scene>
      <pi-picture texture="my-texture" size-fit="cover" />
    </picimo-scene>
  </pi-canvas>
```

