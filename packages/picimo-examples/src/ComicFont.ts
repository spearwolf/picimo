import {Display, TextureAtlas, DisplayMode, ParallaxProjection, BitmapText2D, Plane, DisplayOnInitOptions, Stage} from 'picimo';

const display = new Display(
  document.getElementById('picimo'), {
    mode: DisplayMode.AAQuality,
    resizeStrategy: 'fullscreen',
    alpha: true,
    stage: new Stage(
      new ParallaxProjection(Plane.XY, {
        width: 2000,
        height: 2000,
        fit: 'contain',
      })),
  });

display.on('init', async ({stage}: DisplayOnInitOptions) => {

  const text = new BitmapText2D(
    await TextureAtlas.load('comic-schrift.json', '/assets/'),
    {
      capacity: 1000,
    });

  const MESSAGE = 'WELC0ME\nTO\nPICIMO!';

  text.drawText(MESSAGE, 0, 0, 0, 0, 'center', 'center');

  // const c = text.bitmapChars.createSpriteFromTexture(text.fontAtlas.frame('@'));
  // c.originX = 0;
  // c.originY = 0;

  stage.scene.add(text);

  console.log('display', display);
  console.log('projection', stage.projection);
  console.log('scene', stage.scene);
  console.log('text', text.measureText(MESSAGE), text);
});

display.start();
