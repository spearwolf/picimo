import {Scene} from 'three';
import {Display, TextureAtlas, DisplayMode, ParallaxProjection, BitmapText2D, Plane} from 'picimo';

const display = new Display(
  document.getElementById('picimo'), {
    mode: DisplayMode.AAQuality,
    resizeStrategy: 'fullscreen',
    alpha: true,
  });

async function init() {
  const projection = new ParallaxProjection(Plane.XY, {
    width: 2000,
    height: 2000,
    fit: 'contain',
  });

  const scene = new Scene();

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

  scene.add(text);

  display.addEventListener('frame', () => {

    const {renderer} = display;

    projection.update(display.width, display.height);
    renderer.render(scene, projection.camera);

  });

  console.log('display', display);
  console.log('projection', projection);
  console.log('scene', scene);
  console.log('text', text.measureText(MESSAGE), text);
}

init();
display.start();
