/* eslint-env mocha */
import { assert } from 'chai'
import '../src/blitpunk.js'

import { SG_CANVAS, SG_SCENE } from '../src/scene_graph/constants.js'

import {
  BLITP_SCENE_ELEMENT,
  BLITP_CANVAS_ELEMENT
} from '../src/dom/constants'

describe('<blitp-scene />', () => {
  let blitpCanvas
  let blitpScene
  let blitpSubScene

  before(() => {
    blitpCanvas = document.createElement(BLITP_CANVAS_ELEMENT)
    document.body.appendChild(blitpCanvas)

    blitpScene = document.createElement(BLITP_SCENE_ELEMENT)
    blitpCanvas.appendChild(blitpScene)

    blitpSubScene = document.createElement(BLITP_SCENE_ELEMENT)
    blitpScene.appendChild(blitpSubScene)
  })

  after(() => {
    document.body.removeChild(blitpCanvas)
  })

  describe('canvas', () => {
    it('.sgNode', () => {
      assert.equal(blitpCanvas.sgNode.nodeType, SG_CANVAS)
      assert.isTrue(blitpCanvas.sgNode.isRootNode)
    })
  })

  describe('scene', () => {
    it('.parentBlitpElement', () => {
      assert.equal(blitpScene.parentBlitpElement, blitpCanvas)
    })
    it('.sgNode', () => {
      assert.equal(blitpScene.sgNode.nodeType, SG_SCENE)
      assert.equal(blitpScene.sgNode.parentNode, blitpCanvas.sgNode)
    })
  })

  describe('sub scene', () => {
    it('.parentBlitpElement', () => {
      assert.equal(blitpSubScene.parentBlitpElement, blitpScene)
    })
    it('.sgNode', () => {
      assert.equal(blitpSubScene.sgNode.nodeType, SG_SCENE)
      assert.equal(blitpSubScene.sgNode.parentNode, blitpScene.sgNode)
    })
  })
})
