/* eslint-disable no-console */
import {
  Display,
  TextureAtlas,
  DisplayMode,
  ParallaxProjection,
  BitmapText2D,
  Plane,
  PostProcessingStage2D,
} from 'picimo';
import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass';
import {RGBShiftShader} from 'three/examples/jsm/shaders/RGBShiftShader';

const display = new Display(document.getElementById('picimo'), {
  mode: DisplayMode.AAQuality,
  resizeStrategy: 'fullscreen',
  alpha: true,
  stage: new PostProcessingStage2D(
    new ParallaxProjection(Plane.XY, {
      width: 2000,
      height: 2000,
      fit: 'contain',
    }),
  ),
});

display.on('init', async ({stage}) => {
  const text = new BitmapText2D({capacity: 1000});
  text.fontAtlas = await TextureAtlas.load('comic-schrift.json', '/assets/');

  const MESSAGE = 'WELC0ME\nTO\nPICIMO!';

  // text.fontSize = 150;
  text.lineGap = 50;

  text.drawText(MESSAGE, 0, 0, 0, 0, 0, 0, 'center', 'center');

  // const c = text.bitmapChars.createSpriteFromTexture(text.fontAtlas.frame('@'));
  // c.originX = 0;
  // c.originY = 0;

  stage.scene.add(text);

  const shaderPass = new ShaderPass(RGBShiftShader);
  shaderPass.uniforms.amount.value = 0.0015;

  stage.composer.addPass(shaderPass);
  stage.composer.addPass(new GlitchPass());

  console.log('display', display);
  console.log('projection', stage.projection);
  console.log('text', text.measureText(MESSAGE), text);
});

display.start();
