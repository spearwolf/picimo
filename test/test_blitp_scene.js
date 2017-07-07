/* eslint-env mocha */
import { assert } from 'chai'

import '../src/blitpunk.js'

import {
  SG_CANVAS,
  SG_SCENE
} from '../src/scene_graph/constants.js'

import {
  BLITP_SCENE_ELEMENT,
  BLITP_CANVAS_ELEMENT
} from '../src/dom/constants'

describe('<blitp-scene />', () => {
  let canvas
  let scene
  let subscene

  before(() => {
    canvas = document.createElement(BLITP_CANVAS_ELEMENT)
    document.body.appendChild(canvas)

    scene = document.createElement(BLITP_SCENE_ELEMENT)
    canvas.appendChild(scene)

    subscene = document.createElement(BLITP_SCENE_ELEMENT)
    scene.appendChild(subscene)
  })

  after(() => {
    document.body.removeChild(canvas)
  })

  describe('canvas', () => {
    it('.blitpNodeName', () => {
      assert.equal(canvas.blitpNodeName, 'BLITP-CANVAS')
    })
    it('.sgNode', () => {
      assert.equal(canvas.sgNode.nodeType, SG_CANVAS)
      assert.isTrue(canvas.sgNode.isRootNode)
    })
  })

  describe('scene', () => {
    it('.blitpNodeName', () => {
      assert.equal(scene.blitpNodeName, 'BLITP-SCENE')
    })
    it('.parentBlitpElement', () => {
      assert.equal(scene.parentBlitpElement, canvas)
    })
    it('.sgNode', () => {
      assert.equal(scene.sgNode.nodeType, SG_SCENE)
      assert.equal(scene.sgNode.parentNode, canvas.sgNode)
    })
  })

  describe('sub scene', () => {
    it('.blitpNodeName', () => {
      assert.equal(subscene.blitpNodeName, 'BLITP-SCENE')
    })
    it('.parentBlitpElement', () => {
      assert.equal(subscene.parentBlitpElement, scene)
    })
    it('.sgNode', () => {
      assert.equal(subscene.sgNode.nodeType, SG_SCENE)
      assert.equal(subscene.sgNode.parentNode, scene.sgNode)
    })
  })
})