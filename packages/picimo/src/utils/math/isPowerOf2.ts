/**
 * @public
 */
export function isPowerOf2(n: number): boolean {
  return n !== 0 && (n & (n - 1)) === 0;
}
