import {sample, unpick} from '../utils';

import {ITexturable} from './ITexturable';
import {PowerOf2Image} from './PowerOf2Image';
import {Texture} from './Texture';

interface Features {
  [feature: string]: unknown;
}

export interface TextureAtlasFrameDescription extends Features {
  frame: {
    x: number;
    y: number;

    w: number;
    h: number;
  };

  baselineOffset?: number;
}

export interface TextureAtlasMetaDescription extends Features {
  image: string;

  lineHeight?: number;
}

export interface TextureAtlasDescription {
  frames: {
    [frameName: string]: TextureAtlasFrameDescription;
  };

  meta: TextureAtlasMetaDescription;
}

const filterFrameFeatures = unpick(['frame']) as any;

export class TextureAtlas implements ITexturable {
  /**
   * Load a texture atlas from json defintion
   */
  static async load(path: string, basePath = './') {
    const atlas = await fetch(`${basePath}${path}`).then((response) =>
      response.json(),
    );
    const baseTexture = new Texture(
      await new PowerOf2Image(`${basePath}${atlas.meta.image}`).loaded,
    );
    return new TextureAtlas(baseTexture, atlas);
  }

  baseTexture: Texture;

  #frames = new Map<string, Texture>();

  #allFrames: Texture[] = [];
  #allFrameNames: string[] = [];

  #features: Map<string, unknown> = null;

  constructor(baseTexture: Texture, data: TextureAtlasDescription) {
    this.baseTexture = baseTexture;

    if (data?.frames) {
      Object.entries(data.frames).forEach(([name, frameData]) => {
        const {frame} = frameData;
        const features = filterFrameFeatures(frameData);
        this.addFrame(name, frame.w, frame.h, frame.x, frame.y, features);
      });
    }

    if (data?.meta) {
      Object.entries(data.meta).forEach(([name, metaData]) => {
        this.setFeature(name, metaData);
      });
    }
  }

  getTextureSource() {
    return this.baseTexture;
  }

  addTexture(name: string, texture: Texture, features: Features = null) {
    this.#allFrameNames.push(name);
    this.#allFrames.push(texture);
    this.#frames.set(name, texture);
    if (features != null) {
      Object.keys(features).forEach((name) => {
        texture.setFeature(name, features[name]);
      });
    }
  }

  addFrame(
    name: string,
    width: number,
    height: number,
    x: number,
    y: number,
    features: Features = null,
  ) {
    const tex = new Texture(this.baseTexture, width, height, x, y);
    this.addTexture(name, tex, features);
  }

  frame(name: string): Texture {
    return this.#frames.get(name);
  }

  randomFrame() {
    return sample(this.#allFrames);
  }

  randomFrames(count: number) {
    const frames: Texture[] = [];
    for (let i = 0; i < count; i++) {
      frames.push(sample(this.#allFrames));
    }
    return frames;
  }

  frameNames(match?: string | RegExp) {
    if (match != null) {
      const regex = typeof match === 'string' ? new RegExp(match) : match;
      return this.#allFrameNames.filter((name) => regex.test(name));
    }
    return this.#allFrameNames;
  }

  randomFrameName() {
    return sample(this.#allFrameNames);
  }

  getFeature(name: string, defaultValue: unknown = undefined): unknown {
    return this.#features && this.#features.has(name)
      ? this.#features.get(name)
      : defaultValue;
  }

  setFeature(name: string, value: unknown) {
    if (this.#features === null) {
      this.#features = new Map();
    }
    this.#features.set(name, value);
  }
}
