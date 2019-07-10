import * as THREE from 'three';

import { readOption } from '../utils';

import { TextureAtlas } from './TextureAtlas';
import { TextureLibrary } from './TextureLibrary';
import { Texture } from './Texture';
import { ImageSource } from './PowerOf2Image';

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
    source: TextureAtlas | TextureLibrary | Texture,
    options?: {
      filter?: THREE.TextureFilter,
      anisotropy?: number,
      flipy?: boolean,
    }) {

    let image: ImageSource;

    if (source instanceof TextureLibrary) {
      image = source.atlas.baseTexture.imgEl;
    } else if (source instanceof TextureAtlas) {
      image = source.baseTexture.imgEl;
    } else { // is a Texture!
      image = source.imgEl;
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
