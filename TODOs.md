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
- [x] rename all `blitp_xxx` classes to something without `blitp_` prefix


Other
-----

- [ ] firefox windows support
- [ ] edge windows support
- [ ] chrome/chromium linux support
- [ ] firefox linux support
- [ ] android chrome support
- [ ] ie11 support
- [ ] hierachical ResourceLibrary and TextureLibrary (for selective scene-graph-based cleanup)
- [ ] build library using rollup (with full source maps support (compose examples/etc with webpack as before)
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

