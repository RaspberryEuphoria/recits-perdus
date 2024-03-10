import { Post } from '@prisma/client';

import { CharacterRepository } from '../../../../infrastructure/character-sql.repository';
import {
  PostRepository,
  PostWithCharacterSkills,
} from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import { Move, Moves } from '../../entities/post';
import { faireFaceAuDanger } from './faireFaceAuDanger';
import { payerLePrix } from './payerLePrix';
import { prendreUnAvantage } from './prendreUnAvantage';
import { prodiguerDesSoins } from './prodiguerDesSoins';
import { recolterDesInformations } from './recolterDesInformations';

type MoveFunction = (
  scenarioRepository: ScenarioRepository,
  postRepository: PostRepository,
  characterRepository: CharacterRepository,
  skillRepository: SkillRepository,
) => (move: Move, post: PostWithCharacterSkills) => Promise<Post>;

export function useMove(
  scenarioRepository: ScenarioRepository,
  postRepository: PostRepository,
  characterRepository: CharacterRepository,
  skillRepository: SkillRepository,
) {
  return async (move: Move, postId: number) => {
    const post = await postRepository.getById(postId);
    if (!post) {
      throw new Error(`Post ${postId} not found while attempting to use move ${move.id}`);
    }

    const moveFunction = getMoveById(move.id);

    return moveFunction(
      scenarioRepository,
      postRepository,
      characterRepository,
      skillRepository,
    )(move, post);
  };
}

function getMoveById(id: Moves): MoveFunction {
  switch (id) {
    case Moves.FAIRE_FACE_AU_DANGER:
      return faireFaceAuDanger;
    case Moves.PRENDRE_UN_AVANTAGE:
      return prendreUnAvantage;
    case Moves.RECOLTER_DES_INFORMATIONS:
      return recolterDesInformations;
    case Moves.PAYER_LE_PRIX:
      return payerLePrix;
    case Moves.PRODIGUER_DES_SOINS:
      return prodiguerDesSoins;
    default:
      throw new Error(`Move ${id} not implemented`);
  }
}
