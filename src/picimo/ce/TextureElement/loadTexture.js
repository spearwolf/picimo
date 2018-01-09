import readTextureHints from '../shared/readTextureHints'

/** @private */
export default (el, resolve) => {
  const { src } = el
  if (el.lastSrc === src) return
  el.lastSrc = src

  const textureHints = readTextureHints(el)

  el.textureLibrary
    .loadTexture(el.textureId, src, textureHints)
    .then(texture => {
      el.textureHints = textureHints

      // debug('[texture] texture loaded', texture)

      resolve(texture)
    })
}
