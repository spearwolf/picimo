/* eslint-env browser */
/* global PICIMO */

import './benchy'

const { body } = document

PICIMO.queryEntity('[benchy]', 'benchy').then(({ entity, benchy }) => {
  body.addEventListener('mousedown', () => benchy.setCreateMode('create'))
  body.addEventListener('mouseup', () => benchy.setCreateMode('none'))

  entity.on('benchySpriteCount', console.log.bind(console, 'benchy sprite count:'))
})
