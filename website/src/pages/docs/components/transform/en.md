---
id: "transform"
path: "/docs/components/transform"
title: "[ctransform]"
sidebarLinkTitle: "[transform]"
pageType: "componentDoc"
---

## Description

Transforms the view matrix.

A *dynamic* attribute. Is read out every time during the *renderFrame* event.


## Example

```html
  <pi-entity
    ..
    transform="x: 10; rotateZ: 90; scaleY: 2.5"
    ..
    ></pi-entity>
```


## Attributes

| Attribute | Value | Description |
|-----------|-------|-------------|
| `x` | *pixels* | X translation |
| `y` | *pixels* | Y translation |
| `z` | *pixels* | Z translation |
| `rotateX` | *degree* | Rotation around x-axis |
| `rotateY` | *degree* | Rotation around y-axis |
| `rotateZ` | *degree* | Rotation around z-axis<br>*Hint: if you in a 2d context, this is what you want* ;-) |
| `scaleX` | *float* | X scale. *Default* is `1.0` |
| `scaleY` | *float* | Y scale. *Default* is `1.0` |
| `scaleZ` | *float* | Z scale. *Default* is `1.0` |

