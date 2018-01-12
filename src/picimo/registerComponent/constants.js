
export const RESERVED_SELECTOR_NAMES = [
  'url',
  'vec2',
  'vec3',
  'vec4'
]

export const SELECTOR_REGEX = RegExp(`([a-zA-Z][a-zA-Z0-9]*)\\((.*)\\)`)

export const PRE_CONDITION_ATTRIBUTES = 'preConditionAttributes'
export const EVENT_SUBSCRIPTIONS = 'eventSubscriptions'

export const RENDER_FRAME = 'renderFrame'
export const POST_RENDER_FRAME = 'postRenderFrame'

export const COMPONENT_CREATED = 'componentCreated'
export const COMPONENT_UPDATED = 'componentUpdated'
export const COMPONENT_DESTROY = 'componentDestroy'
