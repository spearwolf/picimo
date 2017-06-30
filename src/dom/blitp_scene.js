import BlitpElement from './blitp_element'
import SGScene from '../scene_graph/s_g_scene'
import findParentElementByName from './lib/find_parent_element_by_name'
import {
  BLITP_CANVAS_NODE_NAME,
  BLITP_SCENE_NODE_NAME
} from './constants'

export default class BlitpScene extends BlitpElement {
  /** @private */
  initialize () {
    this.parentBlitpElement = findParentElementByName(this, BLITP_SCENE_NODE_NAME, BLITP_CANVAS_NODE_NAME)
    this.sgNode = new SGScene({ parentNode: this.parentBlitpElement.sgNode })
  }
}
