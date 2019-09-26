import {WebGLRendererParameters} from 'three';
import {TextureUtilsOptions} from '../../textures';
import {Display} from './Display';

export interface IConfigurator {

  getWebGlRendererParameters(userParams?: WebGLRendererParameters): WebGLRendererParameters;

  getTextureUtilsOptions(): TextureUtilsOptions;

  getPixelRatio(): number;

  postSetup(display: Display): void;

}
