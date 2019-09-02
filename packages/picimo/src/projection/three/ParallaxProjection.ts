import { Quaternion, Vector3, PerspectiveCamera } from "three";
import { IProjectionSpecs } from "../IProjectionSpecs";
import { Projection } from "./Projection";

const DEFAULT_DISTANCE = 100;
const DEFAULT_NEAR = 0.0001;
const DEFAULT_FAR = 1000;

export type IParallaxProjectionSpecs = IProjectionSpecs & {

  /**
   * Should be between zero and the `distance`. Default is 0.00001
   */
  near: number;

  /**
   * Should be larger than the `distance` and large enough to include all releavant objects in your scene. Default is 1000.
   */
  far: number;

  /**
   * The distance from the camera to the projection plane. Default is 100.
   */
  distance: number;

};

export class ParallaxProjection extends Projection<IParallaxProjectionSpecs, PerspectiveCamera> {

  distance: number;
  fovy: number;

  updateOrtho(width: number, height: number, specs: IParallaxProjectionSpecs) {

    this.width = width;
    this.height = height;

    const near = specs.near || DEFAULT_NEAR;
    const far = specs.far || DEFAULT_FAR;
    const distance = specs.distance || DEFAULT_DISTANCE;

    const aspect = width / height;
    const halfHeight = height / 2;
    const fovy = 2 * Math.atan(halfHeight / distance) * 180 / Math.PI;

    this.distance = distance;
    this.fovy = fovy;

    const { camera } = this;
    if (!camera) {

      this.camera = new PerspectiveCamera(fovy, aspect, near, far);
      this.camera.applyQuaternion(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI * -0.5));
      this.camera.position.y = distance;

    } else {

      camera.fov = fovy;
      camera.aspect = aspect;

      camera.position.y = distance;

      camera.updateProjectionMatrix();

    }
  }

  getZoom(distanceToProjectionPlane: number) {
    const d = this.distance - distanceToProjectionPlane;
    const aspect = this.width / this.height;
    const x =  (Math.tan(this.fovy / 2 * Math.PI / 180) * d) / (this.height / 2);
    // console.log('x=', x, x * aspect, 'width=', this.width, 'height=', this.height, 'distance=', d);
    return [x * aspect, x] as [number, number];
  }
}
