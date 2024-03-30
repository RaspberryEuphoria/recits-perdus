import { MoveResult } from '@prisma/client';

import { MoveId } from '../../entities/move';
import { ActionMove } from './actionMove';

export class EngagerLeCombatMove extends ActionMove {
  moveId = MoveId.ENGAGER_LE_COMBAT;

  async roll() {
    const roll = await super.roll();

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
