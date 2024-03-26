import { MoveResult } from '@prisma/client';

import { MoveId } from '../../entities/move';
import { ActionMove } from './actionMove';

export class ContraindreMove extends ActionMove {
  moveId = MoveId.CONTRAINDRE;

  async roll() {
    const roll = await super.roll();

    switch (roll.moveResult) {
      case MoveResult.SUCCESS:
        this.onSuccess();
        break;
      case MoveResult.FAILURE:
        this.onFailure();
        break;
    }

    return roll;
  }

  private onSuccess() {
    this.selfStatsChange.momentum += 1;
  }

  /** Nothing happens on a MIXED result */

  private onFailure() {
    this.mustPayThePrice = true;
  }
}
