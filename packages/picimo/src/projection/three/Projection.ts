import { Camera } from "three";

import { Vector2Proxy } from "../../math";

import { calcViewSize } from "../calcViewSize";
import { IProjectionRule } from "../IProjectionRule";
import { IProjectionSpecs } from "../IProjectionSpecs";
import { ProjectionRules } from "../ProjectionRules";
import { IProjection } from "./IProjection";

const $origin = Symbol('origin');

const NO_ZOOM: [number, number] = [1, 1];

export abstract class Projection<Specs extends IProjectionSpecs, Cam extends Camera> implements IProjection {

  rules: ProjectionRules<IProjectionRule<Specs>>;

  width: number = 0;
  height: number = 0;

  pixelRatioH: number = 1;
  pixelRatioV: number = 1;

  camera: Cam;

  private [$origin]: Vector2Proxy;

  constructor(rules: Specs | IProjectionRule<Specs>[]) {
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
        v = new Vector2Proxy(camera.position, 'x', 'z');
        this[$origin] = v;
      }
    }
    return v;
  }

  getZoom(_distanceToPojectionPlane: number) {
    return NO_ZOOM;
  }
}
