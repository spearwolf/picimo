import { Camera, Quaternion, Vector3 } from "three";

import { Plane, Vector2Proxy } from "../../math";

import { calcViewSize } from "../calcViewSize";
import { IProjectionRule } from "../IProjectionRule";
import { IProjectionSpecs } from "../IProjectionSpecs";
import { ProjectionRules } from "../ProjectionRules";
import { IProjection } from "./IProjection";

const $origin = Symbol('origin');
const $distanceProp = Symbol('distanceProp');

export abstract class Projection<Specs extends IProjectionSpecs, Cam extends Camera> implements IProjection {

  readonly plane: Plane;

  rules: ProjectionRules<IProjectionRule<Specs>>;

  width: number = 0;
  height: number = 0;

  pixelRatioH: number = 1;
  pixelRatioV: number = 1;

  camera: Cam;

  private [$origin]: Vector2Proxy;
  private [$distanceProp]: 'x' | 'y' | 'z';

  constructor(plane: Plane, rules: Specs | IProjectionRule<Specs>[]) {
    this.plane = plane;
    this.rules = new ProjectionRules(Array.isArray(rules) ? rules : [{ specs: rules }]);
  }

  update(currentWidth: number, currentHeight: number) {
    const rule = this.rules.findMatchingRule(currentWidth, currentHeight);
    if (rule && rule.specs) {
      const [width, height] = calcViewSize(currentWidth, currentHeight, rule.specs);

      this.pixelRatioH = currentWidth / width;
      this.pixelRatioV = currentHeight / height;

      this.updateOrtho(width, height, rule.specs);
    }
  }

  abstract updateOrtho(width: number, height: number, specs: Specs): void;

  get origin() {
    let v = this[$origin];
    if (!v) {
      const { camera } = this;
      if (camera) {
        const { plane } = this;
        v = new Vector2Proxy(camera.position, plane.type[0] as 'x', plane.type[1] as 'y' | 'z');
        this[$origin] = v;
      }
    }
    return v;
  }

  getZoom(_distanceToPojectionPlane: number) {
    return 1;
  }

  protected applyPlaneRotation() {
    switch (this.plane.type) {
      case 'xz':
        this.camera.applyQuaternion(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI * -0.5));
        this[$distanceProp] = 'y';
        break;

      case 'xy':
      default:
        this[$distanceProp] = 'z';
    }
  }

  protected applyCameraDistance(distance: number) {
    this.camera.position[this[$distanceProp]] = distance;
  }
}
