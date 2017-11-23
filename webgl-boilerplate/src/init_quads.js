import VOPool from 'blitpunk/core/v_o_pool'

export default function (resourceLibrary) {
  const quads = new VOPool(resourceLibrary.findDescriptor('simple'), 10)
  window.quadsPool = quads

  const [q0, q1] = quads.alloc(2)

  q0.scale = 1
  q0.opacity = 1
  q0.setSize(128, 256)
  q0.setTranslate(-64, -128)

  q1.scale = 1
  q1.opacity = 1
  q1.setSize(128, 256)
  q1.setTranslate(64, 128)

  window.q0 = q0
  window.q1 = q1

  return quads
}
