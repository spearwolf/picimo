import { Camera, Vector2 } from "three";

export interface IProjection {

  camera: Camera;

  update(currentWidth: number, currentHeight: number): void;

  width: number;
  height: number;

  pixelRatio: number;

  origin: Vector2;

}
