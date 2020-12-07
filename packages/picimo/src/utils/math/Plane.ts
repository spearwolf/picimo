import {
  Camera,
  Plane as THREE_Plane,
  Quaternion,
  Vector3,
  Matrix4,
} from 'three';

export class Plane {
  static XY = new Plane('xy');
  static XZ = new Plane('xz');

  position = new Vector3();

  readonly type: 'xy' | 'xz';
  readonly plane: THREE_Plane;

  // TODO allow THREE_Plane as input
  constructor(type: 'xy' | 'xz') {
    this.type = type;
    if (type === 'xy') {
      this.plane = new THREE_Plane(new Vector3(0, 0, 1));
    } else {
      // xz
      this.plane = new THREE_Plane(new Vector3(0, 1, 0));
    }
  }

  applyRotation(camera: Camera): void {
    camera.applyQuaternion(
      new Quaternion().setFromRotationMatrix(
        new Matrix4().lookAt(
          this.getPointByDistance(1),
          this.getPointByDistance(0),
          new Vector3(0, 1, 0),
        ),
      ),
    );
  }

  getPointByDistance(distanceToPlane: number): Vector3 {
    const {normal, constant} = this.plane;
    const camPos = normal.clone().multiplyScalar(constant);
    return camPos.add(normal.clone().multiplyScalar(distanceToPlane));
  }
}
