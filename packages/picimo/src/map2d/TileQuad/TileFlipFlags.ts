
export const TileFlipFlags = {
  FLIPPED_HORIZONTALLY: 0x80000000,
  FLIPPED_VERTICALLY: 0x40000000,
  FLIPPED_DIAGONALLY: 0x20000000,

  ALL: 0,
  ALL_INVERTED: 0,
};

TileFlipFlags.ALL = Array.from(Object.values(TileFlipFlags)).reduce((all, flag) => all | flag, 0);

TileFlipFlags.ALL_INVERTED = 0xffffffff ^ TileFlipFlags.ALL;
