const snakeCase = require('lodash/snakeCase')

export default class BlendMode {
  constructor (enable, sfactor = null, dfactor = null) {
    this.enable = enable
    this.sfactor = sfactor
    this.dfactor = dfactor
  }

  set sfactor (value) {
    this._sfactor = typeof value === 'string' ? snakeCase(value).toUpperCase() : undefined
  }

  get sfactor () {
    return this._sfactor
  }

  set dfactor (value) {
    this._dfactor = typeof value === 'string' ? snakeCase(value).toUpperCase() : undefined
  }

  get dfactor () {
    return this._dfactor
  }

  isEqual (other) {
    return other && this.enable === other.enable && this._sfactor === other._sfactor && this._dfactor === other._dfactor
  }
}
