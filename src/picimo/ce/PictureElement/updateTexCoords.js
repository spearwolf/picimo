
export default (el, texture) => {
  const { meshRows, meshCols, sprites } = el
  const { maxS, maxT, minS, minT } = texture

  const tx = (maxS - minS) / meshCols
  const ty = (maxT - minT) / meshRows

  for (let y = 0; y < meshRows; ++y) {
    for (let x = 0; x < meshCols; ++x) {
      const s = sprites[x + (y * meshCols)]

      const x0 = minS + (x * tx)
      const y0 = maxT - ((y + 1) * ty)
      const x1 = minS + ((x + 1) * tx)
      const y1 = maxT - (y * ty)

      s.setUv(x0, y0, x1, y0, x1, y1, x0, y1)
    }
  }

  el.verticesUpdated = true
}
