import {TextureFactoryOptions} from '../textures';

import {Display} from './Display';

import {WebGLRendererParameters} from 'three';

export interface IConfigurator {
  getWebGlRendererParameters(
    userParams?: WebGLRendererParameters,
  ): WebGLRendererParameters;

  getTextureFactoryOptions(): TextureFactoryOptions;

  getPixelRatio(): number;

  postSetup(display: Display): void;
}
