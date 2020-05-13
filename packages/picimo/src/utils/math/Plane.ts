/**
 * @public
 */
export class Plane {
  static XY = new Plane('xy');
  static XZ = new Plane('xz');

  type: 'xy' | 'xz';

  constructor(type: 'xy' | 'xz') {
    this.type = type;
  }
}
