import SGNode from './s_g_node'

import {
  SG_SCENE,
  SG_CANVAS
} from './constants'

const findParentSceneFor = (node) => {
  const parent = node.parentNode
  if (!parent) return
  if (parent.nodeType === SG_SCENE || parent.nodeType === SG_CANVAS) {
    return parent
  }
  return findParentSceneFor(parent)
}

export default class SGScene extends SGNode {
  constructor (options) {
    super(Object.assign({
      nodeType: SG_SCENE
    }, options))

    this.projection = null
  }

  animateFrame (canvas) {
    if (this.projection) {
      this.projection.update(canvas.width, canvas.height)
    }
    this.forEachChild(node => node.emit('animateFrame', canvas))
  }

  renderFrame (renderer, canvas) {
    if (this.projection) {
      console.log('push to renderer', canvas.frameNo, this.projection, renderer)
      renderer.shaderContext.pushVar(this.projection.uniform)
    }
    this.forEachChild(node => node.emit('renderFrame', renderer))
  }

  debug () {
    console.log('SGScene.parentScene', findParentSceneFor(this))
  }
}
