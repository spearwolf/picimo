import {WebGLRendererParameters, NearestFilter} from 'three';

import {TextureFactoryOptions} from '../../textures';
import {Stylesheets} from '../../utils';

import {Display} from '../Display';
import {IConfigurator} from '../IConfigurator';

/**
 * Activate pixel art mode.
 * Restrict the *device pixel ratio* to 1.
 * Set the `image-rendering` css style for the `<canvas>` element.
 * Use linear filter for textures by default.
 */
export class PixelatedConfigurator implements IConfigurator {
  getWebGlRendererParameters(userParams?: WebGLRendererParameters) {
    const params: WebGLRendererParameters = {
      precision: 'highp',
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
      stencil: false,
      alpha: true,
    };
    return {
      ...params,
      ...userParams,
    };
  }

  getTextureFactoryOptions() {
    const options: TextureFactoryOptions = {
      defaultAnisotrophy: 0,
      defaultFilter: NearestFilter,
    };
    return options;
  }

  getPixelRatio() {
    return 1;
  }

  postSetup(display: Display) {
    Stylesheets.addRule(
      display.canvas,
      'picimo-pixelated',
      `
      image-rendering: crisp-edges;
      image-rendering: pixelated;
    `,
    );
  }
}
