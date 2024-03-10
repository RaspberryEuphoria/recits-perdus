import { CharacterRepository } from '../../../../infrastructure/character-sql.repository';
import {
  PostRepository,
  PostWithCharacterSkills,
} from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import { Move, MoveResult, Moves, Post, Stat } from '../../entities/post';
import { useMove } from '.';
import { ActionMoveProps, prepareActionMove } from './prepareActionMove';

const moveId = Moves.PRODIGUER_DES_SOINS;

export function prodiguerDesSoins(
  scenarioRepository: ScenarioRepository,
  postRepository: PostRepository,
  characterRepository: CharacterRepository,
  skillRepository: SkillRepository,
) {
  return async (move: Move, post: PostWithCharacterSkills): Promise<Post> => {
    const actionMove = await prepareActionMove(characterRepository, skillRepository)(move, post);

    const { moveResult, meta } = actionMove;

    if (moveResult === MoveResult.SUCCESS) {
      return onSuccess(actionMove);
    }

    if (moveResult === MoveResult.MIXED) {
      if (!meta.danger) {
        throw new Error(`Move ${move.id} requires a danger!`);
      }

      return onMixed(actionMove, meta.danger);
    }

    if (moveResult === MoveResult.FAILURE) {
      return onFailure(actionMove);
    }

    throw new Error(`Invalid move result: ${moveResult}`);
  };

  async function onSuccess(move: ActionMoveProps) {
    const { targetId } = move.meta;

    if (targetId && targetId > 0) {
      await characterRepository.addHealth(targetId, move.scenarioId, 2);
    }

    return postRepository.addMove({
      ...move,
      moveId,
      isResolved: true,
    });
  }

  async function onMixed(move: ActionMoveProps, danger: Stat) {
    const { characterId, scenarioId } = move;
    const { targetId } = move.meta;

    if (targetId && targetId > 0) {
      await characterRepository.addHealth(targetId, move.scenarioId, 2);
    }

    switch (danger) {
      case Stat.MOMENTUM:
        await characterRepository.removeMomentum(characterId, scenarioId, 1);
        break;
      case Stat.SUPPLIES:
        await scenarioRepository.removeSupplies(scenarioId, 1);
        break;
    }

    return postRepository.addMove({
      ...move,
      moveId,
      isResolved: false,
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
