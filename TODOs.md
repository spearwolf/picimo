Blitpunk TODOs
==============

Scene Graph
-----------

- [ ] remove scene_graph/SGNode & friends!
- [x] remove dom/blitp_element
- [ ] do something with `<blitpunk-scene />`
- [x] think about an [entity-component-system](https://aframe.io/docs/0.6.0/introduction/entity-component-system.html)


DOM Element API
---------------

- [ ] disconnectedCallback -> free (glx) resources
  - [ ] `<blitp-canvas />`
  - [ ] `<blitp-scene />`
- [ ] rename all `blitp_*` classes to something without `blitp_` prefix


Other
-----

- [x] remove *jab* reference?
- [ ] rename all js sources to camelCase, no snake_case
- [ ] build library using rollup (with full source maps support (compose examples/etc with webpack as before)
- [ ] fix karma/code coverage generation!
- [ ] hierachical ResourceLibrary and TextureLibrary (for selective scene-graph-based cleanup)


Usage Examples
--------------

### Scrolling Font

```
  <blitp-canvas>
    <blitp-scene render-to-texture="my-texture">
      <blitp-sprites id="my-sprites" texture='..' />
    </blitp-scene>
    <blitp-scene>
      <blitp-picture texture="my-texture" size-fit="cover" />
    </blitp-scene>
  </blitp-canvas>
```

