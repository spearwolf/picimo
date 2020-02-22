import {ITileSet} from './ITileSet';
import {PowerOf2Image} from './PowerOf2Image';
import {Texture} from './Texture';
import {readOption} from '../utils';

export interface TileSetOptions {
  tileWidth?: number;
  tileHeight?: number;

  margin?: number;
  spacing?: number;
  padding?: number;

  columns?: number;

  firstId?: number;
  tileCount?: number;

  name?: string;
}

export interface TileSetLoadOptions extends TileSetOptions {
  basePath?: string;
}

const $textures = Symbol('textures');

export class TileSet implements ITileSet {
  static async load(path: string, options?: TileSetLoadOptions) {
    const basePath = readOption(options, 'basePath', './');
    const baseTexture = new Texture(
      await new PowerOf2Image(`${basePath}${path}`).loaded,
    );
    return new TileSet(baseTexture, options);
  }

  readonly name: string;

  readonly baseTexture: Texture;

  readonly tileWidth: number;
  readonly tileHeight: number;

  readonly firstId: number;
  readonly tileCount: number;
  readonly lastId: number;

  private readonly [$textures]: Map<number, Texture> = new Map();

  constructor(baseTexture: Texture, options?: TileSetOptions) {
    this.name = readOption(options, 'name', 'TileSet') as string;

    this.baseTexture = baseTexture;

    this.tileWidth = readOption(
      options,
      'tileWidth',
      baseTexture.width,
    ) as number;
    this.tileHeight = readOption(
      options,
      'tileHeight',
      baseTexture.height,
    ) as number;

    this.firstId = readOption(options, 'firstId', 1) as number;

    const limitTileCount = readOption(options, 'tileCount', 0) as number;
    const margin = readOption(options, 'margin', 0) as number;
    const padding = readOption(options, 'padding', 0) as number;
    const spacing = readOption(options, 'spacing', 0) as number;

    const {width: baseWidth, height: baseHeight} = baseTexture.root;

    const tileOuterWidth = this.tileWidth + (padding << 1);
    const tileOuterHeight = this.tileHeight + (padding << 1);

    const textures = this[$textures];

    let x = margin;
    let y = margin;
    let curId = this.firstId;
    let tileCount = 0;

    while (1) {
      textures.set(
        curId,
        new Texture(
          baseTexture,
          this.tileWidth,
          this.tileHeight,
          x + padding,
          y + padding,
        ),
      );
      ++tileCount;

      if (limitTileCount > 0 && tileCount === limitTileCount) {
        break;
      }

      const xOffsetNext = tileOuterWidth + spacing;

      if (x + xOffsetNext + tileOuterWidth + margin <= baseWidth) {
        x += xOffsetNext;
      } else {
        x = margin;
        y += tileOuterHeight + spacing;
        if (y + tileOuterHeight + margin >= baseHeight) {
          break;
        }
      }

      ++curId;
    }

    this.tileCount = tileCount;
    this.lastId = curId;
  }

  getTextureSource() {
    return this.baseTexture;
  }

  hasTextureId(id: number) {
    return id >= this.firstId && id <= this.lastId;
  }

  getTextureById(id: number): Texture {
    if (id >= this.firstId && id <= this.lastId) {
      return this[$textures].get(id) || null;
    }
    return null;
  }

  randomFrames(count: number) {
    const frames: Texture[] = [];
    for (let i = 0; i < count; i++) {
      frames.push(
        this[$textures].get(
          this.firstId + Math.floor(Math.random() * this.tileCount),
        ),
      );
    }
    return frames;
  }
}
