import { MoveResult } from '@prisma/client';

import { isStat } from '../../../../scenario.utils';
import { DangerOnStat, MoveId } from '../../entities/move';
import { ActionMove } from './actionMove';

export class ProdiguerDesSoinsMove extends ActionMove {
  moveId = MoveId.PRODIGUER_DES_SOINS;

  async roll() {
    const roll = await super.roll();

    if (roll.meta.targetId) {
      this.targetStatsChange.id = roll.meta.targetId;
    }

    switch (roll.moveResult) {
      case MoveResult.SUCCESS:
        this.onSuccess();
        break;
      case MoveResult.MIXED:
        if (!isStat(roll.meta.danger)) {
          throw new Error(
            `Invalid danger ${roll.meta.danger} when attempting to use move ${this.moveId}`,
          );
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
    this.targetStatsChange.health += 2;
  }

  private onMixed(danger: DangerOnStat) {
    this.targetStatsChange.health += 2;
    switch (danger) {
      case DangerOnStat.MOMENTUM:
        this.selfStatsChange.momentum -= 1;
        break;
      case DangerOnStat.SUPPLIES:
        this.groupStatsChange.supplies -= 1;
        break;
    }
  }

  private onFailure() {
    this.mustPayThePrice = true;
  }
}
