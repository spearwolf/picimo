import {
  Plane as THREE_Plane,
  Quaternion,
  Vector3,
  Matrix4,
  Object3D,
} from 'three';

export type PlaneDescription = 'xy' | 'xz' | THREE_Plane;

/**
 * Holds a reference to `THREE.Plane` and offers some handy utility methods around it.
 *
 * The main reason why the current implementation is modeled as a class
 * and not as a loose collection of functions, is so that the user does not have to
 * deal with two different `Plane`-types (one from `THREE` and this one here)
 */
export class Plane {
  static XY = 'xy';
  static XZ = 'xz';

  plane: THREE_Plane;

  constructor(planeDescription: PlaneDescription) {
    if (planeDescription === 'xy') {
      this.plane = new THREE_Plane(new Vector3(0, 0, 1));
    } else if (planeDescription === 'xz') {
      // xz
      this.plane = new THREE_Plane(new Vector3(0, 1, 0));
    } else {
      // custom plane
      this.plane = planeDescription.clone();
    }
  }

  applyRotation(obj3d: Object3D): void {
    obj3d.applyQuaternion(
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
