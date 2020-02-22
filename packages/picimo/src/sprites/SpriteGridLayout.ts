export type SpriteTranslateFn = (
  sprite: unknown,
  x: number,
  y: number,
  z: number,
) => void;

export class SpriteGridLayout {
  tileWidth: number;
  tileHeight: number;

  columns: number;

  spacing: number;

  z: number;
  translateFn: SpriteTranslateFn;

  constructor(
    tileWidth: number,
    tileHeight: number,
    columns: number,
    spacing: number,
    z: number = 0,
    translateFn: SpriteTranslateFn = (sprite, x, y, z) =>
      (sprite as any).translate(x, y, z),
  ) {
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.columns = columns;
    this.spacing = spacing;
    this.z = z;
    this.translateFn = translateFn;
  }

  get maxWidth() {
    return this.columns * this.tileWidth + (this.columns - 1) * this.spacing;
  }

  build(sprites: Array<unknown>) {
    const {tileWidth, tileHeight, columns, spacing, translateFn, z} = this;
    const spriteCount = sprites.length;
    const rows = Math.ceil(spriteCount / this.columns);
    const halfWidth = this.maxWidth / 2;
    const maxHeight = rows * tileHeight + (rows > 0 ? rows * spacing : 0);
    const halfHeight = maxHeight / 2;

    for (let i = 0; i < spriteCount; i++) {
      const row = Math.floor(i / columns);
      const y = row * tileHeight + (row > 0 ? row * spacing : 0) - halfHeight;
      const x = (i % columns) * tileWidth + (i % columns) * spacing - halfWidth;
      translateFn(sprites[i], x, y, z);
    }
  }
}
