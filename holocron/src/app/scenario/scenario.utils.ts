import { MoveResult } from './domain/post/entities/post';

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createRoll(max: number) {
  return () => getRandom(1, max);
}

export function getDicesResult({
  score,
  challengeDices,
  momentum,
  hasMomentumBurn,
}: {
  score: number;
  challengeDices: number[];
  momentum: number;
  hasMomentumBurn: boolean;
}) {
  if (challengeDices.every((dice) => dice >= score)) {
    if (!hasMomentumBurn || momentum <= 0) return MoveResult.FAILURE;

    const [firstDice, secondDice] = challengeDices;

    if (firstDice < momentum && secondDice < momentum) {
      return MoveResult.SUCCESS;
    }

    if (firstDice < momentum || secondDice < momentum) {
      return MoveResult.MIXED;
    }

    return MoveResult.FAILURE;
  }

  if (challengeDices.some((dice) => dice >= score)) {
    if (!hasMomentumBurn || momentum <= 0) return MoveResult.MIXED;

    const [firstDice, secondDice] = challengeDices;

    if (firstDice < momentum || secondDice < momentum) {
      return MoveResult.SUCCESS;
    }

    return MoveResult.MIXED;
  }

  if (challengeDices.every((dice) => dice < score)) {
    return MoveResult.SUCCESS;
  }

  throw new Error(`Invalid dices result! ${JSON.stringify({ score, challengeDices }, null, 4)}`);
}
