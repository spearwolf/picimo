import {
  IProjectionSpecs,
  IProjectionSpecsPixelZoom,
  IProjectionSpecsViewFrustumSize,
} from "./IProjectionSpecs";

export function calcViewSize(currentWidth: number, currentHeight: number, specs: IProjectionSpecs) {

  let width;
  let height;
  let pixelRatio = 1;

  if (typeof (specs as IProjectionSpecsPixelZoom).pixelZoom === 'number') {

    const { pixelZoom } = specs as IProjectionSpecsPixelZoom;

    width = currentWidth / pixelZoom;
    height = currentHeight / pixelZoom;
    pixelRatio = pixelZoom;

  } else {

    const { fit, width: desiredWidth, height: desiredHeight, } = specs as IProjectionSpecsViewFrustumSize;

    if (fit === 'fill') {

      width = desiredWidth;
      height = desiredHeight;

      // TODO calculate pixelRatio

    } else { // cover || contain

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

      // TODO calculate pixelRatio
    }
  }

  return [width, height, pixelRatio];
}
