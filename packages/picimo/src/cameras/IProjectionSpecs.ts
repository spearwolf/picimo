
export interface IProjectionPixelZoomSpecs {

  /**
   * With this _exclusive_ option the size of the camera view frustum is defined by the _css pixel size_ of the html canvas and a _multiplier_.
   *
   * If this option is used all other specs have no effect.
   *
   * i.e., if set to `2` while the canvas size is `320x240` then the view size is `160x120` pixels.
   */
  pixelZoom: number;

}

export interface IProjectionViewFrustumSizeSpecs {

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

export type IProjectionSpecs = IProjectionPixelZoomSpecs | IProjectionViewFrustumSizeSpecs;
