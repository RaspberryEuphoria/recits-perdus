import { MoveResult } from './domain/post/entities/post';

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createRoll(max: number) {
  return () => getRandom(1, max);
}

export function getDicesResult(score: number, challengeDices: number[]) {
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
