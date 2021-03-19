import {WebGLRendererParameters} from 'three';

import {TextureOptionClasses} from '../textures';

import {Display} from './Display';

export interface IConfigurator {
  getWebGlRendererParameters(
    userParams?: WebGLRendererParameters,
  ): WebGLRendererParameters;

  getPixelRatio(): number;

  getTextureFactoryOptions(): Array<TextureOptionClasses>;

  postSetup(display: Display): void;
}
