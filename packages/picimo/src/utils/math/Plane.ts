import {Camera, Plane as THREE_Plane, Quaternion, Vector3} from 'three';

export class Plane {
  static XY = new Plane('xy');
  static XZ = new Plane('xz');

  position = new Vector3();

  readonly type: 'xy' | 'xz';
  readonly plane: THREE_Plane;

  // TODO remove and use a THREE_Plane based solution
  readonly distancePropName: 'y' | 'z';

  // TODO allow THREE_Plane as input
  constructor(type: 'xy' | 'xz') {
    this.type = type;
    if (type === 'xy') {
      this.plane = new THREE_Plane();
      this.distancePropName = 'z';
    } else {
      this.plane = new THREE_Plane(new Vector3(0, 1, 0));
      this.distancePropName = 'y';
    }
  }

  applyRotation(camera: Camera): void {
    if (this.type === 'xz') {
      camera.applyQuaternion(
        new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI * -0.5),
      );
    }
  }

  getPointByDistance(distanceToPlane: number): Vector3 {
    const {normal, constant} = this.plane;
    const camPos = normal.clone().multiplyScalar(constant);
    return camPos.add(normal.clone().multiplyScalar(distanceToPlane));
  }
}
