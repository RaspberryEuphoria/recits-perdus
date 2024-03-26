import { MoveResult } from '@prisma/client';

import { MoveId } from '../../entities/move';
import { ActionMove } from './actionMove';

export class RecolterDesInformationsMove extends ActionMove {
  moveId = MoveId.RECOLTER_DES_INFORMATIONS;

  async roll() {
    await this.checkForBonus();

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

  private async checkForBonus() {
    const previousPostMoves = await this.getPreviousPostMove();

    const hasContraindreBonus = previousPostMoves?.some(
      (move) => move.moveId === MoveId.CONTRAINDRE && move.moveResult === MoveResult.SUCCESS,
    );

    if (hasContraindreBonus) {
      this.moveBonus.push({
        label: `Bonus from previous move success (${MoveId.CONTRAINDRE})`,
        value: 2,
      });
    }
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
