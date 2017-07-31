import findBlitpunkCanvasElement from './findBlitpunkCanvasElement.js'
import findParentElementByProperty from './findParentElementByProperty.js'

export default function (el) {
  el.blitpunkCanvas = findBlitpunkCanvasElement(el)
  el.blitpunk = el.blitpunkCanvas.blitpunk

  el.entityManager = el.blitpunk.entityManager
  el.entity = el.entityManager.createEntity()
  el.entity.on(el)

  el.parentSceneElement = findParentElementByProperty(el, 'scene')
  el.parentScene = el.parentSceneElement.scene
  el.parentScene.children.appendChild(el.entity)
}
