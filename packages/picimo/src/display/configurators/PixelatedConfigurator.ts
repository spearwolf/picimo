import {WebGLRendererParameters} from 'three';

import {TextureOptionClasses} from '../../textures';
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
  getWebGlRendererParameters(
    userParams?: WebGLRendererParameters,
  ): WebGLRendererParameters {
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

  getTextureFactoryOptions(): Array<TextureOptionClasses> {
    return ['anisotrophy', 'nearest'];
  }

  getPixelRatio(): number {
    return 1;
  }

  postSetup(display: Display): void {
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
