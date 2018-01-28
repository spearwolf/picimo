import eventize from '@spearwolf/eventize'

export default function (obj) {
  if (typeof obj !== 'object' || obj === null) return
  if (obj.destroyed) return

  if (eventize.is(obj)) {
    obj.off()
  }

  Object.getOwnPropertySymbols(obj).concat(Object.getOwnPropertyNames(obj)).forEach(attr => {
    const value = obj[attr]
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        value.length = 0
      } else if (value instanceof Map || value instanceof WeakMap || value instanceof Set || value instanceof WeakSet) {
        value.clear()
      }
      obj[attr] = null
    }
  })

  Object.defineProperty(obj, 'destroyed', { value: true })
}
