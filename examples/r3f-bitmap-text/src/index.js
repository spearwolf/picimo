import {Logger} from 'picimo';
import React from 'react';
import ReactDOM from 'react-dom';

import {Demo} from './Demo';

const log = new Logger('r3f-bitmap-text');
log.info('hello');

ReactDOM.render(<Demo />, document.getElementById('picimo'));
