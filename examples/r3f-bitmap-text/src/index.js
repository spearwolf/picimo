import {DatGui} from 'datgui-context-hook';
import {Logger} from 'picimo';
import React from 'react';
import ReactDOM from 'react-dom';

import {Demo} from './Demo';

const log = new Logger('r3f-bitmap-text');
log.info('hello');

ReactDOM.render(
  <DatGui>
    <Demo />
  </DatGui>,
  document.getElementById('picimo'),
);
