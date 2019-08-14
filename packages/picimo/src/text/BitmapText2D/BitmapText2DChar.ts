import { Texture } from '../../textures';

export interface BitmapText2DChar {

  tex: Texture;

  x: number;
  y: number;

  /**
   * baseline offset
   */
  bo: number;

}
