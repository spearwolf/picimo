// http://caniuse.com/#feat=custom-elementsv1

export default () => {
  if (typeof window.customElements !== 'undefined') return true
  return false
}
