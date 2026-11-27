import { MoveResult } from '@prisma/client';

import { MoveId } from '../../entities/move';
import { ActionMove } from './actionMove';

/** Die size of the challenge dice used to end the fight (troublesome … epic) */
const FIGHT_DIFFICULTIES = [4, 6, 8, 10, 12];

export class EngagerLeCombatMove extends ActionMove {
  moveId = MoveId.ENGAGER_LE_COMBAT;

  async roll() {
    const roll = await super.roll();

    if (!FIGHT_DIFFICULTIES.includes(roll.meta.difficulty as number)) {
      throw new Error(`Move ${this.moveId} requires a difficulty in ${FIGHT_DIFFICULTIES}`);
    }

    switch (roll.moveResult) {
      case MoveResult.SUCCESS:
        this.onSuccess();
        break;
      case MoveResult.MIXED:
        this.onMixed();
        break;
      case MoveResult.FAILURE:
        this.onFailure();
        break;
    }

    return roll;
  }

  private onSuccess() {
    this.selfStatsChange.momentum += 2;
  }

  private onMixed() {
    this.selfStatsChange.momentum += 1;
  }

  private onFailure() {
    this.mustPayThePrice = true;
  }
}
