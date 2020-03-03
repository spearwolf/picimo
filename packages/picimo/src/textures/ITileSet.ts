import {ITexturable} from './ITexturable';
import {Texture} from './Texture';

export interface ITileSet extends ITexturable {
  hasTextureId(id: number): boolean;
  getTextureById(id: number): Texture;
}
