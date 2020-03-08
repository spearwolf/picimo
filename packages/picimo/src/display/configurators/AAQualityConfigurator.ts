import {WebGLRendererParameters, LinearFilter} from 'three';

import {TextureFactoryOptions} from '../../textures';

import {Display} from '../Display';
import {IConfigurator} from '../IConfigurator';

export class AAQualityConfigurator implements IConfigurator {
  getWebGlRendererParameters(userParams?: WebGLRendererParameters) {
    const params: WebGLRendererParameters = {
      precision: 'highp',
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
      stencil: false,
      alpha: true,
      antialias: true,
    };
    return {
      ...params,
      ...userParams,
    };
  }

  getTextureFactoryOptions() {
    const options: TextureFactoryOptions = {
      defaultAnisotrophy: Infinity,
      defaultFilter: LinearFilter,
    };
    return options;
  }

  getPixelRatio() {
    return 0; // => use native pixel ratio from window.devicePixelRatio
  }

  postSetup(_display: Display) {}
}
