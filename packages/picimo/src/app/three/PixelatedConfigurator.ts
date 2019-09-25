import {IConfigurator} from './Configurator';
import {WebGLRendererParameters, NearestFilter} from 'three';
import {TextureUtilsOptions} from '../../textures';
import {Display} from './Display';
import {Stylesheets} from '../../utils';

/**
 * Activate pixel art mode.
 * Restrict the *device pixel ratio* to 1.
 * Set the `image-rendering` css style for the `<canvas>` element.
 * Use linear filter for textures by default.
 */
export class PixelatedConfigurator implements IConfigurator {

  getWebGlRendererParameters(userParams?: WebGLRendererParameters) {
    return {
      ... <WebGLRendererParameters>{
        precision: 'highp',
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
        stencil: false,
        alpha: true,
      },
      ... userParams,
    };
  }

  getTextureUtilsOptions() {
    return <TextureUtilsOptions>{
      defaultAnisotrophy: 0,
      defaultFilter: NearestFilter,
    };
  }

  getPixelRatio() {
    return 1;
  }

  postSetup(display: Display) {
    Stylesheets.addRule(display.canvas, 'picimo-pixelated', `
      image-rendering: crisp-edges;
      image-rendering: pixelated;
    `);
  }

}
