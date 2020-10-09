/* eslint-disable no-console */
import {Display} from 'picimo';

const display = new Display(document.getElementById('picimo'), {
  alpha: false,
  clearColor: 0xffe26f,
});

display.on({
  init(...args) {
    console.log('display->init, args=', args);
  },

  frame({width, height, now, frameNo}) {
    document.querySelector('.infoDisplay').innerHTML = `
      <p>
        <em>width:</em>${width}<br/>
        <em>height:</em>${height}<br/>
        <em>pixelRatio:</em>${display.pixelRatio}<br/>
        <em>now:</em>${Math.round(10 * now) / 10}<br/>
        <em>frameNo:</em>${frameNo}<br/>
      </p>
    `;
  },
});

display.start();
