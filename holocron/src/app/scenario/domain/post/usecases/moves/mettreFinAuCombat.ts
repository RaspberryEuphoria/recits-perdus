import { MoveResult } from '@prisma/client';

import { isStat, isStory } from '../../../../scenario.utils';
import { DangerOnStat, MoveId } from '../../entities/move';
import { ActionMove } from './actionMove';

export class MettreFinAuCombatMove extends ActionMove {
  moveId = MoveId.METTRE_FIN_AU_COMBAT;

  async roll() {
    const currentProgress = await this.getCurrentFightProgress();
    const maxDifficulty = await this.getCurrentFightDifficulty();
    const roll = await super.roll({ overridedScore: currentProgress, maxDifficulty });

    this.updateMoveIntentMeta({ difficulty: maxDifficulty });

    if (!isStat(roll.meta.danger) && !isStory(roll.meta.danger)) {
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
      case DangerOnStat.HEALTH:
        this.selfStatsChange.health -= 1;
        break;
      case DangerOnStat.SPIRIT:
        this.selfStatsChange.spirit -= 1;
        break;
    }
  }

  private onFailure(danger: DangerOnStat) {
    this.mustPayThePrice = true;
    this.onMixed(danger);
  }
}
