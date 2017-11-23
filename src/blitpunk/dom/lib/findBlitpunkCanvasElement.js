import findParentElementByName from './find_parent_element_by_name'

import {
  NODE_NAME_CANVAS
} from '../constants'

export default function (el) {
  return findParentElementByName(el, NODE_NAME_CANVAS)
}
