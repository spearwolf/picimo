export interface ITextureMaterial<T, M> {
  id: string;

  texture: T;

  material: M;

  refCount: number;
}

const $texMats = Symbol('m');

export class MaterialCache<T, M> {
  private [$texMats] = new Map<string, ITextureMaterial<T, M>>();

  set(id: string, texture: T, material: M, refCount = 1) {
    this[$texMats].set(id, {id, texture, material, refCount});
  }

  has(id: string): boolean {
    return this[$texMats].has(id);
  }

  get(id: string): ITextureMaterial<T, M> {
    return this[$texMats].get(id);
  }

  getMaterial(id: string): M {
    const tm = this[$texMats].get(id);
    if (tm) {
      return tm.material;
    }
    return null;
  }

  getTexture(id: string): T {
    const tm = this[$texMats].get(id);
    if (tm) {
      return tm.texture;
    }
    return null;
  }

  incRefCount(id: string) {
    const tm = this[$texMats].get(id);
    if (tm) {
      ++tm.refCount;
    }
  }

  decRefCount(id: string) {
    const tm = this[$texMats].get(id);
    if (tm && tm.refCount > 0) {
      --tm.refCount;
    }
  }

  all() {
    return Array.from(this[$texMats].values());
  }

  clear() {
    return this[$texMats].clear();
  }

  listRefCounts() {
    return Array.from(this[$texMats].keys()).map((id) => ({
      id,
      refCount: this[$texMats].get(id).refCount,
    }));
  }
}
