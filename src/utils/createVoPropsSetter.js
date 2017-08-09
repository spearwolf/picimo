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
        const value = voProps[key]
        attrDesc.setValue(vo, value)
      }
    })
  }
}
