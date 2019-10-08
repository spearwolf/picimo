import {Scene, Vector3, BoxBufferGeometry, LineSegments, EdgesGeometry, LineBasicMaterial, Plane} from 'three';
import {Display, TextureAtlas, DisplayMode, ParallaxProjection, BitmapText2D} from 'picimo';

const display = new Display(
  document.getElementById('picimo'), {
    mode: DisplayMode.AAQuality,
    resizeStrategy: 'fullscreen',
    alpha: true,
    // clearColor: 0x407090,
  });

async function init() {
  const projection = new ParallaxProjection({
    width: 3200,
    height: 2400,
    fit: 'contain',
  });

  const scene = new Scene();

  const box = new LineSegments(
    new EdgesGeometry(new BoxBufferGeometry(100, 100, 100)),
    new LineBasicMaterial({ color: 0xffffff }),
  );

  scene.add(box);

  const fontAtlas = await TextureAtlas.load('comic-schrift.json', '/assets/');
  const text = new BitmapText2D(fontAtlas, {
    capacity: 1000,
  });

  text.rotateOnWorldAxis(new Vector3(1, 0, 0), -Math.PI / 2);
  // text.rotateOnWorldAxis(new Vector3(1, 0, 0), -.15);

  const TXT = 'WELCOME\nTO\nPICIMO!';

  text.drawText(TXT, 0, 0, 0, 0, 1);

  // const c = text.bitmapChars.createSpriteFromTexture(text.fontAtlas.frame('W'));
  // c.originX = -100;
  // c.originY = -400;

  scene.add(text);

  display.addEventListener('frame', () => {

    const {renderer} = display;

    projection.update(display.width, display.height);
    renderer.render(scene, projection.camera);

  });

  console.log('display', display);
  console.log('projection', projection);
  console.log('scene', scene);
  console.log('fontAtlas', fontAtlas);
  console.log('text', text.measureText(TXT), text);

}

init();
display.start();
