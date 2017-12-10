
export default class Serial {
  /**
   * @param {number} [initialValue=1]
   */
  constructor (initialValue = 1) {
    this.value = initialValue
  }

  touch () {
    ++this.value
  }
}
