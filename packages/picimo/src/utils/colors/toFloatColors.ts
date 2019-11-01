
/**
 * Converts an array containing (3-4)x color values [0..255] to float values [0..1]
 * @returns a new array, the old one will be untouched
 */
export const toFloatColors = (colors: number[]) => colors.map(col => col / 255);
