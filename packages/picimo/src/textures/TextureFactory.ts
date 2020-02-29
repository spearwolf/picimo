import {readOption} from '../utils';

import {ITexturable} from './ITexturable';
import {ImageSource} from './PowerOf2Image';
import {Texture as PicimoTexture} from './Texture';

import {
  TextureFilter,
  WebGLRenderer,
  NearestFilter,
  Texture as ThreeTexture,
} from 'three';

const $maxAnisotrophy = Symbol('maxAnisotrophy');

export interface TextureFactoryOptions {
  defaultAnisotrophy?: number;
  defaultFilter?: TextureFilter;
}

export interface ThreeTextureOptions {
  filter?: TextureFilter;
  anisotrophy?: number;
  flipy?: boolean;
}

export class TextureFactory {
  DefaultAnisotrophy: number;
  DefaultFilter: TextureFilter;

  private readonly [$maxAnisotrophy]: number;

  constructor(renderer?: WebGLRenderer, options?: TextureFactoryOptions) {
    this[$maxAnisotrophy] = renderer?.capabilities?.getMaxAnisotropy() ?? 0;
    this.DefaultAnisotrophy = options?.defaultAnisotrophy ?? 0;
    this.DefaultFilter = options?.defaultFilter ?? NearestFilter;
  }

  createThreeTextureOptions(options?: ThreeTextureOptions) {
    const filter = readOption(
      options,
      'filter',
      this.DefaultFilter,
    ) as TextureFilter;
    const anisotrophy = readOption(
      options,
      'anisotrophy',
      this.DefaultAnisotrophy,
    ) as number;
    const maxAnisotrophy = this[$maxAnisotrophy];
    return {
      flipY: Boolean(readOption(options, 'flipy', false)),
      magFilter: filter,
      minFilter: filter,
      anisotropy:
        anisotrophy === Infinity || anisotrophy > maxAnisotrophy
          ? maxAnisotrophy
          : anisotrophy,
    };
  }

  makeThreeTexture(
    source: ITexturable | PicimoTexture,
    options?: ThreeTextureOptions,
  ) {
    let image: ImageSource;

    if (typeof (source as ITexturable).getTextureSource === 'function') {
      image = (source as ITexturable).getTextureSource().imgEl;
    } else {
      image = (source as PicimoTexture).imgEl;
    }

    const texture = new ThreeTexture(image);

    Object.assign(texture, this.createThreeTextureOptions(options));

    texture.needsUpdate = true;

    return texture;
  }
}
