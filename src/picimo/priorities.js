/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

// renderFrame -----------------------------------------
export const PRIO_RF_CLEAR              = 1000
export const PRIO_RF_BLEND              = 900
export const PRIO_RF_PROJECTION         = 500
export const PRIO_RF_TRANSFORM          = 400
export const PRIO_RF_SPRITE_GROUP       = 100

// postRenderFrame -----------------------------------------
export const PRIO_PRF_SPRITE_GROUP       = 1000
export const PRIO_PRF_TRANSFORM          = -990
export const PRIO_PRF_PROJECTION         = -1000
export const PRIO_PRF_BLEND              = -1100
