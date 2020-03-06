import {IProjectionSpecs} from './IProjectionSpecs';
import {Projection} from './Projection';

import {PerspectiveCamera} from 'three';
// import { Logger } from "../../utils";

const DEFAULT_DISTANCE = 300;
const DEFAULT_NEAR = 0.0001;
const DEFAULT_FAR = 1000;

export type IParallaxProjectionSpecs = IProjectionSpecs & {
  /**
   * Should be between zero and the `distance`. Default is 0.00001
   */
  near?: number;

  /**
   * Should be larger than the `distance` and large enough to include all releavant objects in your scene. Default is 1000.
   */
  far?: number;

  /**
   * The distance from the camera to the projection plane. Default is 300.
   */
  distance?: number;
};

// const logger = new Logger('ParallaxProjection', 1000, 4); // XXX remove me

export class ParallaxProjection extends Projection<
  IParallaxProjectionSpecs,
  PerspectiveCamera
> {
  distance: number;
  fovy: number;

  updateOrtho(width: number, height: number, specs: IParallaxProjectionSpecs) {
    this.width = width;
    this.height = height;

    const near = specs.near || DEFAULT_NEAR;
    const far = specs.far || DEFAULT_FAR;
    const distance = specs.distance || DEFAULT_DISTANCE;

    this.distance = distance;

    const aspect = width / height;
    const halfHeight = height / 2;
    const fovy = (2 * Math.atan(halfHeight / distance) * 180) / Math.PI;

    this.fovy = fovy;

    const {camera} = this;
    if (!camera) {
      this.camera = new PerspectiveCamera(fovy, aspect, near, far);
      this.applyPlaneRotation();
      this.applyCameraDistance(distance);
    } else {
      camera.fov = fovy;
      camera.aspect = aspect;

      // camera.position.y = distance;
      this.applyCameraDistance(distance);

      camera.updateProjectionMatrix();
    }
  }

  getZoom(distanceToProjectionPlane: number) {
    if (distanceToProjectionPlane === 0) return 1;
    const d = this.distance - distanceToProjectionPlane;
    const z =
      (Math.tan(((this.fovy / 2) * Math.PI) / 180) * d) / (this.height / 2);
    // logger.log('zoom=', z, 'width=', this.width, 'height=', this.height, 'distance=', d); // XXX remove me
    return z;
  }
}
