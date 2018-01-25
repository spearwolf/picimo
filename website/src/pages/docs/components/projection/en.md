---
id: "projection"
path: "/docs/components/projection"
title: "[projection]"
sidebarLinkTitle: "[projection]"
pageType: "componentDoc"
---

## Description

Defines the view matrix of the picimo canvas.

A *dynamic* attribute. Is read out every time during the *renderFrame* event.

The `projection` component can be attached to all picimo tags.


## Example

```html
  <pi-canvas
    ..
    projection="sizeFit: contain; desiredWidth: 600; desiredHeight: 600; perspective: 100"
    ..
    ></pi-picture>
```


## Attributes

| Attribute | Value | Description |
|-----------|-------|-------------|
| `desiredWidth` | *pixels* | ...TODO... |
| `desiredHeight` | *pixels* | ...TODO... |
| `sizeFit` | `fill` `contain` `cover` | ...TODO... *Default value is `contain`* |
| `perspective` | `true` `false` | ...TODO... |

