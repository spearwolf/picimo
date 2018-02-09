---
id: "clear"
path: "/docs/components/clear"
title: "[clear]"
sidebarLinkTitle: "[clear]"
pageType: "componentDoc"
---

## Description

Clears the frame buffers.

A *dynamic* attribute. Is read out every time during the *renderFrame* event.


## Example

```html
  <pi-canvas
    ..
    clear="color: rgba(90, 130, 160, .6)"
    ..
    ></pi-picture>
```


## Attributes

| Attribute | Default | Value | Description |
|-----------|---------|-------|-------------|
| **`color`** | `rgba(0, 0, 0, 0)` | *css color definition* | ...TODO... |
| **`depth`** | `1` | *float* |  ...TODO... |
| **`stencil`** | `0` | *float* |  ...TODO... |
| **`mask`** | `COLOR,DEPTH,STENCIL` | *comma separated value* | ...TODO... |

