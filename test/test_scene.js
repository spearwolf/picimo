/* eslint-env mocha */
import { assert } from 'chai'

import 'src/blitpunk.js'

import {
  BLITPUNK_CANVAS_ELEMENT,
  BLITPUNK_CANVAS_NODE_NAME,
  BLITPUNK_SCENE_ELEMENT,
  BLITPUNK_SCENE_NODE_NAME
} from 'src/dom/constants'

describe(`<${BLITPUNK_SCENE_ELEMENT} />`, () => {
  let canvas
  let scene
  let subscene

  before(() => {
    canvas = document.createElement(BLITPUNK_CANVAS_ELEMENT)
    document.body.appendChild(canvas)

    scene = document.createElement(BLITPUNK_SCENE_ELEMENT)
    canvas.appendChild(scene)

    subscene = document.createElement(BLITPUNK_SCENE_ELEMENT)
    scene.appendChild(subscene)
  })

  after(() => {
    document.body.removeChild(canvas)
  })

  describe('canvas', () => {
    it('.blitpunkNodeName', () => {
      assert.equal(canvas.blitpunkNodeName, BLITPUNK_CANVAS_NODE_NAME)
    })
    it('.blitpunk', () => {
      assert(canvas.blitpunk)
    })
  })

  describe('scene', () => {
    it('.blitpunkNodeName', () => {
      assert.equal(scene.blitpunkNodeName, BLITPUNK_SCENE_NODE_NAME)
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
      // assert.equal(subscene.blitpunkNodeName, BLITPUNK_SCENE_NODE_NAME)
    // })
    // it('.blitpunkCanvas', () => {
      // assert.equal(subscene.blitpunkCanvas, canvas)
    // })
    // it('.blitpunk', () => {
      // assert.equal(subscene.blitpunk, canvas.blitpunk)
    // })
  // })
})
