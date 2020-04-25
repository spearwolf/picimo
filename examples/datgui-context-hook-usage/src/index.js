/* eslint-disable no-console */
import {DatGui, useDatGui, number} from 'datgui-context-hook';
import React, {useMemo} from 'react';
import ReactDOM from 'react-dom';

const BasicUsage = () => {
  const {message, speed, displayOutline} = useDatGui({
    message: 'dat.gui',
    speed: 0.8,
    displayOutline: false,
    sayHello() {
      console.log('hello!');
    },
  });
  return (
    <dl>
      <dt>message</dt>
      <dd>{message}</dd>
      <dt>speed</dt>
      <dd>{speed}</dd>
      <dt>displayOutline</dt>
      <dd>{displayOutline ? 'YES' : 'NO'}</dd>
    </dl>
  );
};

const ConstrainingInput = () => {
  const fields = () => ({
    noiseStrength: number(10).step(5),
    growthSpeed: number(0.2).min(-5).max(5),
    maxSize: number(6).min(0).step(0.25),
    message: ['pizza', 'chrome', 'hooray'],
    speed: {Stopped: 0, Slow: 0.1, Fast: 5},
  });
  const {growthSpeed, maxSize, noiseStrength, message, speed} = useDatGui(
    'Constrained Input',
    useMemo(fields, [fields]),
  );
  return (
    <dl>
      <dt>noiseStrength</dt>
      <dd>{noiseStrength}</dd>
      <dt>growthSpeed</dt>
      <dd>{growthSpeed}</dd>
      <dt>maxSize</dt>
      <dd>{maxSize}</dd>
      <dt>message</dt>
      <dd>{message}</dd>
      <dt>speed</dt>
      <dd>{speed}</dd>
    </dl>
  );
};

const App = () => (
  <DatGui>
    <h1>datgui-context-hook</h1>
    <h3>Basic Usage</h3>
    <BasicUsage />
    <h3>Constrained Input</h3>
    <ConstrainingInput />
  </DatGui>
);

ReactDOM.render(<App />, document.getElementById('app'));
