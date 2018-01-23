---
id: "display-position"
path: "/docs/components/display-position"
title: "[display-position]"
sidebarLinkTitle: "[display-position]"
pageType: "componentDoc"
---

## Description

Defines the *position (x, y, z)* and *size (width, height)* of an image.

![display-position](./display-position@2x.png)

A *dynamic* attribute. Is read out every time during the *renderFrame* event.

The `display-position` component is used by the following tags: [`<pi-picture>`](/docs/tags/pi-picture)


## Example

```html
  <pi-picture
    ..
    display-position="top: 10%; bottom: 10%; objectFit: contain"
    ..
    ></pi-picture>
```


## Attributes

| Attribute | Value | Units | Description |
|-----------|-------|-------|-------------|
| __objectFit__ | `fill` `contain` `cover` | | Specifies how the image should be resized to fit its container box, which is defined by `top`, `left`, `bottom`, `right`, `width` and `height` or the *view* size. *Default value is `fill`* |
| __width__ | `100vw` | `%` `px` `dpx` `vw` `vh` | Sets the width of the image container |
| __height__ | `100vh` | `%` `px` `dpx` `vw` `vh` | Sets the height of the image container |
| __top__ | | `%` `px` `dpx` `vw` `vh` | *Optional.* Sets the top edge of the image container |
| __right__ | | `%` `px` `dpx` `vw` `vh` | *Optional.* Sets the right edge of the image contianer |
| __bottom__ | | `%` `px` `dpx` `vw` `vh` | *Optional.* Sets the bottom edge of the image container |
| __left__ | | `%` `px` `dpx` `vw` `vh` | *Optional.* Sets the left edge of the image container |

