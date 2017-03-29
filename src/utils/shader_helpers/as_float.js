
export default function (number) {
  const str = (number + '').trim()
  if (str.match(/^[0-9]+$/)) {
    return str + '.0'
  }
  return str
}
