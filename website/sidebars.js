/* eslint-env node */
const fs = require('fs');
const path = require('path');

const API = [];

fs.readdirSync(path.join(__dirname, 'docs/api'), {encoding: 'utf-8'})
  .sort()
  .forEach((file) => {
    apiFile = path.basename(file).replace(/\.md$/, '');
    if (apiFile.match(/^[^.]+(\.[^.]+)?$/)) {
      API.push(`api/${apiFile}`);
    }
  });

console.dir(API);

module.exports = {
  someSidebar: {
    'Getting Started': ['Introduction'],
    Guides: ['Sprites', 'Map2D', 'Projection'],
    API,
  },
};
