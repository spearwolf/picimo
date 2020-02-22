import {Camera, Vector2} from 'three';

export interface IProjection {
  camera: Camera;

  update(currentWidth: number, currentHeight: number): void;

  width: number;
  height: number;

  pixelRatioH: number;
  pixelRatioV: number;

  origin: Vector2;

  /**
   * Return zoom factor (in relation to the projection plane)
   */
  getZoom(distanceToProjectionPlane: number): number;
}
