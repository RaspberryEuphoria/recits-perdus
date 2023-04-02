import { Character } from '@/utils/types/character';

export function getCharactersList({
  characters,
  withColor = false,
}: {
  characters: Character[];
  withColor?: boolean;
}) {
  const charactersNames = characters.map((character) => getName(character, withColor));

  if (characters.length === 1) {
    return charactersNames[0];
  }

  if (characters.length === 2) {
    return charactersNames.join(' et ');
  }

  return `${charactersNames.slice(0, -1).join(', ')} et ${charactersNames.slice(-1)}`;
}

function getName(character: Character, withColor: boolean) {
  return withColor && character.textColor
    ? `<strong style="color: ${character.textColor}">${character.name}</strong>`
    : character.name;
}
