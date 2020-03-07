import {Scene, Camera} from 'three';

import {Display} from '../display';
import {Logger} from '../utils';

import {IProjection} from '.';

const log = new Logger('picimo.Stage2D');

export class Stage2D extends Scene {
  projection: IProjection;

  constructor(projection?: IProjection) {
    super();
    this.projection = projection;
  }

  get camera(): Camera {
    return this.projection && this.projection.camera;
  }

  resize({width, height}: {width: number; height: number}) {
    const {projection} = this;
    if (projection) {
      projection.update(width, height);
      if (log.DEBUG) {
        log.log(
          `resize: ${width}x${height}, projection: ${projection.width}x${projection.height}`,
        );
      }
    } else if (log.DEBUG) {
      log.log(`resize: w=${width} h=${height}`);
    }
  }

  frame({display}: {display: Display}) {
    const {camera} = this;
    if (camera) {
      display.renderer.render(this, camera);
    }
  }
}
