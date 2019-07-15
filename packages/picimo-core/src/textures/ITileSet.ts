import { Texture } from './Texture';
import { ImageSource } from './PowerOf2Image';

export interface ITileSet {

  getImageSource(): ImageSource;

  getTextureById(id: number): Texture;

}
