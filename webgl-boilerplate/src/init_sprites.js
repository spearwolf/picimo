import VODescriptor from 'blitpunk/core/v_o_descriptor'
import VOPool from 'blitpunk/core/v_o_pool'

export default function () {
  const voDescriptor = new VODescriptor({
    vertexCount: 3, // => triangle
    attributes: [
      { name: 'position', type: 'float32', size: 2, attrNames: [ 'x', 'y' ] }
    ]
  })

  const voPool = new VOPool(voDescriptor, { capacity: 4, usage: VOPool.USAGE.STATIC })
  window.trianglePool = voPool

  voPool.alloc().setPosition(-1.0, -1.0, 0.49, -1.0, -1.0, 1.0)
  voPool.alloc().setPosition(0.49, -1.0, 0.49, 1.0, -1.0, 1.0)

  voPool.alloc().setPosition(0.5, -1.0, 1.0, -1.0, 0.5, 1.0)
  voPool.alloc().setPosition(1.0, -1.0, 1.0, 1.0, 0.5, 1.0)

  return voPool
}
