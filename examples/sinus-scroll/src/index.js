import 'src/blitpunk.js'

const el = document.getElementById('blitpunkCanvas')

const ready = Promise.all([
  document.getElementById('mySprites').spriteGroupPromise,
  document.getElementById('atlas1').textureAtlasPromise
])

ready.then(([spriteGroup, atlas]) => {
  const sprite = spriteGroup.createSprite(atlas.getRandomFrame())
  sprite.setTranslate(190, 25)

  const nextRandomTexture = () => {
    const tex = atlas.getRandomFrame()
    sprite.setTexCoordsByTexture(tex)
    sprite.setSize(tex.width, tex.height)
  }

  document.body.addEventListener('click', nextRandomTexture)
  document.body.addEventListener('touchstart', nextRandomTexture)

  spriteGroup.createSprite(atlas.getFrame('R')).setTranslate(-190, -25)

  el.on('debug', () => {
    console.dir(spriteGroup.getTextureAtlas('tex'))
  })
})
