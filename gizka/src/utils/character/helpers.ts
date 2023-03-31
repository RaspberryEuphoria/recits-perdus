import { Character } from '@/utils/types/character';

export function getCharactersList(characters: Character[]) {
  const charactersNames = characters.map((character) => character.name);

  if (characters.length === 1) {
    return charactersNames[0];
  }

  if (characters.length === 2) {
    return charactersNames.join(' et ');
  }

  return `${charactersNames.slice(0, -1).join(', ')} et ${charactersNames.slice(-1)}`;
}
