
export default (el, targetWidth, targetHeight) => {
  const { meshRows, meshCols, sprites } = el

  const sx = targetWidth / meshCols
  const sy = targetHeight / meshRows
  const ox = -targetWidth / 2
  const oy = -targetHeight / 2

  for (let y = 0; y < meshRows; ++y) {
    for (let x = 0; x < meshCols; ++x) {
      const s = sprites[x + (y * meshCols)]

      s.setPos(
        ox + (x * sx), oy + ((y + 1) * sy),
        ox + ((x + 1) * sx), oy + ((y + 1) * sy),
        ox + ((x + 1) * sx), oy + (y * sy),
        ox + (x * sx), oy + (y * sy)
      )
    }
  }

  el.verticesUpdated = true
}
