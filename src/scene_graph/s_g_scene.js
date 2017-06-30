import SGNode from './s_g_node'

import { SG_SCENE, SG_CANVAS } from './constants'

const findParentScene = (node) => {
  const parent = node.parentNode
  if (!parent) return
  if (parent.nodeType === SG_SCENE || parent.nodeType === SG_CANVAS) {
    return parent
  }
  return findParentScene(parent)
}

export default class SGScene extends SGNode {
  constructor (options) {
    super(Object.assign({}, {
      nodeType: SG_SCENE
    }, options))

    this.desiredWidth = options.desiredWidth
    this.desiredHeight = options.desiredHeight
    this.sizeFit = options.sizeFit || 'cover'

    // this.debugLog = true  // XXX remove me!
  }

  renderFrame (renderer) {
    /*
    if (this.debugLog) {  // XXX remove me!
      console.log('renderFrame', renderer, findParentScene(this))
      this.debugLog = false
    }
    */
  }
}
