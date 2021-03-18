import {readOption} from '../utils';

import {ITileSet} from './ITileSet';
import {PowerOf2Image} from './PowerOf2Image';
import {Texture} from './Texture';

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

export class TileSet implements ITileSet {
  static async load(
    path: string,
    tilesetOptions?: TileSetLoadOptions,
  ): Promise<TileSet> {
    const basePath = readOption(tilesetOptions, 'basePath', '');
    const baseTexture = new Texture(
      await new PowerOf2Image(`${basePath}${path}`).loaded,
    );
    return new TileSet(baseTexture, tilesetOptions);
  }

  readonly name: string;

  readonly baseTexture: Texture;

  readonly tileWidth: number;
  readonly tileHeight: number;

  readonly firstId: number;
  readonly tileCount: number;
  readonly lastId: number;

  readonly #textures: Map<number, Texture> = new Map();

  constructor(baseTexture: Texture, tilesetOptions?: TileSetOptions) {
    this.name = readOption(tilesetOptions, 'name', 'TileSet') as string;

    this.baseTexture = baseTexture;

    this.tileWidth = readOption(
      tilesetOptions,
      'tileWidth',
      baseTexture.width,
    ) as number;

    this.tileHeight = readOption(
      tilesetOptions,
      'tileHeight',
      baseTexture.height,
    ) as number;

    this.firstId = readOption(tilesetOptions, 'firstId', 1) as number;

    const limitTileCount = readOption(tilesetOptions, 'tileCount', 0) as number;
    const margin = readOption(tilesetOptions, 'margin', 0) as number;
    const padding = readOption(tilesetOptions, 'padding', 0) as number;
    const spacing = readOption(tilesetOptions, 'spacing', 0) as number;

    const {width: baseWidth, height: baseHeight} = baseTexture.root;

    const tileOuterWidth = this.tileWidth + (padding << 1);
    const tileOuterHeight = this.tileHeight + (padding << 1);

    let x = margin;
    let y = margin;
    let curId = this.firstId;
    let tileCount = 0;

    while (1) {
      this.#textures.set(
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
        if (y + tileOuterHeight + margin > baseHeight) {
          break;
        }
      }

      ++curId;
    }

    this.tileCount = tileCount;
    this.lastId = curId;
  }

  getTextureSource(): Texture {
    return this.baseTexture;
  }

  hasTextureId(id: number): boolean {
    return id >= this.firstId && id <= this.lastId;
  }

  getTextureById(id: number): Texture {
    if (id >= this.firstId && id <= this.lastId) {
      return this.#textures.get(id) ?? null;
    }
    return null;
  }

  randomFrames(count: number): Texture[] {
    const frames: Texture[] = [];
    for (let i = 0; i < count; i++) {
      frames.push(
        this.#textures.get(
          this.firstId + Math.floor(Math.random() * this.tileCount),
        ),
      );
    }
    return frames;
  }
}
