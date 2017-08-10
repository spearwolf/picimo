import parseCssStyledProperties from './parseCssStyledProperties.js'

export default function createVoPropsSetter (voData) {
  if (!voData) return
  const voProps = parseCssStyledProperties(voData)
  if (!voProps || typeof voProps !== 'object') return
  const attrKeys = Object.keys(voProps)
  return (vo) => {
    attrKeys.forEach((key) => {
      const attrDesc = vo.descriptor.attr[key]
      if (attrDesc) {
        attrDesc.setValue(vo, voProps[key])
      } else if (typeof vo[key] === 'function') {
        vo[key](voProps[key])
      } else {
        vo[key] = voProps[key]
      }
    })
  }
}
