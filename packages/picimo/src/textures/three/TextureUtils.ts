import * as THREE from 'three';

import { readOption } from '../../utils';

import { ImageSource } from '../PowerOf2Image';
import { ITexturable } from '../ITexturable';
import { Texture } from '../Texture';

const $maxAnisotrophy = Symbol('maxAnisotrophy');

export interface TextureUtilsOptions {

  defaultAnisotrophy?: number;

  defaultFilter?: THREE.TextureFilter;

}

export class TextureUtils {

  DefaultAnisotrophy: number;
  DefaultFilter: THREE.TextureFilter;

  private readonly [$maxAnisotrophy]: number;

  constructor(renderer: THREE.WebGLRenderer, options: TextureUtilsOptions) {
    this[$maxAnisotrophy] = renderer.capabilities.getMaxAnisotropy();
    this.DefaultAnisotrophy = options.defaultAnisotrophy || 0;
    this.DefaultFilter = options.defaultFilter || THREE.NearestFilter;
  }

  makeTexture(
    source: ITexturable | Texture,
    options?: {
      filter?: THREE.TextureFilter,
      anisotropy?: number,
      flipy?: boolean,
    }) {

    let image: ImageSource;

    if (typeof (source as ITexturable).getTextureSource === 'function') {
      image = (source as ITexturable).getTextureSource().imgEl;
    } else {
      image = (source as Texture).imgEl;
    }

    const texture = new THREE.Texture(image);

    texture.flipY = Boolean(readOption(options, 'flipy', false));

    const filter = readOption(options, 'filter', this.DefaultFilter) as THREE.TextureFilter

    texture.magFilter = filter;
    texture.minFilter = filter;

    const anisotropy = readOption(options, 'anisotrophy', this.DefaultAnisotrophy) as number;
    const maxAnisotrophy = this[$maxAnisotrophy];

    texture.anisotropy = anisotropy === Infinity || anisotropy > maxAnisotrophy ? maxAnisotrophy : anisotropy;

    texture.needsUpdate = true;

    return texture;
  }

}
