import {PerspectiveCamera} from 'three';

import {Plane} from '../utils';

import {IProjection} from './IProjection';
import {IProjectionRule} from './IProjectionRule';

import {IProjectionSpecs} from './IProjectionSpecs';
import {ProjectionRules} from './ProjectionRules';
import {calcViewSize} from './lib/calcViewSize';

const DEFAULT_DISTANCE = 300;
const DEFAULT_NEAR = 0.1;
const DEFAULT_FAR = 100000;

export type IParallaxProjectionSpecs = IProjectionSpecs & {
  /**
   * Should be between zero and the `distance`. Default is 0.1
   */
  near?: number;

  /**
   * Should be larger than the `distance` and large enough to include all releavant objects in your scene. Default is 100000.
   */
  far?: number;

  /**
   * The distance from the camera to the projection plane. Default is 300.
   */
  distance?: number;
};

export type ParallaxProjectionRule = IProjectionRule<IParallaxProjectionSpecs>;

export type ParallaxConfig =
  | IParallaxProjectionSpecs
  | ParallaxProjectionRule[];

export class ParallaxProjection implements IProjection {
  fovy: number;

  #camera: PerspectiveCamera;

  #width = 0;
  #height = 0;

  #pixelRatioH = 1;
  #pixelRatioV = 1;

  readonly #plane: Plane;
  readonly #config: ProjectionRules<ParallaxProjectionRule>;

  #initialDistance: number;

  constructor(plane: Plane, rules: ParallaxConfig) {
    this.#plane = plane;
    this.#config = ProjectionRules.create(rules);
  }

  getCamera(): PerspectiveCamera {
    return this.#camera;
  }

  getViewRect(): [number, number, number, number] {
    return [this.#width, this.#height, this.#pixelRatioH, this.#pixelRatioV];
  }

  updateViewRect(actualWidth: number, actualHeight: number): void {
    const {specs} = this.#config.findMatchingRule(actualWidth, actualHeight);

    const [viewWidth, viewHeight] = calcViewSize(
      actualWidth,
      actualHeight,
      specs,
    );
    this.#width = viewWidth;
    this.#height = viewHeight;

    this.#pixelRatioH = actualWidth / viewWidth;
    this.#pixelRatioV = actualHeight / viewHeight;

    const distance = specs.distance ?? DEFAULT_DISTANCE;
    const aspect = viewWidth / viewHeight;
    const halfHeight = viewHeight / 2;

    this.fovy = (2 * Math.atan(halfHeight / distance) * 180) / Math.PI;

    if (!this.#camera) {
      // === Create camera
      // TODO create one camera for each specs ?!
      const near = specs.near ?? DEFAULT_NEAR;
      const far = specs.far ?? DEFAULT_FAR;
      this.#camera = new PerspectiveCamera(this.fovy, aspect, near, far);
      this.#plane.applyRotation(this.#camera);
      this.#camera.position.copy(this.#plane.getPointByDistance(distance));
      this.#initialDistance = distance;
    } else {
      // === Update camera
      this.#camera.fov = this.fovy;
      this.#camera.aspect = aspect;
    }
    this.#camera.updateProjectionMatrix();
  }

  getZoom(distanceToProjectionPlane: number): number {
    if (distanceToProjectionPlane === 0) return 1;
    // TODO [initial=>current]distance === length(camera.position) ?!
    const d = this.#initialDistance - distanceToProjectionPlane;
    return (
      (Math.tan(((this.fovy / 2) * Math.PI) / 180) * d) / (this.#height / 2)
    );
  }
}
