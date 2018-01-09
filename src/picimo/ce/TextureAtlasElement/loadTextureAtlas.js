import readTextureHints from '../shared/readTextureHints'

/** @private */
export default (el, resolve) => {
  const { src } = el
  if (el.lastSrc === src) return
  el.lastSrc = src

  const textureHints = readTextureHints(el)

  el.textureLibrary
    .loadTextureAtlas(el.textureId, src, textureHints)
    .then(atlas => {
      el.textureHints = textureHints

      // debug('[texture-atlas] textureAtlas loaded', atlas)

      resolve(atlas)
    })
}
