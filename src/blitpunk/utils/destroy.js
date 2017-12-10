import eventize from '@spearwolf/eventize'

export default function (obj) {
  if (typeof obj !== 'object') return
  if (obj.destroyed) return

  if (eventize.is(obj)) {
    obj.off()
  }

  Object.keys(obj).forEach(key => {
    delete obj[key]
  })

  Object.defineProperty(obj, 'destroyed', { value: true })
}
