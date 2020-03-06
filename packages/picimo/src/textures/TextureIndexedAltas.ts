import {ITileSet} from './ITileSet';
import {Texture} from './Texture';
import {TextureAtlas} from './TextureAtlas';

export class TextureIndexedAtlas implements ITileSet {
  static async load(
    path: string,
    basePath = './',
  ): Promise<TextureIndexedAtlas> {
    return new TextureIndexedAtlas(await TextureAtlas.load(path, basePath));
  }

  readonly atlas: TextureAtlas;

  private texIdMap: Map<number, string> = new Map();
  private defaultTexName: string;

  constructor(atlas: TextureAtlas) {
    this.atlas = atlas;
  }

  getTextureSource() {
    return this.atlas.baseTexture;
  }

  hasTextureId(id: number) {
    return Boolean(this.texIdMap.get(id) || this.defaultTexName);
  }

  getTextureById(id: number): Texture {
    const name = this.texIdMap.get(id) || this.defaultTexName;
    if (name) {
      return this.atlas.frame(name) || null;
    }
    return null;
  }

  get textureNames() {
    return this.atlas.frameNames();
  }

  getTextureByName(frame: string): Texture {
    return (
      this.atlas.frame(frame) || this.atlas.frame(this.defaultTexName) || null
    );
  }

  setIdNameMap(idNameMap: Array<[number, string]>) {
    idNameMap.forEach(([id, name]) => this.texIdMap.set(id, name));
  }

  setDefaultTexture(name: string) {
    this.defaultTexName = name;
  }
}
