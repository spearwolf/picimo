/* eslint-env mocha */
import { assert } from 'chai'

import 'src/blitpunk.js'

import {
  DOM_ELEM_CANVAS,
  NODE_NAME_CANVAS,
  DOM_ELEM_SCENE,
  NODE_NAME_SCENE
} from 'src/dom/constants'

describe(`<${DOM_ELEM_SCENE} />`, () => {
  let canvas
  let scene
  let subscene

  before(() => {
    canvas = document.createElement(DOM_ELEM_CANVAS)
    document.body.appendChild(canvas)

    scene = document.createElement(DOM_ELEM_SCENE)
    canvas.appendChild(scene)

    subscene = document.createElement(DOM_ELEM_SCENE)
    scene.appendChild(subscene)
  })

  after(() => {
    document.body.removeChild(canvas)
  })

  describe('canvas', () => {
    it('.blitpunkNodeName', () => {
      assert.equal(canvas.blitpunkNodeName, NODE_NAME_CANVAS)
    })
    it('.blitpunk', () => {
      assert(canvas.blitpunk)
    })
  })

  describe('scene', () => {
    it('.blitpunkNodeName', () => {
      assert.equal(scene.blitpunkNodeName, NODE_NAME_SCENE)
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
      // assert.equal(subscene.blitpunkNodeName, NODE_NAME_SCENE)
    // })
    // it('.blitpunkCanvas', () => {
      // assert.equal(subscene.blitpunkCanvas, canvas)
    // })
    // it('.blitpunk', () => {
      // assert.equal(subscene.blitpunk, canvas.blitpunk)
    // })
  // })
})
