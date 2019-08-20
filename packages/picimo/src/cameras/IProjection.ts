import { Camera } from "three";

export interface IProjection {

  camera: Camera;

  update(currentWidth: number, currentHeight: number): void;

}
