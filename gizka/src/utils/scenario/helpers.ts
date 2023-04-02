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
