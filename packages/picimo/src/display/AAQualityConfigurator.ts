import {TextureFactoryOptions} from '../textures';

import {Display} from './Display';
import {IConfigurator} from './IConfigurator';

import {WebGLRendererParameters, LinearFilter} from 'three';

export class AAQualityConfigurator implements IConfigurator {
  getWebGlRendererParameters(userParams?: WebGLRendererParameters) {
    return {
      ...(<WebGLRendererParameters>{
        precision: 'highp',
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
        stencil: false,
        alpha: true,
        antialias: true,
      }),
      ...userParams,
    };
  }

  getTextureFactoryOptions() {
    return <TextureFactoryOptions>{
      defaultAnisotrophy: Infinity,
      defaultFilter: LinearFilter,
    };
  }

  getPixelRatio() {
    return 0; // => use native pixel ratio from window.devicePixelRatio
  }

  postSetup(_display: Display) {}
}
