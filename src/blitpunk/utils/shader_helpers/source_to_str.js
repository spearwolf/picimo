
export default function sourceToStr (ctx, source) {
  if (typeof source === 'string') {
    return source
  } else if (typeof source === 'function') {
    return sourceToStr(ctx, source(ctx))
  } else if (Array.isArray(source)) {
    return source.map(sourceToStr.bind(null, ctx)).join('\n')
  } else {
    return source + ''
  }
}
