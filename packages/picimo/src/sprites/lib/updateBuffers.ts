import {SpriteGroup} from '../SpriteGroup';

export function updateBuffers<T, U>(
  spriteGroup: SpriteGroup<T, U>,
  getBufferVersion: () => number,
  geometryUpdateBuffers: () => void,
): void {
  const {serial, hints} = spriteGroup.voPool.voArray;

  const bufferVersion = getBufferVersion();

  if (hints.autotouch || serial !== bufferVersion) {
    geometryUpdateBuffers();
    spriteGroup.voPool.voArray.serial = bufferVersion;
  }
}
