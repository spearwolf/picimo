import {Camera, Quaternion, Vector3} from 'three';

import {Plane} from '../utils';

import {IProjection} from './IProjection';
import {IProjectionRule} from './IProjectionRule';
import {IProjectionSpecs} from './IProjectionSpecs';
import {ProjectionRules} from './ProjectionRules';
import {calcViewSize} from './lib/calcViewSize';

// const $origin = Symbol('origin');
const $distanceProp = Symbol('distanceProp');

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

  // private [$origin]: Vector2Proxy;
  private [$distanceProp]: 'x' | 'y' | 'z';

  constructor(plane: Plane, rules: Specs | IProjectionRule<Specs>[]) {
    this.plane = plane;
    this.rules = new ProjectionRules(
      Array.isArray(rules) ? rules : [{specs: rules}],
    );
  }

  update(currentWidth: number, currentHeight: number): void {
    const rule = this.rules.findMatchingRule(currentWidth, currentHeight);
    if (rule && rule.specs) {
      const [width, height] = calcViewSize(
        currentWidth,
        currentHeight,
        rule.specs,
      );

      this.pixelRatioH = currentWidth / width;
      this.pixelRatioV = currentHeight / height;

      this.updateOrtho(width, height, rule.specs);
    }
  }

  abstract updateOrtho(width: number, height: number, specs: Specs): void;

  // TODO remove!
  /*
  get origin(): Vector2Proxy {
    let v = this[$origin];
    if (!v) {
      const {camera} = this;
      if (camera) {
        const {plane} = this;
        v = new Vector2Proxy(
          camera.position,
          plane.type[0] as 'x',
          plane.type[1] as 'y' | 'z',
        );
        this[$origin] = v;
      }
    }
    return v;
  }
  */

  getZoom(_distanceToPojectionPlane: number): number {
    return 1;
  }

  protected applyPlaneRotation(): void {
    switch (this.plane.type) {
      case 'xz':
        this.camera.applyQuaternion(
          new Quaternion().setFromAxisAngle(
            new Vector3(1, 0, 0),
            Math.PI * -0.5,
          ),
        );
        this[$distanceProp] = 'y';
        break;

      case 'xy':
      default:
        this[$distanceProp] = 'z';
    }
  }

  protected applyCameraDistance(distance: number): void {
    this.camera.position[this[$distanceProp]] = distance;
  }
}
