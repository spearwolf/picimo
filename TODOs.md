Blitpunk TODOs
==============

DOM Element API
---------------

- [ ] `<blitpunk-texture-atlas/>`
- [ ] `<blitpunk-sprite-group/>`
- [ ] `<blitpunk-scene/>`
- [ ] disconnectedCallback -> free (glx) resources
  - [ ] `<blitpunk-canvas/>`
  - [ ] `<blitpunk-scene/>`
  - [ ] `<blitpunk-texture-atlas/>`
  - [ ] `<blitpunk-sprite-group/>`
- [x] rename all `blitp_xxx` classes to something without `blitp_` prefix


Other
-----

- [ ] hierachical ResourceLibrary and TextureLibrary (for selective scene-graph-based cleanup)
- [ ] build library using rollup (with full source maps support (compose examples/etc with webpack as before)
- [ ] fix karma/code coverage generation!
- [x] remove *jab* reference?


Scene Graph
-----------

- [x] remove scene_graph, SGNode and friends
- [x] remove dom/blitp_element
- [x] think about an [entity-component-system](https://aframe.io/docs/0.6.0/introduction/entity-component-system.html)


Usage Examples
--------------

### Scrolling Font

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

