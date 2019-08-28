import { OrthographicCamera, Quaternion, Vector3 } from "three";
import { IProjectionSpecs } from "../IProjectionSpecs";
import { Projection } from "./Projection";

const DEFAULT_DISTANCE = 1000;

export type IProjectionOrthographicSpecs = IProjectionSpecs & {

  near: number;
  far: number;

  distance: number;

};

export class OrthographicProjection extends Projection<IProjectionOrthographicSpecs, OrthographicCamera> {

  updateOrtho(width: number, height: number, specs: IProjectionOrthographicSpecs) {

    this.width = width;
    this.height = height;

    const { near, far } = specs;
    const distance = specs.distance || DEFAULT_DISTANCE;

    const [halfWidth, halfHeight] = [width / 2, height / 2];

    const { camera } = this;
    if (!camera) {

      this.camera = new OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, near, far);
      this.camera.applyQuaternion(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI * -0.5));
      this.camera.position.y = distance;

    } else {

      camera.left = -halfWidth;
      camera.right = halfWidth;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.near = near;
      camera.far = far;

      camera.position.y = distance;

      camera.updateProjectionMatrix();

    }
  }
}
