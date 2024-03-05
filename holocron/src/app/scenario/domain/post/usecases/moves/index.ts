import { CharacterRepository } from '../../../../infrastructure/character-sql.repository';
import { PostRepository } from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import { Move, Moves } from '../../entities/post';
import { faireFaceAuDanger } from './faireFaceAuDanger';
import { payerLePrix } from './payerLePrix';

export function useMove(
  postRepository: PostRepository,
  scenarioRepository: ScenarioRepository,
  skillRepository: SkillRepository,
  characterRepository: CharacterRepository,
) {
  return async (move: Move, postId: number) => {
    switch (move.id) {
      case Moves.FAIRE_FACE_AU_DANGER:
        return faireFaceAuDanger(
          postRepository,
          scenarioRepository,
          skillRepository,
          characterRepository,
        )(postId, move);
      case Moves.PAYER_LE_PRIX:
        return payerLePrix(postRepository, scenarioRepository, characterRepository)(postId, move);
      default:
        throw new Error(`Move ${move.id} not found`);
    }
  };
}
