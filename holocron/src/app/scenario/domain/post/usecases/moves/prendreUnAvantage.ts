import { CharactersOnScenarios } from '@prisma/client';

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

const moveId = Moves.PRENDRE_UN_AVANTAGE;

export function prendreUnAvantage(
  scenarioRepository: ScenarioRepository,
  postRepository: PostRepository,
  characterRepository: CharacterRepository,
  skillRepository: SkillRepository,
) {
  return async (move: Move, post: PostWithCharacterSkills): Promise<Post> => {
    const actionMove = await prepareActionMove(characterRepository, skillRepository)(move, post);

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
