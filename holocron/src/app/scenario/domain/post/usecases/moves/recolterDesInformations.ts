import { CharacterRepository } from '../../../../infrastructure/character-sql.repository';
import {
  PostRepository,
  PostWithCharacterSkills,
} from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import { Move, MoveResult, Moves, Post } from '../../entities/post';
import { useMove } from '.';
import { ActionMoveProps, prepareActionMove } from './prepareActionMove';

const moveId = Moves.RECOLTER_DES_INFORMATIONS;
const contraindreBonus = 2;

export function recolterDesInformations(
  scenarioRepository: ScenarioRepository,
  postRepository: PostRepository,
  characterRepository: CharacterRepository,
  skillRepository: SkillRepository,
) {
  return async (move: Move, post: PostWithCharacterSkills): Promise<Post> => {
    const previousPostInScenario = await postRepository.getPreviousPostInScenario(
      post.scenarioId,
      post.id,
    );

    const hasContraindreBonus = previousPostInScenario?.moves.some(
      (move) => move.moveId === Moves.CONTRAINDRE && move.moveResult === MoveResult.SUCCESS,
    );

    const actionMove = await prepareActionMove(characterRepository, skillRepository)(
      {
        ...move,
        meta: {
          ...move.meta,
          actionBonus: hasContraindreBonus
            ? [{ label: Moves.CONTRAINDRE, value: contraindreBonus }]
            : [],
        },
      },
      post,
    );

    const { moveResult } = actionMove;

    if ([MoveResult.SUCCESS, MoveResult.MIXED].includes(moveResult)) {
      const momentumGain = moveResult === MoveResult.SUCCESS ? 2 : 1;
      return onSuccessOrMixed(actionMove, momentumGain);
    }

    if (moveResult === MoveResult.FAILURE) {
      return onFailure(actionMove);
    }

    throw new Error(`Invalid move result: ${moveResult}`);
  };

  async function onSuccessOrMixed(move: ActionMoveProps, momentum: number) {
    await characterRepository.addMomentum(move.characterId, move.scenarioId, momentum);

    return postRepository.addMove({
      ...move,
      moveId,
      isResolved: true,
    });
  }

  async function onFailure(move: ActionMoveProps) {
    await postRepository.addMove({
      ...move,
      moveId,
      isResolved: true,
    });

    const payThePriceMove = {
      id: Moves.PAYER_LE_PRIX,
      meta: { attribute: '', origin: 'previous_move', hasMomentumBurn: false },
    };

    return useMove(
      scenarioRepository,
      postRepository,
      characterRepository,
      skillRepository,
    )(payThePriceMove, move.postId);
  }
}
