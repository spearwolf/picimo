import { OrthographicCamera, Quaternion, Vector3 } from "three";

import { Vector2Proxy } from "../../math";

import { calcViewSize } from "../calcViewSize";
import { IProjectionRule } from "../IProjectionRule";
import { IProjectionSpecs } from "../IProjectionSpecs";
import { ProjectionRules } from "../ProjectionRules";
import { IProjection } from "../IProjection";

export type IProjectionOrthographicSpecs = IProjectionSpecs & {

  near: number;
  far: number;

  distance: number;

};

export interface IProjectionOrthographicRule extends IProjectionRule {
  specs: IProjectionOrthographicSpecs;
}

const DEFAULT_DISTANCE = 1000;

const $origin = Symbol('origin');

export class OrthographicProjection implements IProjection {

  rules: ProjectionRules<IProjectionOrthographicRule>;

  width: number = 0;
  height: number = 0;

  camera: OrthographicCamera;

  private [$origin]: Vector2Proxy;

  constructor(rules: IProjectionOrthographicSpecs | IProjectionOrthographicRule[]) {
    this.rules = new ProjectionRules(Array.isArray(rules) ? rules : [{ specs: rules }]);
  }

  update(currentWidth: number, currentHeight: number) {
    const rule = this.rules.findMatchingRule(currentWidth, currentHeight);
    if (rule && rule.specs) {
      const [width, height] = calcViewSize(currentWidth, currentHeight, rule.specs);
      const { near, far, distance } = rule.specs;
      this.updateOrtho(width, height, near, far, distance || DEFAULT_DISTANCE);
    }
  }

  updateOrtho(width: number, height: number, near: number, far: number, distance: number) {

    this.width = width;
    this.height = height;

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

  get origin() {
    let v = this[$origin];
    if (!v) {
      const { camera } = this;
      if (camera) {
        v = new Vector2Proxy(camera.position, 'x', 'z');
        this[$origin] = v;
      }
    }
    return v;
  }

}
