import assert from 'assert'

export default (vo, props) => {
  Object.keys(props).forEach(type => {
    props[type].forEach(name => {
      assert.equal(typeof vo[name], type, name)
    })
  })
}
