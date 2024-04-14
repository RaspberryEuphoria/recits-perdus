import { DiceType, MoveResult } from '@prisma/client';

import { DangerOnStat, DangerOnStory, MoveBonus } from './domain/post/entities/move';
import { Dice } from './domain/post/entities/post';

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createRoll(max: number) {
  return () => getRandom(1, max);
}

export function computeBonus(bonus?: MoveBonus[]) {
  if (!bonus || bonus.length === 0) return 0;

  return bonus.reduce((acc, { value }) => {
    return acc + value;
  }, 0);
}

export function resolveChallengeDices(
  score: number,
  challengeRolls: number[],
  momentum: number,
  hasMomentumBurn = false,
) {
  const dices = challengeRolls.map((dice) => ({
    type: DiceType.CHALLENGE,
    value: dice,
    isBurned: false,
  }));

  if (!hasMomentumBurn) return dices;

  return dices.map((dice) => ({
    ...dice,
    isBurned: dice.value >= score && dice.value < momentum,
  }));
}

export function getDicesResult({
  score,
  challengeDices,
}: {
  score: number;
  challengeDices: Dice[];
}) {
  const isInferiorToScore = (dice: Dice) => dice.value < score;
  const isBurned = (dice: Dice) => dice.isBurned;

  if (challengeDices.every(isInferiorToScore)) {
    return MoveResult.SUCCESS;
  }

  if (challengeDices.some(isInferiorToScore)) {
    if (challengeDices.some(isBurned)) return MoveResult.SUCCESS;

    return MoveResult.MIXED;
  }

  if (challengeDices.every(isBurned)) {
    return MoveResult.SUCCESS;
  }

  if (challengeDices.some(isBurned)) {
    return MoveResult.MIXED;
  }

  return MoveResult.FAILURE;
}

export function isStat(value: unknown): value is DangerOnStat {
  if (value === null || value === undefined) return false;

  return (
    value === DangerOnStat.HEALTH ||
    value === DangerOnStat.MOMENTUM ||
    value === DangerOnStat.SPIRIT ||
    value === DangerOnStat.SUPPLIES
  );
}

export function isStory(value: unknown): value is DangerOnStory {
  if (value === null || value === undefined) return false;

  return (
    value === DangerOnStory.DAMAGE ||
    value === DangerOnStory.GOAL_IS_LOST ||
    value === DangerOnStory.NEW_DANGER ||
    value === DangerOnStory.VENDETTA
  );
}
