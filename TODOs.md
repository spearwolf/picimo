# &lt;blitpunk/&gt; Backlog

DOM Element API
---------------

- [ ] Render to texture ..
  - [ ] `<blitpunk-picture/>` acts as single sprite renderer, support boilerplate example (background)
    - [ ] support boilerplate example (background shader)
    - [ ] support free styles buffers .. single quads, mesh, ..
    - [ ] extract `SpriteGroupElement->syncTextureMap()` into a `TextureMapComponent`
  - [ ] `<blitpunk-texture/>` acts as single texture source (similary to texture-atlas)
  - [ ] `<blitpunk-render-to-texture/>` acts as texture source and scene
- [ ] `<blitpunk-canvas/>` meaningful defaults for alpha/premultiplied-alpha ..
- [ ] projection= perspective support (distance, near, far), choose sensible defaults
  - [x] main work is done :smile:
  - [ ] fix core/projection.js -> updateOrtho()
  - [ ] utils/mat4.js -> perspective()
  - [ ] pixelRatio support
- [ ] transform= component .. camera?
- [x] `<blitpunk-texture-atlas/>`
  - [x] add hints (properties) for: premultiply-alpha, pixelate (nearest or linear), repeatable, flip-y
  - [ ] use name= property instead of id= for texture-map refs
- [ ] `<blitpunk-scene/>`
- [ ] disconnectedCallback, free (glx) resources
  - [ ] `<blitpunk-canvas/>`
  - [ ] `<blitpunk-scene/>`
  - [ ] `<blitpunk-texture-atlas/>`
  - [ ] `<blitpunk-sprite-group/>`
- [x] `<blitpunk-sprite-group/>`
  - [ ] add support for all options from [src/core/SpriteGroup](src/core/sprite_group.js)
- [x] rename all `blitp_xxx` classes to something without `blitp_` prefix


Release
-------

- [ ] import examples
  - [ ] nobinger-benchy demo
  - [ ] labyrinth demo (3d-cube)
  - [ ] parallax endless (runner, scrolling)
  - [ ] dungeon-demo?
  - [ ] react integration (pong game?)
- [ ] blitpunk website setup
  - [ ] welcome page
  - [ ] examples
  - [ ] quickstart docs
  - [ ] quickstart jsfiddle?
  - [ ] custom element docs
  - [ ] esdoc
- [ ] changelog
- [ ] hierachical ResourceLibrary and TextureLibrary (for selective scene-graph-based cleanup)
- [x] build library using ~~rollup~~ webpack (with full source maps support)
  - [ ] create es6 module (blitpunk.mjs?) to support *new browsers script module syntax*
  - [x] add dynamic loader (~~systemjs~~ webpack) to support lazy-loading of
    - [x] specialized builds for (chrome, ff, ios, legacy(ie11), ..)
    - [ ] polyfills for URL, fetch, ..


Next Release
------------

- [ ] tilemaps support `<blitpunk-tilemap .. />`
- [ ] spine support `<blitpunk-spine-loader .. />`


Think about
-----------

- [ ] "create an app" -> how to compile js,css,images,etc..to one single html (webpack?)
  - [ ] include js,assets updates from server..
- [ ] quick boostrap tool `blitpunk-cli`


Other
-----

- [ ] firefox windows support
- [ ] edge windows support
- [x] chrome/chromium linux support
- [x] firefox linux support
- [ ] android chrome support
- [ ] ie11 support (needs polyfill for: URL, fetch, ..)
- [ ] fix karma/code coverage generation!
- [x] remove *jab* reference?


Scene Graph (obsolete)
----------------------

- [x] remove scene_graph, SGNode and friends
- [x] remove dom/blitp_element
- [x] think about an [entity-component-system](https://aframe.io/docs/0.6.0/introduction/entity-component-system.html)


Usage Examples
--------------

### Scrolling Font

(example is _partially outdated_, please look into [examples/](examples/))

```html
  <blitpunk-canvas>
    <blitpunk-texture-atlas id="tex1" src="atlas-url"/>
    <blitpunk-scene render-to-texture="my-texture">
      <blitpunk-sprite-group
        id="my-sprites"
        descriptor="simple"
        capacity="100"
        vertex-shader="simple"
        fragment-shader="simple"
        primitive="TRIANGLES"
        texture-map="tex: tex1"
        vo-new="scale: 1; opacity: 1" />
    </blitpunk-scene>
    <blitpunk-scene>
      <blitpunk-picture texture="my-texture" size-fit="cover" />
    </blitpunk-scene>
  </blitpunk-canvas>
```

