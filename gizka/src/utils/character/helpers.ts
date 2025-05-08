import { Character } from '@/utils/types/character';
import { ScenarioStatus } from '@/utils/types/scenario';

export function getCharactersList({
  characters,
  withColor = false,
}: {
  characters: Character[];
  withColor?: boolean;
}) {
  const charactersNames = characters.map((character) => getFullName(character, withColor));

  if (characters.length === 1) {
    return charactersNames[0];
  }

  if (characters.length === 2) {
    return charactersNames.join(' et ');
  }

  return `${charactersNames.slice(0, -1).join(', ')} et ${charactersNames.slice(-1)}`;
}

export function getFullName(
  character: Pick<Character, 'firstName' | 'lastName' | 'textColor'>,
  withColor?: boolean,
) {
  return withColor && character.textColor
    ? `<strong style="color: ${character.textColor}">${character.firstName} ${character.lastName}</strong>`
    : `${character.firstName} ${character.lastName}`;
}

export function getSafeName(character: Character) {
  return `${character.firstName}-${character.lastName}`
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^-a-zA-Z0-9]/g, '');
}

export function isCharacterAvailable(character: Character) {
  return (
    !character.scenario ||
    character.scenario.length === 0 ||
    !character.scenario.find((scenario) =>
      [ScenarioStatus.INITIATED, ScenarioStatus.IN_PROGRESS].includes(scenario.scenario.status),
    )
  );
}
