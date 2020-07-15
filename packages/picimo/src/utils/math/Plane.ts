import {Plane as ThreePlane, Vector3} from 'three';

export class Plane {
  static XY = new Plane('xy');
  static XZ = new Plane('xz');

  readonly type: 'xy' | 'xz';
  readonly threePlane: ThreePlane;

  constructor(type: 'xy' | 'xz') {
    this.type = type;
    if (type === 'xy') {
      this.threePlane = new ThreePlane();
    } else {
      this.threePlane = new ThreePlane(new Vector3(0, 1, 0));
    }
  }
}
