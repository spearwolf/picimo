/* eslint-env mocha */
import { assert } from 'chai'

import 'src/blitpunk.js'

import {
  BLITP_CANVAS_ELEMENT,
  BLITP_CANVAS_NODE_NAME,
  BLITP_SCENE_ELEMENT,
  BLITP_SCENE_NODE_NAME
} from 'src/dom/constants'

describe(`<${BLITP_SCENE_ELEMENT} />`, () => {
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
    it('.blitpunkNodeName', () => {
      assert.equal(canvas.blitpunkNodeName, BLITP_CANVAS_NODE_NAME)
    })
    it('.blitpunk', () => {
      assert(canvas.blitpunk)
    })
  })

  describe('scene', () => {
    it('.blitpunkNodeName', () => {
      assert.equal(scene.blitpunkNodeName, BLITP_SCENE_NODE_NAME)
    })
    it('.blitpunkCanvas', () => {
      assert.equal(scene.blitpunkCanvas, canvas)
    })
    it('.blitpunk', () => {
      assert.equal(scene.blitpunk, canvas.blitpunk)
    })
  })

  // describe('sub scene', () => {
    // it('.blitpunkNodeName', () => {
      // assert.equal(subscene.blitpunkNodeName, BLITP_SCENE_NODE_NAME)
    // })
    // it('.blitpunkCanvas', () => {
      // assert.equal(subscene.blitpunkCanvas, canvas)
    // })
    // it('.blitpunk', () => {
      // assert.equal(subscene.blitpunk, canvas.blitpunk)
    // })
  // })
})
