---
id: "blend"
path: "/docs/components/blend"
title: "[blend]"
sidebarLinkTitle: "[blend]"
pageType: "componentDoc"
---

## Description

Defines the WebGL *blending* settings.

A *dynamic* attribute. Is read out every time during the *renderFrame* event.


## Example

```html
  <pi-canvas
    ..
    blend="sfactor: srcAlpha; dfactor: oneMinusSrcAlpha"
    ..
    ></pi-picture>
```


## Attributes

| Attribute | Value | Description |
|-----------|-------|-------------|
| `enable` | *boolean* | Enables the WebGL blending pixel arithmetic.<br>Default is `true` |
| `sfactor` | *camelCase string* | see [WebGL/blendFunc()](https://developer.mozilla.org/de/docs/Web/API/WebGLRenderingContext/blendFunc) |
| `dfactor` | *camelCase string* | see [WebGL/blendFunc()](https://developer.mozilla.org/de/docs/Web/API/WebGLRenderingContext/blendFunc) |

