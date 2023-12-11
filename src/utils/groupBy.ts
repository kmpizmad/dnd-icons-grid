import { SpriteValue } from '../interfaces/sprite';
import { Character } from '../interfaces/utils';

export function groupByCharacterId(data: SpriteValue[]) {
  const group = new Map<string, Character>();
  data.forEach(value => {
    const newCoordinate = { x: value.y, y: value.x };
    if (group.has(value.characterId)) {
      const current = group.get(value.characterId);
      if (current) group.set(value.characterId, { ...current, coordinates: [...current.coordinates, newCoordinate] });
    } else {
      group.set(value.characterId, { displayName: value.displayName, coordinates: [newCoordinate] });
    }
  });
  return group;
}
