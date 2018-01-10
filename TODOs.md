# &lt;picimo/&gt; Backlog

HTML Element API And Other Issues
---------------------------------

- [ ] Render to texture ..
  - [x] `<pi-picture/>` acts as single sprite renderer, support boilerplate example (background)
    - [ ] without texture (texture='none' ?)
    - [ ] multi-texture support
    - [ ] custom frag/vertex shader support
    - [ ] support boilerplate example (background shader)
    - [ ] support free styles buffers .. single quads, mesh, ..
    - [ ] extract `SpriteGroupElement->syncTextureMap()` into a `TextureMapComponent`
  - [x] `<pi-texture/>` acts as single texture source (similary to texture-atlas)
  - [ ] `<pi-render-to-texture/>` acts as texture source and scene
- [ ] `<pi-canvas/>` should have a default projection
- [ ] texture-map= (from <pi-sprite-group>) should be a component
- [ ] projection= perspective support (distance, near, far), choose sensible defaults
  - [x] main work is done :smile:
  - [x] fix core/projection.js -> updateOrtho()
  - [x] utils/mat4.js -> perspective()
  - [x] distance
  - [ ] near/far
  - [ ] pixelRatio support
- [x] transform= component .. camera?
- [x] `<pi-sprite-group/>`
  - [ ] add support for all options from [src/core/SpriteGroup](src/core/sprite_group.js)
  - [ ] billboard support
- [ ] shader-uniform= component
- [ ] texture= component
  - [x] pi-texture
  - [ ] render-to-texture
  - [ ] canvas
  - [ ] video
- [ ] destroy
  - [ ] free gl resources
  - [ ] auto-remove unused gl resources
  - [ ] disconnectedCallback
  - [ ] support/verify html element insertions and deletions (appendChild, removeChild)


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


Browser Support
---------------

- [x] ie11 support (needs polyfill for: URL, fetch, ..)
- [x] edge windows support
- [x] firefox windows support
- [x] chrome/chromium linux support
- [x] firefox linux support
- [x] safari mac support
- [x] ios support
- [x] android chrome support


Think about
-----------

- [ ] fullscreen support
- [ ] interaction support
- [ ] react-picimo
- [ ] vue-picimo
- [ ] create examples with ?
  - [ ] https://github.com/popmotion/popmotion
  - [ ] https://github.com/chenglou/react-motion
- [ ] "create an app" -> how to compile js,css,images,etc..to one single html (webpack?)
  - [ ] include js,assets updates from server..
  - [ ] codepen?
  - [ ] jsbin/jsfiddle?
  - [ ] boilerplate?


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

