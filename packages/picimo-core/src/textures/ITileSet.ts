import { Texture } from './Texture';
import { ImageSource } from './PowerOf2Image';

export interface ITileSet {

  uuid: string;

  getImageSource(): ImageSource;

  hasTextureId(id: number): boolean;

  getTextureById(id: number): Texture;

}
