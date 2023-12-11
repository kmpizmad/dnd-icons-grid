import { Prettify } from './utils';

export type SpriteType = { characterId: string; url: string; displayName: string };
export type SpriteValue = Prettify<{ id: number; x: number; y: number } & SpriteType>;

export function isSpriteValue(sprite: SpriteType | SpriteValue): sprite is SpriteValue {
  const value = sprite as SpriteValue;
  return typeof value.id !== 'undefined' && typeof value.x !== 'undefined' && typeof value.y !== 'undefined';
}
