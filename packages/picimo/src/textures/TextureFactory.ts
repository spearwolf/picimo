import {
  NearestFilter,
  TextureFilter,
  Texture as THREE_Texture,
  TextureLoader,
  LinearFilter,
  WebGLRenderer,
} from 'three';

import {ITexturable} from './ITexturable';
import {ImageSource} from './PowerOf2Image';
import {Texture as picimo_Texture} from './Texture';

export interface THREE_Texture_Options {
  magFilter: TextureFilter;
  minFilter: TextureFilter;
  anisotrophy: number;
  flipY: boolean;
}

const TEXTURE_CLASSES = {
  anisotrophy: {
    anisotrophy: Infinity,
  },
  'anisotrophy-2': {
    anisotrophy: 2,
  },
  'anisotrophy-4': {
    anisotrophy: 4,
  },
  'no-anisotrophy': {
    anisotrophy: 0,
  },
  nearest: {
    magFilter: NearestFilter,
    minFilter: NearestFilter,
  },
  'mag-nearest': {
    magFilter: NearestFilter,
  },
  'min-nearest': {
    minFilter: NearestFilter,
  },
  linear: {
    magFilter: LinearFilter,
    minFilter: LinearFilter,
  },
  'mag-linear': {
    magFilter: LinearFilter,
  },
  'min-linear': {
    minFilter: LinearFilter,
  },
  flipy: {
    flipY: true,
  },
};

export type TextureOptionClasses = keyof typeof TEXTURE_CLASSES;

const TEXTURE_CLASS_PRIORITIES: Record<TextureOptionClasses, number> = {
  'no-anisotrophy': 1000,
  'anisotrophy-2': 500,
  'anisotrophy-4': 250,
  anisotrophy: 0,

  nearest: 1000,
  'mag-nearest': 500,
  'min-nearest': 500,

  linear: 1000,
  'mag-linear': 500,
  'min-linear': 500,

  flipy: 0,
};

const getImageSource = (
  textureSource: ITexturable | picimo_Texture,
): ImageSource => {
  if (typeof (textureSource as ITexturable).getTextureSource === 'function') {
    return (textureSource as ITexturable).getTextureSource().imgEl;
  }
  return (textureSource as picimo_Texture).imgEl;
};

export class TextureFactory {
  #maxAnisotrophy = 0;
  #defaultOptions: Partial<THREE_Texture_Options>;

  constructor(
    maxAnisotrophyOrRenderer: number | WebGLRenderer,
    defaultClassNames: Array<TextureOptionClasses> = ['nearest'],
    defaultOptions?: Partial<THREE_Texture_Options>,
  ) {
    this.#maxAnisotrophy =
      typeof maxAnisotrophyOrRenderer === 'number'
        ? maxAnisotrophyOrRenderer
        : maxAnisotrophyOrRenderer.capabilities.getMaxAnisotropy();
    this.#defaultOptions = defaultOptions ?? {
      anisotrophy: 0,
      flipY: false,
    };
    this.#defaultOptions = this.getOptions(defaultClassNames);
  }

  getOptions(
    classNames: Array<TextureOptionClasses>,
  ): Partial<THREE_Texture_Options> {
    const options = Object.assign(
      {},
      this.#defaultOptions,
      ...classNames
        .map(
          (className) =>
            [
              TEXTURE_CLASS_PRIORITIES[className],
              TEXTURE_CLASSES[className],
            ] as [number, Partial<THREE_Texture_Options>],
        )
        .sort(([a], [b]) => b - a)
        .map(([, opts]) => opts),
    );
    options.anisotrophy = Math.min(options.anisotrophy, this.#maxAnisotrophy);
    return options;
  }

  create(
    source: ITexturable | picimo_Texture,
    ...classNames: Array<TextureOptionClasses>
  ): THREE_Texture {
    const texture = new THREE_Texture(getImageSource(source));
    return this.update(texture, ...classNames);
  }

  update(
    texture: THREE_Texture,
    ...classNames: Array<TextureOptionClasses>
  ): THREE_Texture {
    Object.assign(texture, this.getOptions(classNames));
    texture.needsUpdate = true;
    return texture;
  }

  load(url: string, ...classNames: Array<TextureOptionClasses>): THREE_Texture {
    return new TextureLoader().load(url, (texture) => {
      this.update(texture, ...classNames);
    });
  }
}
