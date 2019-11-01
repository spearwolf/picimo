
/**
 * Returns an array containing 3x values: *red*, *green*, *blue*, *alpha* with each color value in range of [0..255]
 * @param hexColor - css color hex string (with or without leading '#')
 * @param alpha - alpha value in range [0..255]
 */
export const hexCol2rgba = (hexColor: string, alpha: number = 255) => {
  const offset = hexColor.startsWith('#') ? 1 : 0;
  const red = parseInt(hexColor.substring(offset, offset + 2), 16);
  const green = parseInt(hexColor.substring(offset + 2, offset + 4), 16);
  const blue = parseInt(hexColor.substring(offset + 4, offset + 6), 16);
  return [red, green, blue, alpha];
};
