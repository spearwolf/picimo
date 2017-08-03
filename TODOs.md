# &lt;blitpunk/&gt; Backlog

DOM Element API
---------------

- [ ] `<blitpunk-canvas/>` meaningful defaults for alpha/premultiplied-alpha ..
- [ ] projection= perspective support (distance, near, far), choose sensible defaults
  - [x] main work is done :smile:
  - [ ] fix core/projection.js -> updateOrtho()
  - [ ] utils/mat4.js -> perspective()
  - [ ] camera?
  - [ ] pixelRatio
- [x] `<blitpunk-texture-atlas/>`
  - [ ] add hints (properties) for: premultiply, anti-alias, ..
  - [ ] use name= property instead of id= for texture-map refs
- [x] `<blitpunk-texture/>`
- [ ] `<blitpunk-scene/>`
- [ ] extract `SpriteGroupElement->syncTextureMap()` into a `TextureMapComponent`
- [ ] disconnectedCallback, free (glx) resources
  - [ ] `<blitpunk-canvas/>`
  - [ ] `<blitpunk-scene/>`
  - [ ] `<blitpunk-texture-atlas/>`
  - [ ] `<blitpunk-sprite-group/>`
- [x] `<blitpunk-sprite-group/>`
- [x] rename all `blitp_xxx` classes to something without `blitp_` prefix


Other
-----

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

