# `<pi-picture>` Element

## Description

The `<pi-picture>` tag defines an 2d image in a *picimo* canvas.

The image is rendered using a quad grid mesh.

The `<pi-picture>` tag has one required attribute: `display-position`

With the optional attributes `mesh-cols` and `mesh-rows` the grid can be adjusted.

## Attributes

### `mesh-cols`

Set how many quads a column of the internal mesh grid should have.

Default is `16`

### `mesh-rows`

Set how many quads a row of the internal mesh grid should have.

Default is `16`

### `display-position`

Define the *position (x, y, z)* and *size (width, height)* of the image.

![picture display-position](../../../../doc/images/picture%20display-position.png)

## Example

```html
  <pi-picture
    mesh-cols="128"
    mesh-rows="128"
    texture="src: #atlas0; frame: numbers32_07"
    display-position="top: 10%; bottom: 10%; objectFit: contain"
    ></pi-picture>
```
