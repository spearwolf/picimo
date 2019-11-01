import {IConfigurator} from './IConfigurator';
import {WebGLRendererParameters, LinearFilter} from 'three';
import {TextureUtilsOptions} from '../../textures';
import {Display} from './Display';

export class AAPerformanceConfigurator implements IConfigurator {

  getWebGlRendererParameters(userParams?: WebGLRendererParameters) {
    return {
      ... <WebGLRendererParameters>{
        precision: 'highp',
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
        stencil: false,
        alpha: true,
        antialias: true,
      },
      ... userParams,
    };
  }

  getTextureUtilsOptions() {
    return <TextureUtilsOptions>{
      defaultAnisotrophy: 0,
      defaultFilter: LinearFilter,
    };
  }

  getPixelRatio() {
    return 1;
  }

  postSetup(_display: Display) { }

}
