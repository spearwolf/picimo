---
id: "pi-picture"
path: "/docs/tags/pi-picture"
title: "<pi-picture>"
sidebarLinkTitle: "<pi-picture>"
pageType: "tagDoc"
---

## Description

The `<pi-picture>` tag defines a 2d image in a *picimo* canvas.

The image is rendered using a quad grid mesh.

The `<pi-picture>` tag has two required attribute: `display-position` and `texture`.

With the *optional* attributes `mesh-cols` and `mesh-rows` the grid can be adjusted.


## Example

```html
  <pi-picture
    mesh-cols="128"
    mesh-rows="128"
    texture="src: #atlas0; frame: numbers32_07"
    display-position="top: 10%; bottom: 10%; objectFit: contain"
    ></pi-picture>
```


## Attributes

### `mesh-cols`

Sets how many quads a column of the internal mesh grid should have.

A *static* attribute. Initially read out only once when the mesh is generated.

Default value is `16`


### `mesh-rows`

Sets how many quads a row of the internal mesh grid should have.

A *static* attribute. Initially read out only once when the mesh is generated.

Default value is `16`


### `texture`

Sets a reference to the texture for the image.

A *dynamic* attribute. Is read out every time during the *renderFrame* event.

| Attribute | Value | Description |
|-----------|-------|-------------|
| __src__ | *css query selector* | Specifies the texture element which should be used for the image |
| __frame__ | *frame name* | *Optional.* Specifies the texture frame. Works only when the `src` selector references a *texture atlas*. |


### `display-position`

Defines the *position (x, y, z)* and *size (width, height)* of the image.

See [display-position](/doc/components/display-position) for a detailed description.
