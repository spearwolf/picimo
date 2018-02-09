---
id: "texture"
path: "/docs/components/texture"
title: "[texture]"
sidebarLinkTitle: "[texture]"
pageType: "componentDoc"
---

## Description

Selects a texture from another html element. If the target element is a texture atlas, you can also select the frame.

Supported elements are:
[`<pi-texture>`](/docs/tags/pi-texture) and [`<pi-texture-atlas>`](/docs/tags/pi-texture-atlas)

A *dynamic* attribute. Is read out every time during the *renderFrame* event.

The `texture` component is used by the following tags: [`<pi-picture>`](/docs/tags/pi-picture)

## Example

```html
  <pi-picture
    ..
    texture="src: #tex0; frame: foo"
    ..
    ></pi-picture>
```


## Attributes

| Attribute | Value | Description |
|-----------|-------|-------------|
| **`src`** | *css query selector* | ...TODO... |
| **`frame`** | *frame name* | *Optional*. ...TODO... |

