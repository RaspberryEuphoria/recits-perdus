import { DiceType } from '@prisma/client';

export type Dice = {
  id?: number;
  value: number;
  type: DiceType;
  isBurned: boolean;
};
