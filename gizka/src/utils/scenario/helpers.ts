import { getCharactersList } from '@/utils/character/helpers';
import { Character } from '@/utils/types/character';
import { MoveResult, Moves, Post, Scenario, Skill } from '@/utils/types/scenario';

import { TextColor } from '../constants';

export function generateIntroduction(scenario: Scenario, withColor = true) {
  const tokens = ['{{characters}}'];
  const replacements = [getCharactersList({ characters: scenario.characters, withColor })];

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

export function checkIfGameMaster(posts: Post[], charactersCount: number) {
  return false; // This feature is currently disabled
  if (!posts.length) return false; // The GM never posts on the first turn

  const currentTurnPosts = getCurrentTurnPosts(posts);
  return checkIfNewTurn(currentTurnPosts, charactersCount); // The GM posts on the first post of a new turn
}

function getCurrentTurnPosts(posts: Post[]) {
  const [lastPost] = posts.slice(-1);
  const currentTurnPosts = posts.filter((post) => post.turn === lastPost.turn);
  return currentTurnPosts;
}

function checkIfNewTurn(currentTurnPosts: Post[], charactersCount: number) {
  const currentTurn = currentTurnPosts[0].turn;
  if (currentTurn === 1) return currentTurnPosts.length === charactersCount;
  return currentTurnPosts.length === charactersCount; // +1 to account for the GM
}

export function getCurrentTurnNumber(postsLength: number, charactersLength: number) {
  // the current turn number is the number of posts divided by the number of characters
  // plus one because the first turn is the introduction
  return Math.floor(postsLength / charactersLength) + 1;
}

export function convertHexadecimalColorToHsl(color: string = TextColor.Default, opacity = 1) {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function formatPostContent(content: string) {
  return content
    .replace(/["«]([^"]+)["»]/g, `“<strong>$1</strong>”`)
    .replace(/[*]([^"]+)[*]/g, `“<bold>$1</bold>”`);
}

export const skillWordings = {
  [Skill.FINESSE]: {
    defini: 'la ',
    indefini: 'une ',
    partitif: 'de ',
    possessif: 'sa ',
  },
  [Skill.DETERMINATION]: {
    defini: 'la ',
    indefini: 'une ',
    partitif: 'de ',
    possessif: 'sa ',
  },
  [Skill.TENACITE]: {
    defini: 'la ',
    indefini: 'une ',
    partitif: 'de ',
    possessif: 'sa ',
  },
  [Skill.SUBTERFUGE]: {
    defini: 'le ',
    indefini: 'un ',
    partitif: 'de ',
    possessif: 'son ',
  },
  [Skill.INTUITION]: {
    defini: 'l’',
    indefini: 'une ',
    partitif: 'd’',
    possessif: 'son ',
  },
};

export function movesNames(moveId: string) {
  const moves: Record<string, string> = {
    [Moves.FAIRE_FACE_AU_DANGER]: 'Faire Face au Danger',
    [Moves.PRENDRE_UN_AVANTAGE]: 'Prendre Un Avantage',
    [Moves.RECOLTER_DES_INFORMATIONS]: 'Récolter des Informations',
    [Moves.PRODIGUER_DES_SOINS]: 'Prodiguer des Soins',
    [Moves.PAYER_LE_PRIX]: 'Payer le Prix',
  };

  if (!moves[moveId]) throw new Error(`Move with id ${moveId} not found`);

  return moves[moveId];
}

/** We're gonna need i18n and soon... */
export function statEnToFr(stat: string) {
  const stats: Record<string, string> = {
    momentum: 'ferveur',
    health: 'santé',
    spirit: 'esprit',
    supplies: 'provisions',
  };

  if (!stats[stat]) throw new Error(`Stat ${stat} not found`);

  return stats[stat];
}

export function statFrToEn(stat: string) {
  const stats: Record<string, string> = {
    ferveur: 'momentum',
    santé: 'health',
    esprit: 'spirit',
    provisions: 'supplies',
  };

  if (!stats[stat]) throw new Error(`Stat ${stat} not found`);

  return stats[stat];
}

/* This function get the *native* dice result, .ie without momentum burn */
export function getDicesResult({
  score,
  challengeDices,
}: {
  score: number;
  challengeDices: number[];
}) {
  if (challengeDices.every((dice) => dice >= score)) {
    return MoveResult.FAILURE;
  }

  if (challengeDices.some((dice) => dice >= score)) {
    return MoveResult.MIXED;
  }

  if (challengeDices.every((dice) => dice < score)) {
    return MoveResult.SUCCESS;
  }

  throw new Error(`Invalid dices result! ${JSON.stringify({ score, challengeDices }, null, 4)}`);
}
