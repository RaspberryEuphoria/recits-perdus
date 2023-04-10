import { getCharactersList } from '@/utils/character/helpers';
import { Character } from '@/utils/types/character';
import { Scenario } from '@/utils/types/scenario';

export function generateIntroduction(scenario: Scenario) {
  const tokens = ['{{characters}}'];
  const replacements = [getCharactersList({ characters: scenario.characters, withColor: true })];

  return tokens.reduce(
    (acc, token, index) => acc.replace(token, replacements[index]),
    scenario.introduction,
  );
}

export function getNextPoster(characters: Character[], lastPoster: Character) {
  if (!lastPoster) return characters[0];

  const lastPosterIndex = characters.findIndex((character) => character.id === lastPoster.id);
  return characters[lastPosterIndex + 1] || characters[0];
}

export function getCurrentTurnNumber(postsLength: number, charactersLength: number) {
  // the current turn number is the number of posts divided by the number of characters
  // plus one because the first turn is the introduction
  return Math.floor(postsLength / charactersLength) + 1;
}

export function convertHexadecimalColorToHsl(color: string, opacity = 1) {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function formatPostContent(content: string) {
  return content.replace(/["«]([^"]+)["»]/g, `«&nbsp;<strong>$1</strong>&nbsp;»`);
}
