import { Texture } from './Texture';
import { ITexturable } from './ITexturable';

export interface ITileSet extends ITexturable {

  hasTextureId(id: number): boolean;

  getTextureById(id: number): Texture;

}
