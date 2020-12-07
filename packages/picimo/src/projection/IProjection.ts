import {Camera} from 'three';

export interface IProjection {
  // TODO replace with getCamera()
  camera: Camera;

  // TODO replace props with getViewRect() => {width,height,pixelRatioH,pixelRationV}
  width: number;
  height: number;

  pixelRatioH: number;
  pixelRatioV: number;

  update(width: number, height: number): void;

  /**
   * Calculate zoom factor (in relation to the projection plane)
   */
  getZoom(distanceToProjectionPlane: number): number;
}
