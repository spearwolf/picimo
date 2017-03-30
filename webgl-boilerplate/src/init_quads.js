import VOPool from '../../src/core/v_o_pool'

export default function (resourceLibrary) {
  const quads = new VOPool(resourceLibrary.findDescriptor('simple'), 10)

  const [q0, q1] = quads.alloc(2)

  q0.setSize(0.25, 0.25)
  q0.setTranslate(0.25, 0.25)

  q1.setSize(0.25, 0.25)

  window.q0 = q0
  window.q1 = q1

  return quads
}
