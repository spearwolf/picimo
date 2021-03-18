import {Scene, Camera} from 'three';

import {Display} from '../display';
import {Logger} from '../utils';

import {IProjection} from '.';

const log = new Logger('picimo.Stage2D');

/**
 * A `Stage2D` is a `THREE.Scene` with a `Projection`.
 *
 * This helper class does not bring new features, but simplifies the handling of
 * a `THREE.Scene`, `THREE.Camera`, `Projection` and `Display`.
 *
 * It offers the `resize()` and `frame()` methods, with which you can easily connect to
 * the 'Display' class: `display.on(stage2d)`
 *
 * The `resize()` method updates the projection and should be called whenever
 * the 2d dimension of the render target changes.
 *
 * The `frame()` method renders the scene with the camera from the projection.
 */
export class Stage2D {
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

  /**
   * Update the projection.
   * Should be called whenever the 2d dimension of the render target changes.
   */
  resize({width, height}: {width: number; height: number}): void {
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
  frame({display}: {display: Display}): void {
    if (this.camera && this.renderOnFrame) {
      display.renderer.render(this.scene, this.camera);
    }
  }
}
