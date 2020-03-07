import {WebGLRendererParameters} from 'three';

import {TextureFactoryOptions} from '../textures';

import {Display} from './Display';

export interface IConfigurator {
  getWebGlRendererParameters(
    userParams?: WebGLRendererParameters,
  ): WebGLRendererParameters;

  getTextureFactoryOptions(): TextureFactoryOptions;

  getPixelRatio(): number;

  postSetup(display: Display): void;
}
