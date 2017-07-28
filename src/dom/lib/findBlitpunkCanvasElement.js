import findParentElementByName from './find_parent_element_by_name'

import {
  BLITPUNK_CANVAS_NODE_NAME
} from '../constants'

export default function (el) {
  return findParentElementByName(el, BLITPUNK_CANVAS_NODE_NAME)
}
