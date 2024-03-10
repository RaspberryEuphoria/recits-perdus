import { Dice, DiceType, MoveResult } from './domain/post/entities/post';

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createRoll(max: number) {
  return () => getRandom(1, max);
}

export function resolveChallengeDices(
  score: number,
  challengeRolls: number[],
  momentum: number,
  hasMomentumBurn: boolean,
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
  if (challengeDices.every((dice) => dice.value >= score && !dice.isBurned)) {
    if (challengeDices.every((dice) => dice.isBurned)) {
      return MoveResult.SUCCESS;
    }

    if (challengeDices.some((dice) => dice.isBurned)) {
      return MoveResult.MIXED;
    }

    return MoveResult.FAILURE;
  }

  if (challengeDices.some((dice) => dice.value >= score)) {
    if (challengeDices.some((dice) => dice.isBurned)) return MoveResult.SUCCESS;

    return MoveResult.MIXED;
  }

  if (challengeDices.every((dice) => dice.value < score)) {
    return MoveResult.SUCCESS;
  }

  throw new Error(`Invalid dices result! ${JSON.stringify({ score, challengeDices }, null, 4)}`);
}
