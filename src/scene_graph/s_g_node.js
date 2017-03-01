import eventize from '@spearwolf/eventize'

import generateUUID from '../utils/generate_uuid'
import { SG_NODE_TYPE, DEFAULT_PRIORITY } from './constants'

/**
 * Common interface used by all scene graph nodes.
 */
export default class SGNode {

  constructor ({ nodeType, name, parentNode, priority } = {}) {
    eventize(this)

    /**
     * @type {number}
     */
    this.nodeType = nodeType || SG_NODE_TYPE

    /**
     * @type {string}
     */
    this.id = generateUUID()

    /**
     * @type {string}
     */
    this.name = name || this.id

    /**
     * @type {SGNode}
     */
    this.parentNode = parentNode || null

    /**
     * @private
     */
    this._priority = priority || DEFAULT_PRIORITY

    /**
     * @type {SGNode[]}
     */
    this.childNodes = []

    /**
     * @private
     */
    this.shouldSortChildNodes = false

    if (this.parentNode) {
      this.parentNode.appendChild(this)
    }
  }

  /**
   * @type {number}
   */
  get priority () {
    return this._priority
  }

  /**
   * @param {number} priority
   */
  set priority (priority) {
    if (priority !== this._priority) {
      this._priority = priority
      const { parentNode } = this
      if (parentNode != null) {
        parentNode.shouldSortChildNodes = true
      }
    }
  }

  /**
   * @type {boolean}
   */
  get isRootNode () {
    return !this.parentNode
  }

  /**
   * @type {SGNode}
   */
  get rootNode () {
    return this.parentNode && this.parentNode.rootNode || this
  }

  /**
   * @param {number} nodeType
   * @return {SGNode}
   */
  getRootNodeByType (nodeType) {
    if (nodeType === this.nodeType) {
      return this
    } else {
      return this.parentNode && this.parentNode.getRootNodeByType(nodeType)
    }
  }

  /**
   * @type {boolean}
   */
  get hasChildNodes () {
    return this.childNodes.length > 0
  }

  sortChildNodesByPriority () {
    this.childNodes.sort((a, b) => a.priority < b.priority)
  }

  reSortChildNodesByPriority () {
    if (this.shouldSortChildNodes) {
      this.sortChildNodesByPriority()
      this.shouldSortChildNodes = false
    }
  }

  containsChild (node) {
    const len = this.childNodes.length
    for (let i = 0; i < len; i++) {
      if (this.childNodes[i] === node) {
        return true
      }
    }
    return false
  }

  appendChild (node) {
    if (node && !this.containsChild(node)) {
      this.childNodes.push(node)
      this.shouldSortChildNodes = true
    }
    return this
  }

  forEachChild (callback, context) {
    this.reSortChildNodesByPriority()
    this.childNodes.forEach(node => callback.call(context, node))
    return this
  }

  /*
   * Depth-first traversal.
   * @param {function} [callbackBefore]
   * @param {function} [callbackAfter]
   * @param {function|function[]} [filterFunc]
   */
  traverse (callbackBefore, callbackAfter, filterFunc) {
    if (Array.isArray(filterFunc)) {
      for (let filter of filterFunc) {
        if (!filter(this)) {
          return
        }
      }
    } else if (filterFunc && !filterFunc(this)) {
      return
    }
    if (callbackBefore) {
      callbackBefore(this)
    }
    this.forEachChild(node => node.traverse(callbackBefore, callbackAfter, filterFunc))
    if (callbackAfter) {
      callbackAfter(this)
    }
  }

  /**
   * Find *first* node with given name.
   * Further nodes with same name will be ignored.
   * @param {string} name
   * @returns {SGNode|undefined}
   */
  findByName (name) {
    if (this.name === name) {
      return this
    }
    this.reSortChildNodesByPriority()
    const len = this.childNodes.length
    for (let i = 0; i < len; ++i) {
      let node = this.childNodes[i].findByName(name)
      if (node) {
        return node
      }
    }
  }

}

