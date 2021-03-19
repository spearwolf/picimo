import {Scene, Camera} from 'three';

import {IProjection} from '../projection';
import {Logger} from '../utils';

import {
  IDisplayOnFrameParamters,
  IDisplayOnResizeParameters,
  IStage2D,
} from './types';

const log = new Logger('picimo.Stage2D');

export class Stage2D implements IStage2D {
  scene: Scene;

  renderOnFrame = true;

  #projection: IProjection;

  #currentWidth = 0;
  #currentHeight = 0;

  constructor(projection?: IProjection, scene?: Scene) {
    this.projection = projection;
    this.scene = scene ?? new Scene();
  }

  set projection(projection: IProjection) {
    this.#projection = projection;
    projection?.updateViewRect(this.#currentWidth, this.#currentHeight);
  }

  get projection(): IProjection {
    return this.#projection;
  }

  get camera(): Camera {
    return this.#projection?.getCamera();
  }

  get width(): number {
    return this.#currentWidth;
  }

  get height(): number {
    return this.#currentHeight;
  }

  resize({width, height}: IDisplayOnResizeParameters): void {
    const prevWidth = this.#currentWidth;
    const prevHeight = this.#currentHeight;
    if (prevWidth !== width || prevHeight !== height) {
      this.#currentWidth = width;
      this.#currentHeight = height;
      this.projection?.updateViewRect(width, height);
      if (log.DEBUG) {
        log.log(
          `resize: ${width}x${height}, projection: ${this.projection
            ?.getViewRect()
            .slice(0, 2)
            .join('x')}`,
        );
      }
    }
  }

  /**
   * Render the scene with the camera from the projection.
   * But does not do anything, if `renderOnFrame` is `false`.
   */
  frame({display}: IDisplayOnFrameParamters): void {
    if (this.camera && this.renderOnFrame) {
      display.renderer.render(this.scene, this.camera);
    }
  }
}
