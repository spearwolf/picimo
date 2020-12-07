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
export class Stage2D extends Scene {
  renderOnFrame = true;

  #projection: IProjection;

  #curProjWidth = 0;
  #curProjHeight = 0;

  constructor(projection?: IProjection) {
    super();
    this.#projection = projection;
  }

  set projection(projection: IProjection) {
    this.#projection = projection;
    projection.update(this.#curProjWidth, this.#curProjHeight);
  }

  get projection(): IProjection {
    return this.#projection;
  }

  get camera(): Camera {
    return this.#projection?.camera;
  }

  /**
   * Update the projection.
   * Should be called whenever the 2d dimension of the render target changes.
   */
  resize({width, height}: {width: number; height: number}): void {
    const {projection} = this;
    if (projection) {
      const prevWidth = this.#curProjWidth;
      const prevHeight = this.#curProjHeight;
      if (prevWidth !== width || prevHeight !== height) {
        this.#curProjWidth = width;
        this.#curProjHeight = height;
        projection.update(width, height);
        if (log.DEBUG) {
          log.log(
            `resize: ${width}x${height}, projection: ${projection.width}x${projection.height}`,
          );
        }
      }
    }
  }

  /**
   * Render the scene with the camera from the projection.
   * But does not do anything, if `renderOnFrame` is `false`.
   */
  frame({display}: {display: Display}): void {
    const {camera, renderOnFrame} = this;
    if (camera && renderOnFrame) {
      display.renderer.render(this, camera);
    }
  }
}
