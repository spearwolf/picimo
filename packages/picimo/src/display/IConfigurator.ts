import {WebGLRendererParameters} from 'three';

import {TextureOptionClasses} from '../textures';

import {Display} from './Display';

export interface IConfigurator {
  getWebGlRendererParameters(
    userParams?: WebGLRendererParameters,
  ): WebGLRendererParameters;

  getTextureFactoryOptions(): Array<TextureOptionClasses>;

  getPixelRatio(): number;

  postSetup(display: Display): void;
}
