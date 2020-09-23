import {Scene, Camera} from 'three';

import {Display} from '../display';
import {Logger} from '../utils';

import {IProjection} from '.';

const log = new Logger('picimo.Stage2D');

export class Stage2D extends Scene {
  renderOnFrame = true;

  private _projection: IProjection;
  private _currentWidth: number = 0;
  private _currentHeight: number = 0;

  constructor(projection?: IProjection) {
    super();
    this._projection = projection;
  }

  set projection(projection: IProjection) {
    this._projection = projection;
    projection.update(this._currentWidth, this._currentHeight);
  }

  get projection(): IProjection {
    return this._projection;
  }

  get camera(): Camera {
    return this._projection?.camera;
  }

  resize({width, height}: {width: number; height: number}) {
    const {projection} = this;
    if (projection) {
      this._currentWidth = width;
      this._currentHeight = height;
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
    const {camera, renderOnFrame} = this;
    if (camera && renderOnFrame) {
      display.renderer.render(this, camera);
    }
  }
}
