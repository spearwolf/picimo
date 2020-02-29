import {WebGLRendererParameters, LinearFilter} from 'three';

import {TextureFactoryOptions} from '../textures';

import {Display} from './Display';
import {IConfigurator} from './IConfigurator';

export class AAPerformanceConfigurator implements IConfigurator {
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
      defaultAnisotrophy: 0,
      defaultFilter: LinearFilter,
    };
  }

  getPixelRatio() {
    return 1;
  }

  postSetup(_display: Display) {}
}
