import {WebGLRendererParameters, LinearFilter} from 'three';

import {ITextureFactoryOptions} from '../../textures';

import {Display} from '../Display';
import {IConfigurator} from '../IConfigurator';

export class AAPerformanceConfigurator implements IConfigurator {
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
    const options: ITextureFactoryOptions = {
      defaultAnisotrophy: 0,
      defaultFilter: LinearFilter,
    };
    return options;
  }

  getPixelRatio() {
    return 1;
  }

  postSetup(_display: Display) {}
}
