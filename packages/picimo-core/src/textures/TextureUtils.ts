import * as THREE from 'three';

import { readOption } from '../utils';

import { TextureAtlas } from './TextureAtlas';
import { Texture } from './Texture';
import { ImageSource } from './PowerOf2Image';
import { ITileSet } from './ITileSet';

const $maxAnisotrophy = Symbol('maxAnisotrophy');

export interface TextureUtilsOptions {

  maxAnisotrophy: number;
  defaultAnisotrophy?: number;

  defaultFilter?: THREE.TextureFilter;

}

export class TextureUtils {

  DefaultAnisotrophy: number;
  DefaultFilter: THREE.TextureFilter;

  private readonly [$maxAnisotrophy]: number;

  constructor(options: TextureUtilsOptions) {
    this[$maxAnisotrophy] = options.maxAnisotrophy;
    this.DefaultAnisotrophy = options.defaultAnisotrophy || 0;
    this.DefaultFilter = options.defaultFilter || THREE.NearestFilter;
  }

  makeTexture(
    source: ITileSet | TextureAtlas | Texture,
    options?: {
      filter?: THREE.TextureFilter,
      anisotropy?: number,
      flipy?: boolean,
    }) {

    let image: ImageSource;

    if (typeof (source as ITileSet).getImageSource === 'function') {
      image = (source as ITileSet).getImageSource();
    } else if (source instanceof TextureAtlas) {
      image = source.baseTexture.imgEl;
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
