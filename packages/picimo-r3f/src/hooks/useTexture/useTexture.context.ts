import {createContext} from 'react';
import {Texture, TextureAtlas} from 'picimo';
import {ITextureState, createInitialState} from './useTexture.state';

export type TextureSetterType = (texture: Promise<Texture|TextureAtlas>|Texture|TextureAtlas) => void;

export interface ITextureContext {
  state: ITextureState;
  dispatch: (name: string, isTextureAtlas: boolean) => TextureSetterType;
}

export const TextureContext = createContext<ITextureContext>({
  state: createInitialState(),
  dispatch: undefined,
});
