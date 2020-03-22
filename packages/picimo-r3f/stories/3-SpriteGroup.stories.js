/* eslint-env browser */
/* eslint-disable no-console */
import React from 'react';
import {Canvas} from 'react-three-fiber';
import {withKnobs, boolean, select} from '@storybook/addon-knobs';
import {
  Stage2D,
  SpriteGroupMesh,
  SimpleSpritesBufferGeometry,
  SimpleSpritesMaterial,
  TextureAtlas,
  Sprites,
  useProjection,
} from 'picimo-r3f';
import {Logger} from 'picimo';

export default {
  title: 'SpriteGroup',
  decorators: [withKnobs],
};

const PROJECTION = {
  width: 640,
  height: 480,
  fit: 'contain',
  distance: 1000,
  far: 10000,
};

const MIN_SIZE = 35;
const MAX_SIZE = 150;

const TEXTURE_ATLAS_SRC = [
  'nobinger.json',
  'amigaballs.json',
  'clouds.json',
  'starscape.json',
];

const SPRITES = 32;

const log = new Logger('picimo-r3f.storybook');

const createSprites = ({spriteGroup, textureAtlas, projection}) => {
  const sprites = spriteGroup.createSpritesFromTextures(
    textureAtlas.randomFrames(SPRITES),
  );

  const halfOfSprites = Math.floor(SPRITES / 2);
  const w =
    sprites
      .map((s) => s.width)
      .sort()
      .slice(0, halfOfSprites)
      .reduce((sum, w) => sum + w, 0) / halfOfSprites;
  const scale = w > MIN_SIZE ? (w < MAX_SIZE ? 0 : MAX_SIZE / w) : MIN_SIZE / w;

  if (log.VERBOSE) log.log('average width of sprites:', w, textureAtlas);

  sprites.forEach((sprite) => {
    const [x, y] = [
      Math.random() * projection.width - projection.width * 0.5,
      Math.random() * projection.height - projection.height * 0.5,
    ];
    sprite.translate(x - sprite.width / 2, y, 0);

    if (scale) {
      sprite.width *= scale;
      sprite.height *= scale;
    }
  });

  return sprites;
};

const onCreate = (ctx) => {
  if (log.VERBOSE) log.log('CREATE SPRITES', ctx);
  return createSprites(ctx);
};

const onTextureAtlasChange = (ctx, sprites) => {
  if (log.VERBOSE) log.log('TEXTURE-ATLAS CHANGE', ctx, sprites);
  ctx.spriteGroup.voPool.free(sprites);
  return createSprites(ctx);
};

const forwardProjection = (fn, projection) => (ctx, sprites) =>
  fn({...ctx, projection}, sprites);

const ShowSomeSprites = () => {
  const projection = useProjection();
  return (
    <Sprites
      textureAtlas="spritesAtlas"
      onCreate={forwardProjection(onCreate, projection)}
      onTextureAtlasChange={forwardProjection(onTextureAtlasChange, projection)}
    />
  );
};

export const SimpleSprites = () => (
  <section>
    <div style={{backgroundColor: '#d0e9f0'}}>
      <Canvas
        gl2
        pixelRatio={window.devicePixelRatio}
        style={{minHeight: '480px'}}
      >
        <Stage2D plane="xz" type="parallax" projection={PROJECTION}>
          {boolean('render <TextureAtlas>', true) && (
            <TextureAtlas
              name="spritesAtlas"
              src={select(
                'texture-atlas',
                TEXTURE_ATLAS_SRC,
                TEXTURE_ATLAS_SRC[0],
              )}
            />
          )}

          {boolean('show <SpriteGroupMesh>', true) && (
            <SpriteGroupMesh>
              <SimpleSpritesMaterial attach="material" texture="spritesAtlas" />

              <SimpleSpritesBufferGeometry
                attach="geometry"
                capacity={512}
                dynamic={true}
                autotouch={true}
              >
                {boolean('show <Sprites>', true) && <ShowSomeSprites />}
              </SimpleSpritesBufferGeometry>
            </SpriteGroupMesh>
          )}
        </Stage2D>
      </Canvas>
    </div>
  </section>
);
