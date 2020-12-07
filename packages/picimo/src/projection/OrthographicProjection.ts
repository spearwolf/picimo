import {OrthographicCamera} from 'three';

import {Plane} from '../utils';

import {IProjection} from './IProjection';
import {IProjectionRule} from './IProjectionRule';

import {IProjectionSpecs} from './IProjectionSpecs';
import {ProjectionRules} from './ProjectionRules';
import {calcViewSize} from './lib/calcViewSize';

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

export type OrthographicProjectionRule = IProjectionRule<IOrthographicProjectionSpecs>;

export type OrthographicConfig =
  | IOrthographicProjectionSpecs
  | OrthographicProjectionRule[];

export class OrthographicProjection implements IProjection {
  camera: OrthographicCamera;

  width = 0;
  height = 0;

  pixelRatioH = 1;
  pixelRatioV = 1;

  readonly #plane: Plane;
  readonly #config: ProjectionRules<OrthographicProjectionRule>;

  constructor(plane: Plane, rules: OrthographicConfig) {
    this.#plane = plane;
    this.#config = ProjectionRules.create(rules);
  }

  update(actualWidth: number, actualHeight: number): void {
    const {specs} = this.#config.findMatchingRule(actualWidth, actualHeight);

    const [viewWidth, viewHeight] = calcViewSize(
      actualWidth,
      actualHeight,
      specs,
    );
    this.width = viewWidth;
    this.height = viewHeight;

    this.pixelRatioH = actualWidth / viewWidth;
    this.pixelRatioV = actualHeight / viewHeight;

    const near = specs.near ?? DEFAULT_NEAR;
    const far = specs.far ?? DEFAULT_FAR;
    const [halfWidth, halfHeight] = [viewWidth / 2, viewHeight / 2];

    if (!this.camera) {
      // === Create camera
      // TODO create one camera for each specs ?!
      this.camera = new OrthographicCamera(
        -halfWidth,
        halfWidth,
        halfHeight,
        -halfHeight,
        near,
        far,
      );
      this.#plane.applyRotation(this.camera);
      this.camera.position[this.#plane.distancePropName] =
        specs.distance ?? DEFAULT_DISTANCE;
    } else {
      // Update camera
      this.camera.left = -halfWidth;
      this.camera.right = halfWidth;
      this.camera.top = halfHeight;
      this.camera.bottom = -halfHeight;
      this.camera.near = near;
      this.camera.far = far;
    }
    this.camera.updateProjectionMatrix();
  }

  getZoom(_distanceToPojectionPlane: number): number {
    return 1;
  }
}
