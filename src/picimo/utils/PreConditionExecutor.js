import eventize from '@spearwolf/eventize'

export default class PreConditionExecutor {
  constructor (client, observeAttributes) {
    this.isInitialized = false
    this.client = client
    this.observedAttributes = observeAttributes
    this.attributeValuesCache = new Map()
    this.execute = this.execute.bind(this)
    eventize(this)
  }

  execute (...args) {
    if (!this.isInitialized) {
      if (this.observedAttributes.every(attr => Boolean(this.client[attr]))) {
        const firstTimeArg = {}
        this.observedAttributes.forEach(attr => {
          const value = this.client[attr]
          this.attributeValuesCache.set(attr, value)
          firstTimeArg[attr] = value
        })
        this.emit('initialize', firstTimeArg, this.client)
        this.isInitialized = true
        this.emit('execute', ...args)
      }
    } else {
      const attrValues = {}
      let hasChangedValues = false
      this.observedAttributes.forEach(attr => {
        const newValue = this.client[attr]
        const oldValue = this.attributeValuesCache.get(attr)
        if (newValue !== oldValue) {
          this.attributeValuesCache.set(attr, newValue)
          this.emit(`attributeChanged:${attr}`, newValue, oldValue)
          attrValues[attr] = newValue
          hasChangedValues = true
        }
      })
      if (hasChangedValues) {
        this.emit('attributeValuesChanged', attrValues)
      }
      this.emit('execute', ...args)
    }
  }
}
