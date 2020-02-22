import {Scene, Camera} from 'three';
import {IProjection} from '.';

export class Stage2D extends Scene {
  projection: IProjection;
  scene: Scene;

  constructor(projection?: IProjection) {
    super();
    this.projection = projection;
  }

  get camera(): Camera {
    return this.projection && this.projection.camera;
  }

  resize(width: number, height: number) {
    const {projection} = this;
    if (projection) {
      projection.update(width, height);
    }
  }
}
