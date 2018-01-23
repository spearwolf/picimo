---
id: "pi-canvas"
path: "/docs/tags/pi-canvas"
title: "<pi-canvas>"
sidebarLinkTitle: "<pi-canvas>"
pageType: "tagDoc"
---

## Description

A picimo canvas is represented by the `<pi-canvas>` tag.

The `<pi-canvas>` handles all of the WebGL boilerplate for us:

- setup html5 canvas
- creates an internal `WebGlRender` instance
- automatic sizing of the canvas element
- defines the render loop


## Example

```html
  <pi-canvas
    alpha premultiplied-alpha preserve-drawing-buffer 
    projection="sizeFit: contain; desiredWidth: 800; desiredHeight: 600"
    clear="color: rgba(255, 255, 255)"
    blend="sfactor: srcAlpha; dfactor: oneMinusSrcAlpha"
    >
    ...
  </pi-canvas>
```


## Attributes

The `<pi-canvas>` supports most of the official `<canvas>` webgl context attributes.
All context attributes are *static* and initially read out only once when the canvas is created.

See documentation for [HTMLCanvasElement/getContext](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) for more infos.

| WebGL Context Attribute | Default Value | Description |
|-------------------------|---------------|-------------|
| __alpha__ | `false` | Boolean that indicates that the canvas has an alpha channel. |
| __depth__ | `true` | Boolean that indicates that the canvas has a depth buffer. <br>HINT: *IE11 doesn't support* `false` |
| __stencil__ | `false` | Boolean that indicates that the canvas has a stencil buffer. |
| __antialias__ | `false` | Boolean that indicates whether or not to perform anti-aliasing. |
| __premultipliedAlpha__ | `false` | Boolean that indicates that the page compositor will assume the canvas contains colors with pre-multiplied alpha. |
| __preserveDrawingBuffer__ | `false` | If the value is true the buffers will not be cleared and will preserve their values until cleared or overwritten by the author. |


## Methods

### `startAnimation()`

Starts the *render loop*. Is called automatically when the element is attached to the dom.


### `stopAnimation()`

Stops the *render loop*.


### `readPixels(flipY = false)`

Returns an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object representing the underlying pixel data of the canvas.

