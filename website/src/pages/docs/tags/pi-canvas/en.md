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
    alpha preserve-drawing-buffer 
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
| **`alpha`** | `false` | Boolean that indicates that the canvas has an alpha channel. |
| **`no-depth`** | `false` | Boolean that indicates that the canvas has a depth buffer.<br>*Depth buffer is enabled by default.* |
| **`stencil`** | `false` | Boolean that indicates that the canvas has a stencil buffer. |
| **`antialias`** | `false` | Boolean that indicates whether or not to perform anti-aliasing. |
| **`no-premultiplied-alpha`** | `false` | Boolean that indicates that the page compositor will assume the canvas contains colors with pre-multiplied alpha.<br>*Premultiplied alpha is enabled by default.* |
| **`preserve-drawing-buffer`** | `false` | If the value is true the buffers will not be cleared and will preserve their values until cleared or overwritten by the author. |


With the *framebuffer attributes* you can control the size of the internal framebuffer.
These attributes are normally only useful for debugging or testing.
But they exist and can therefore also be used.

| Framebuffer Attribute | Default Value | Description |
|-----------------------|---------------|-------------|
| **`width`** | *dom element width* | Set the internal framebuffer to a fixed *width*. |
| **`height`** | *dom element height* |  Set the internal framebuffer to a fixed *height*. |
| **`device-pixel-ratio`** | `window.devicePixelRatio` | Force a fixed *devicePixelRatio*. Ignores the *real* device pixel ratio. |

## Methods

### `startAnimation()`

Starts the *render loop*. Is called automatically when the element is attached to the dom.


### `stopAnimation()`

Stops the *render loop*.


### `readPixels(flipY = false)`

Returns an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object representing the underlying pixel data of the canvas.

