import {Camera, Quaternion, Vector3} from 'three';

import {Plane} from '../utils';

import {IProjection} from './IProjection';
import {IProjectionRule} from './IProjectionRule';
import {IProjectionSpecs} from './IProjectionSpecs';
import {ProjectionRules} from './ProjectionRules';
import {calcViewSize} from './lib/calcViewSize';

export abstract class Projection<
  Specs extends IProjectionSpecs,
  Cam extends Camera
> implements IProjection {
  readonly plane: Plane;

  rules: ProjectionRules<IProjectionRule<Specs>>;

  width = 0;
  height = 0;

  pixelRatioH = 1;
  pixelRatioV = 1;

  camera: Cam;

  #distancePropName: 'x' | 'y' | 'z';

  constructor(plane: Plane, rules: Specs | IProjectionRule<Specs>[]) {
    this.plane = plane;
    this.rules = ProjectionRules.create(rules);
  }

  update(currentWidth: number, currentHeight: number): void {
    const {specs} = this.rules.findMatchingRule(currentWidth, currentHeight);
    const [width, height] = calcViewSize(currentWidth, currentHeight, specs);

    this.pixelRatioH = currentWidth / width;
    this.pixelRatioV = currentHeight / height;

    this.updateOrtho(width, height, specs);
  }

  abstract updateOrtho(width: number, height: number, specs: Specs): void;

  getZoom(_distanceToPojectionPlane: number): number {
    return 1;
  }

  // TODO move to -> .createCamera()
  protected applyPlaneRotation(): void {
    switch (this.plane.type) {
      case 'xz':
        this.camera.applyQuaternion(
          new Quaternion().setFromAxisAngle(
            new Vector3(1, 0, 0),
            Math.PI * -0.5,
          ),
        );
        this.#distancePropName = 'y';
        break;

      case 'xy':
      default:
        this.#distancePropName = 'z';
    }
  }

  // TODO move to -> .createCamera()
  protected applyCameraDistance(distance: number): void {
    this.camera.position[this.#distancePropName] = distance;
  }
}
