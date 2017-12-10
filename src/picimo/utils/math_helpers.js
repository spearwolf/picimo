
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
const maxOf = (a, b) => a > b ? a : b

/**
 * @param {number} x
 * @return {number}
 */
function findNextPowerOf2 (x) {
  let p = 1
  while (x > p) p <<= 1
  return p
}

/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOf2 = n => n !== 0 && (n & (n - 1)) === 0

export {
  maxOf,
  findNextPowerOf2,
  isPowerOf2
}
