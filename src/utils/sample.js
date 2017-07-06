
export default function sample (arr) {
  return arr[(Math.random() * arr.length) | 0]
}
