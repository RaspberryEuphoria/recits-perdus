import { DiceType, MoveResult } from '@/utils/types/scenario';

export function generateRandomMoveOutcome(currentMove: any) {
  const result = rand(1, 3);

  // Failure
  if (result === 1) {
    return {
      id: 0,
      moveId: currentMove.id,
      skill: {
        name: 'Attribut',
        value: 2,
        id: 0,
        skillId: currentMove?.meta?.skillId,
        level: 2,
        skill: {},
      },
      skillId: currentMove?.meta?.skillId,
      skillValue: 2,
      dices: [
        {
          id: 0,
          value: rand(1, 3),
          type: DiceType.ACTION,
          isBurned: false,
        },
        {
          id: 1,
          value: rand(5, 6),
          type: DiceType.CHALLENGE,
          isBurned: false,
        },
        {
          id: 2,
          value: rand(7, 8),
          type: DiceType.CHALLENGE,
          isBurned: false,
        },
      ],
      moveResult: MoveResult.FAILURE,
    };
  }

  // Mixed
  else if (result === 2) {
    return {
      id: 0,
      moveId: currentMove.id,
      skill: {
        name: 'Attribut',
        value: 2,
        id: 0,
        skillId: currentMove?.meta?.skillId,
        level: 2,
        skill: {},
      },
      skillId: currentMove?.meta?.skillId,
      skillValue: 2,
      dices: [
        {
          id: 0,
          value: rand(3, 5),
          type: DiceType.ACTION,
          isBurned: false,
        },
        {
          id: 1,
          value: rand(8, 8),
          type: DiceType.CHALLENGE,
          isBurned: false,
        },
        {
          id: 2,
          value: rand(1, 4),
          type: DiceType.CHALLENGE,
          isBurned: false,
        },
      ],
      moveResult: MoveResult.MIXED,
    };
  }

  return {
    id: 0,
    moveId: currentMove.id,
    skill: {
      name: 'Attribut',
      value: 2,
      id: 0,
      skillId: currentMove?.meta?.skillId,
      level: 2,
      skill: {},
    },
    skillId: currentMove?.meta?.skillId,
    skillValue: 2,
    dices: [
      {
        id: 0,
        value: rand(5, 6),
        type: DiceType.ACTION,
        isBurned: false,
      },
      {
        id: 1,
        value: rand(1, 6),
        type: DiceType.CHALLENGE,
        isBurned: false,
      },
      {
        id: 2,
        value: rand(1, 6),
        type: DiceType.CHALLENGE,
        isBurned: false,
      },
    ],
    moveResult: MoveResult.SUCCESS,
  };
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
