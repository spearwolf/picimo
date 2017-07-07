Blitpunk TODOs
==============

DOM Element API
---------------

- [ ] disconnectedCallback -> free (glx) resources
  - [ ] `<blitp-canvas />`
  - [ ] `<blitp-scene />`


Other
-----

-[ ] hierachical ResourceLibrary and TextureLibrary (for selective scene-graph-based cleanup)


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

