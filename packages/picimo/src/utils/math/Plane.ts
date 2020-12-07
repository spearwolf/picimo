import {Camera, Plane as ThreePlane, Quaternion, Vector3} from 'three';

export class Plane {
  static XY = new Plane('xy');
  static XZ = new Plane('xz');

  readonly type: 'xy' | 'xz';
  readonly threePlane: ThreePlane;
  readonly distancePropName: 'y' | 'z';

  constructor(type: 'xy' | 'xz') {
    this.type = type;
    if (type === 'xy') {
      this.threePlane = new ThreePlane();
      this.distancePropName = 'y';
    } else {
      this.threePlane = new ThreePlane(new Vector3(0, 1, 0));
      this.distancePropName = 'z';
    }
  }

  applyRotation(camera: Camera): void {
    if (this.type === 'xz') {
      camera.applyQuaternion(
        new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI * -0.5),
      );
    }
  }
}
