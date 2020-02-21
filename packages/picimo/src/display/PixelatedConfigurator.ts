import {WebGLRendererParameters, NearestFilter} from 'three';
import {Stylesheets} from '../utils';
import {TextureUtilsOptions} from '../textures';
import {IConfigurator} from './IConfigurator';
import {Display} from './Display';

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
