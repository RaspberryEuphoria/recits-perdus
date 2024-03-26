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

//   const previousPostInScenario = await postRepository.getPreviousPostInScenario(
//     post.scenarioId,
//     post.id,
//   );

//   const hasContraindreBonus = previousPostInScenario?.moves.some(
//     (move) => move.moveId === Moves.CONTRAINDRE && move.moveResult === MoveResult.SUCCESS,
//   );

//   const actionMove = await prepareActionMove(characterRepository, skillRepository)(
//     {
//       ...move,
//       meta: {
//         ...move.meta,
//         actionBonus: hasContraindreBonus
//           ? [{ label: Moves.CONTRAINDRE, value: contraindreBonus }]
//           : [],
//       },
//     },
//     post,
//   );

//   const { moveResult } = actionMove;

//   if ([MoveResult.SUCCESS, MoveResult.MIXED].includes(moveResult)) {
//     const momentumGain = moveResult === MoveResult.SUCCESS ? 2 : 1;
//     return onSuccessOrMixed(actionMove, momentumGain);
//   }

//   if (moveResult === MoveResult.FAILURE) {
//     return onFailure(actionMove);
//   }

//   throw new Error(`Invalid move result: ${moveResult}`);
// };

// async function onSuccessOrMixed(move: ActionMoveProps, momentum: number) {
//   await characterRepository.addMomentum(move.characterId, move.scenarioId, momentum);

//   return postRepository.addMove({
//     ...move,
//     moveId,
//     isResolved: true,
//   });
// }
