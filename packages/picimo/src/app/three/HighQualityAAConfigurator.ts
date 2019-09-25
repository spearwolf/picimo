import {IConfigurator} from './Configurator';
import {WebGLRendererParameters, LinearFilter} from 'three';
import {TextureUtilsOptions} from '../../textures';
import {Display} from './Display';

export class HighQualityAAConfigurator implements IConfigurator {

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
      defaultAnisotrophy: Infinity,
      defaultFilter: LinearFilter,
    };
  }

  getPixelRatio() {
    return 0; // => use native pixel ratio from window.devicePixelRatio
  }

  postSetup(_display: Display) { }

}
