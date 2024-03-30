import { MoveResult } from '@prisma/client';

import { MoveId } from '../../entities/move';
import { ActionMove } from './actionMove';

export class RiposterMove extends ActionMove {
  moveId = MoveId.RIPOSTER;

  async roll() {
    const roll = await super.roll();

    switch (roll.moveResult) {
      case MoveResult.SUCCESS:
        await this.onSuccess();
        break;
      case MoveResult.MIXED:
        await this.onMixed();
        break;
      case MoveResult.FAILURE:
        await this.onFailure();
        break;
    }

    return roll;
  }

  private async onSuccess() {
    await this.updateProgress(1);
    this.selfStatsChange.momentum += 1;
  }

  private async onMixed() {
    await this.updateProgress(1);
  }

  private async onFailure() {
    await this.updateProgress(0);
    this.mustPayThePrice = true;
  }
}
