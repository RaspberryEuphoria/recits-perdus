import { PostRepository } from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import { Move, Moves, Post } from '../../entities/post';
import { faireFaceAuDangerUsecase } from './faireFaceAuDanger';

export function useMove(
  postRepository: PostRepository,
  scenarioRepository: ScenarioRepository,
  skillRepository: SkillRepository,
) {
  return async (move: Move, postId: number) => {
    switch (move.id) {
      case Moves.FAIRE_FACE_AU_DANGER:
        return faireFaceAuDangerUsecase(
          postRepository,
          scenarioRepository,
          skillRepository,
        )(postId, move);
      default:
        throw new Error(`Move ${move.id} not found`);
    }
  };
}
