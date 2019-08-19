
export interface IProjectionConstraints {

  /**
   * `portait`: the height is greater than or equal to the width
   * 
   * `landscape`: the width is greater than the height
   */
  orientation?: 'portrait' | 'landscape';

  minWidth?: number;
  maxWidth?: number;

  minHeight?: number;
  maxHeight?: number;

}

export interface IProjectionViewFrustum {

  top: number;
  bottom: number;

  left: number;
  right: number;

  near: number;
  far: number;

}

export interface IProjectionSpecsPixelZoom {

  /**
   * With this _exclusive_ option the size of the camera view frustum is defined by the _css pixel size_ of the html canvas and a _multiplier_.
   * 
   * If this option is used all other specs have no effect.
   * 
   * i.e., if set to `2` while the canvas size is `320x240` then the view size is `160x120` pixels.
   */
  pixelZoom: number;

}

export interface IProjectionSpecsViewFrustumSize {

  /**
   * The desired width.
   * But the final width may be different, depending on the `fit` option and the viewport size.
   */
  width?: number;

  /**
   * The desired height.
   * But the final height may be different, depending on the `fit` option and the viewport size.
   */
  height?: number;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
   */
  fit: 'contain' | 'cover' | 'fill';

}

export type IProjectionSpecs = IProjectionSpecsPixelZoom | IProjectionSpecsViewFrustumSize;

export interface IProjectionRule {

  constraints?: IProjectionConstraints;

  specs: IProjectionSpecs;

}

export interface IProjectionOptions {

  rules: IProjectionRule[];

}

export function calcViewSize(currentWidth: number, currentHeight: number, specs: IProjectionSpecs) {

  let width;
  let height;

  if (typeof (specs as IProjectionSpecsPixelZoom).pixelZoom === 'number') {

    const { pixelZoom } = specs as IProjectionSpecsPixelZoom;

    width = currentWidth / pixelZoom;
    height = currentHeight / pixelZoom;

  } else {

    const {
      fit,
      width: desiredWidth,
      height: desiredHeight,
    } = specs as IProjectionSpecsViewFrustumSize;

    if (fit === 'fill') {

      width = desiredWidth;
      height = desiredHeight;

    } else {  // cover || contain

      const currentRatio = currentHeight / currentWidth; // <1 : landscape, >1 : portrait
      const desiredRatio = desiredHeight / desiredWidth;
      const isCover = fit === 'cover';

      width = desiredWidth;
      height = desiredHeight;

      if ((desiredWidth === 0 && desiredHeight > 0) || currentRatio < desiredRatio || (currentRatio === 1 && desiredRatio > 1)) {
        
        width = (desiredHeight / currentHeight) * currentWidth;
        if (isCover) {
          const factor = desiredWidth / width;
          width *= factor;
          height *= factor;
        }

      } else if ((desiredWidth > 0 && desiredHeight === 0) || currentRatio > desiredRatio || (currentRatio === 1 && desiredRatio < 1)) {

        height = (desiredWidth / currentWidth) * currentHeight;
        if (isCover) {
          const factor = desiredHeight / height;
          width *= factor;
          height *= factor;
        }

      }
    }
  }

  return [width, height];
}


/**
 * A `Projection` is configured with list of **rules** similar to _css styles and media queries_.
 * 
 * A rule may have one or more **constraints**. The first rule applies where constraints fit.
 * 
 * If a rule has no constraints it always fits.
 * 
 * A rule has a **specs** section in which the camera is configured by one or more options.
 */
export class Projection {

  rules: IProjectionRule[];

  constructor(options: IProjectionOptions) {
    if (options) {
      this.rules = options.rules;
    }
  }

  findMatchingRule(width: number, height: number) {

    const curOrientation = height >= width ? 'portrait' : 'landscape';

    const { rules } = this;
    return rules && rules.find(rule => {
      const { constraints } = rule;
      if (constraints) {
        const { orientation } = constraints;
        if (orientation && orientation !== curOrientation) {
          return false;
        }
        const { minWidth } = constraints;
        if (minWidth > 0 && width < minWidth) {
          return false;
        }
        const { minHeight } = constraints;
        if (minHeight > 0 && height < minHeight) {
          return false;
        }
        const { maxWidth } = constraints;
        if (maxWidth > 0 && width > maxWidth) {
          return false;
        }
        const { maxHeight } = constraints;
        if (maxHeight > 0 && height > maxHeight) {
          return false;
        }
      }
      return true;
    });
  }

}
