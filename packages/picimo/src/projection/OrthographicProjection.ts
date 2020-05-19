import {OrthographicCamera} from 'three';

import {IProjectionSpecs} from './IProjectionSpecs';
import {Projection} from './Projection';

const DEFAULT_DISTANCE = 100;
const DEFAULT_NEAR = 0.1;
const DEFAULT_FAR = 100000;

export type IOrthographicProjectionSpecs = IProjectionSpecs & {
  /**
   * Should be between zero and the `distance`. Default is 0.1
   */
  near?: number;

  /**
   * Should be larger than the `distance` and large enough to include all releavant objects in your scene. Default is 100000.
   */
  far?: number;

  /**
   * The distance from the camera to the projection plane. Default is 100.
   */
  distance?: number;
};

export class OrthographicProjection extends Projection<
  IOrthographicProjectionSpecs,
  OrthographicCamera
> {
  updateOrtho(
    width: number,
    height: number,
    specs: IOrthographicProjectionSpecs,
  ) {
    this.width = width;
    this.height = height;

    const near = specs.near ?? DEFAULT_NEAR;
    const far = specs.far ?? DEFAULT_FAR;
    const distance = specs.distance ?? DEFAULT_DISTANCE;

    const [halfWidth, halfHeight] = [width / 2, height / 2];

    const {camera} = this;
    if (!camera) {
      // === Create camera
      this.camera = new OrthographicCamera(
        -halfWidth,
        halfWidth,
        halfHeight,
        -halfHeight,
        near,
        far,
      );
      this.applyPlaneRotation();
      this.applyCameraDistance(distance);
    } else {
      // Update camera
      camera.left = -halfWidth;
      camera.right = halfWidth;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.near = near;
      camera.far = far;
      camera.updateProjectionMatrix();
    }
  }
}
