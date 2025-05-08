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

    switch (roll.moveResult) {
      case MoveResult.SUCCESS:
        this.onSuccess();
        break;
      case MoveResult.MIXED:
        if (!isStat(roll.meta.danger) && !isStory(roll.meta.danger)) {
          throw new Error(
            `Invalid danger ${roll.meta.danger} when attempting to use move ${this.moveId}`,
          );
        }

        if (isStat(roll.meta.danger)) {
          this.onMixed(roll.meta.danger);
        }

        // There is no mechanical consequence to a danger on the story, that's why this case is not handled

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

  private onFailure() {
    this.mustPayThePrice = true;
  }
}
