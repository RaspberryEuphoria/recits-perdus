import { MoveResult } from '@prisma/client';

import { isStat } from '../../../../scenario.utils';
import { DangerOnStat, MoveId } from '../../entities/move';
import { ActionMove } from './actionMove';

export class FaireFaceAuDangerMove extends ActionMove {
  moveId = MoveId.FAIRE_FACE_AU_DANGER;

  async roll() {
    const roll = await super.roll();

    if (!isStat(roll.meta.danger)) {
      throw new Error(
        `Invalid danger ${roll.meta.danger} when attempting to use move ${this.moveId}`,
      );
    }

    switch (roll.moveResult) {
      case MoveResult.SUCCESS:
        this.onSuccess();
        break;
      case MoveResult.MIXED:
        this.onMixed(roll.meta.danger);
        break;
      case MoveResult.FAILURE:
        this.onFailure(roll.meta.danger);
        break;
    }

    return roll;
  }

  private onSuccess() {
    this.selfStatsChange.momentum += 1;
  }

  private onMixed(danger: DangerOnStat) {
    switch (danger) {
      case DangerOnStat.MOMENTUM:
        this.selfStatsChange.momentum -= 1;
        break;
      case DangerOnStat.HEALTH:
        this.selfStatsChange.health -= 1;
        break;
      case DangerOnStat.SPIRIT:
        this.selfStatsChange.spirit -= 1;
        break;
      case DangerOnStat.SUPPLIES:
        this.groupStatsChange.supplies -= 1;
        break;
    }
  }

  private onFailure(danger: DangerOnStat) {
    this.mustPayThePrice = true;
    this.onMixed(danger);
  }
}
