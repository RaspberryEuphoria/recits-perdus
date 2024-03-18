import { MoveResult } from '@prisma/client';

import { MoveId } from '../../entities/move';
import { ActionMove } from './actionMove';

export class MarchanderMove extends ActionMove {
  moveId = MoveId.MARCHANDER;

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
    this.selfStatsChange.momentum += 1;
    this.groupStatsChange.supplies += 2;
  }

  private onMixed() {
    this.groupStatsChange.supplies++;
  }

  private onFailure() {
    this.groupStatsChange.supplies += 1;
    this.selfStatsChange.momentum -= 1;
    this.mustPayThePrice = true;
  }
}
