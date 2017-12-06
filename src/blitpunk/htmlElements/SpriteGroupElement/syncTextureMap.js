import { parseCssStyledProperties } from 'blitpunk/utils'
import { debug } from 'common/log'

export default (el, data) => {
  const { spriteGroup } = el
  const texMap = parseCssStyledProperties(data)
  if (!texMap || typeof texMap !== 'object') return
  el.textureMap = {}
  const textureElements = []
  Object.keys(texMap).forEach((key) => {
    const selector = texMap[key]
    const texEl = document.querySelector(selector)
    if (textureElements.indexOf(texEl) === -1) textureElements.push(texEl)
    el.textureMap[key] = texEl.textureId
    spriteGroup.setTexture(key, texEl.textureId)
  })
  debug(`[sprite-group/${el.entity.id}] use texture frames from`, textureElements)
  textureElements.forEach(texEl => texEl.loadTexture())
}
