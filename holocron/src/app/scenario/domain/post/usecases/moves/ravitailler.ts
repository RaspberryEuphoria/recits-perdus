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

const moveId = Moves.RAVITAILLER;

export function ravitailler(
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

      if (typeof meta.danger !== 'number') {
        throw new Error(`Move ${move.id} requires a number value as a danger!`);
      }

      return onMixed(actionMove, meta.danger);
    }

    if (moveResult === MoveResult.FAILURE) {
      return onFailure(actionMove);
    }

    throw new Error(`Invalid move result: ${moveResult}`);
  };

  async function onSuccess(move: ActionMoveProps) {
    await scenarioRepository.addSupplies(move.scenarioId, 2);

    return postRepository.addMove({
      ...move,
      moveId,
      isResolved: true,
    });
  }

  async function onMixed(move: ActionMoveProps, danger: number) {
    const { characterId, scenarioId } = move;

    await scenarioRepository.addSupplies(scenarioId, danger);
    await characterRepository.removeMomentum(characterId, scenarioId, danger);

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
