import { Quaternion, Vector3, PerspectiveCamera } from "three";
import { IProjectionSpecs } from "../IProjectionSpecs";
import { Projection } from "./Projection";

const DEFAULT_DISTANCE = 100;

export type IProjectionPerspectiveSpecs = IProjectionSpecs & {

  near: number;
  far: number;

  distance: number;

};

export class PerspectiveProjection extends Projection<IProjectionPerspectiveSpecs, PerspectiveCamera> {

  updateOrtho(width: number, height: number, specs: IProjectionPerspectiveSpecs) {

    this.width = width;
    this.height = height;

    const { near, far } = specs;
    const distance = specs.distance || DEFAULT_DISTANCE;

    const aspect = width / height;
    const halfHeight = height / 2;
    const fovy = 2 * Math.atan(halfHeight / distance) * 180 / Math.PI;

    const { camera } = this;
    if (!camera) {

      this.camera = new PerspectiveCamera(fovy, aspect, near, far);
      this.camera.applyQuaternion(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI * -0.5));
      this.camera.position.y = distance;

      // this.camera = new OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, near, far);
      // this.camera.applyQuaternion(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI * -0.5));
      // this.camera.position.y = distance;

    } else {

      camera.fov = fovy;
      // camera.left = -halfWidth;
      // camera.right = halfWidth;
      // camera.top = halfHeight;
      // camera.bottom = -halfHeight;
      camera.near = near;
      camera.far = far;

      camera.position.y = distance;

      camera.updateProjectionMatrix();

    }
  }
}
