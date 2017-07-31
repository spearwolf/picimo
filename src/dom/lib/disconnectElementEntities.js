
export default function (el) {
  el.parentScene.children.removeChild(el.entity)
  el.parentScene = null
  el.parentSceneElement = null
  el.entity.off(el)
  el.entityManager.destroyEntity(el.entity)
  el.entity = null
  el.blitpunk = null
  el.blitpunkCanvas = null
}

