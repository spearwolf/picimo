import generateUuid from './generate_uuid'
import Serial from './serial'

/**
 * Represents a resource reference which points to a *renderable resource*.
 * Every resource has an id, serial and possible resource allocation *hints*.
 * The resource reference will be used by the resource library to find or
 * create *renderable resources* (like WebGlBuffer, WebGlTexture, ..).
 */
export default class ResourceRef {
  constructor (resource, hints = {}) {
    this.resource = resource
    this.hints = hints
    this.id = hints.id || generateUuid()
    this.serial = new Serial(typeof hints.serial === 'number' ? hints.serial : 1)
  }

  /**
   * @param {ResourceRef} sourceRef
   * @returns {boolean}
   */
  isSynced (sourceRef) {
    const { value } = this.serial
    return value > 0 && value === sourceRef.serial.value
  }

  /**
   * @param {ResourceRef} sourceRef
   * @returns {boolean}
   */
  needSync (sourceRef) {
    return !this.isSynced(sourceRef)
  }

  /**
   * @param {ResourceRef} sourceRef
   * @param {function} cb
   */
  sync (sourceRef, cb) {
    if (this.needSync(sourceRef)) {
      cb(this.resource)
      this.serial.value = sourceRef.serial.value
    }
  }
}
