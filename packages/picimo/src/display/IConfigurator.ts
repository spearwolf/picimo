import {WebGLRendererParameters} from 'three';

import {ITextureFactoryOptions} from '../textures';

import {Display} from './Display';

export interface IConfigurator {
  getWebGlRendererParameters(
    userParams?: WebGLRendererParameters,
  ): WebGLRendererParameters;

  getTextureFactoryOptions(): ITextureFactoryOptions;

  getPixelRatio(): number;

  postSetup(display: Display): void;
}
