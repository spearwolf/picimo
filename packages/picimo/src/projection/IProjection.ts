import {Camera} from 'three';

export interface IProjection {
  getCamera(): Camera;

  updateViewRect(width: number, height: number): void;

  /**
   * @returns [width, height, pixelRatioH, pixelRatioV]
   */
  getViewRect(): [number, number, number, number];

  /**
   * Calculate zoom factor (in relation to the projection plane)
   */
  getZoom(distanceToProjectionPlane: number): number;

  // TODO setZoom(baseFactor) ?! --> NO, only for ParallaxProjection
}
