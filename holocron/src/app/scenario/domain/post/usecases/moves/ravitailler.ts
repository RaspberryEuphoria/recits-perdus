import { MoveResult } from '@prisma/client';

import { MoveId } from '../../entities/move';
import { ActionMove } from './actionMove';

export class RavitaillerMove extends ActionMove {
  moveId = MoveId.RAVITAILLER;

  async roll() {
    const roll = await super.roll();

    switch (roll.moveResult) {
      case MoveResult.SUCCESS:
        this.onSuccess();
        break;
      case MoveResult.MIXED:
        if (typeof roll.meta.danger !== 'number') {
          throw new Error(`Move ${this.moveId} requires a number value as a danger!`);
        }

        this.onMixed(roll.meta.danger);
        break;
      case MoveResult.FAILURE:
        this.onFailure();
        break;
    }

    return roll;
  }

  private onSuccess() {
    this.groupStatsChange.supplies += 2;
  }

  private onMixed(danger: number) {
    this.groupStatsChange.supplies += danger;
    this.selfStatsChange.momentum -= danger;
  }

  private onFailure() {
    this.mustPayThePrice = true;
  }
}
