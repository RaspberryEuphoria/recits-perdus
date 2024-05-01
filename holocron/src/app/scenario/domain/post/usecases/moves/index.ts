import { CharactersOnScenarios } from '@prisma/client';

import { CharacterRepository } from '../../../../infrastructure/character-sql.repository';
import {
  PostRepository,
  PostWithCharacterSkills,
} from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import { MoveId, MoveIntent } from '../../entities/move';
import { ActionLibreMove } from './actionLibre';
import { ActionMove } from './actionMove';
import { AttaquerMove } from './attaquer';
import { ContraindreMove } from './contraindre';
import { EngagerLeCombatMove } from './engagerLeCombat';
import { FaireFaceAuDangerMove } from './faireFaceAuDanger';
import { MarchanderMove } from './marchander';
import { MettreFinAuCombatMove } from './mettreFinAuCombat';
import { payerLePrix } from './payerLePrix';
import { PrendreUnAvantageMove } from './prendreUnAvantage';
import { ProdiguerDesSoinsMove } from './prodiguerDesSoins';
import { RavitaillerMove } from './ravitailler';
import { RecolterDesInformationsMove } from './recolterDesInformations';
import { RiposterMove } from './riposter';

export function useMove(
  scenarioRepository: ScenarioRepository,
  postRepository: PostRepository,
  characterRepository: CharacterRepository,
  skillRepository: SkillRepository,
) {
  return async (moveIntent: MoveIntent, postId: number) => {
    const post = await postRepository.getById(postId);
    if (!post) {
      throw new Error(`Post ${postId} not found while attempting to use move ${moveIntent.id}`);
    }

    const characterOnScenario = await characterRepository.getOnScenario(
      post.characterId,
      post.scenarioId,
    );
    if (!characterOnScenario) {
      throw new Error(
        `Character ${post.characterId} not found on scenario ${post.scenarioId} while attempting to use move ${moveIntent.id}`,
      );
    }

    /**
     * PayerLePrix is the only "non-action" move.
     * As such, it doesn't need to be handled by the ActionMove class.
     */
    if (moveIntent.id === MoveId.PAYER_LE_PRIX) {
      return payerLePrix(scenarioRepository, postRepository, characterRepository)(moveIntent, post);
    }

    const moveHandler = getMoveHandler(
      moveIntent.id,
      scenarioRepository,
      postRepository,
      characterRepository,
      skillRepository,
      characterOnScenario,
      moveIntent,
      post,
    );

    await moveHandler.roll();

    return await moveHandler.commit();
  };
}

function getMoveHandler(
  moveId: MoveId,
  ...args: [
    ScenarioRepository,
    PostRepository,
    CharacterRepository,
    SkillRepository,
    CharactersOnScenarios,
    MoveIntent,
    PostWithCharacterSkills,
  ]
): ActionMove {
  switch (moveId) {
    case MoveId.FAIRE_FACE_AU_DANGER:
      return new FaireFaceAuDangerMove(...args);
    case MoveId.CONTRAINDRE:
      return new ContraindreMove(...args);
    case MoveId.PRENDRE_UN_AVANTAGE:
      return new PrendreUnAvantageMove(...args);
    case MoveId.MARCHANDER:
      return new MarchanderMove(...args);
    case MoveId.PRODIGUER_DES_SOINS:
      return new ProdiguerDesSoinsMove(...args);
    case MoveId.RAVITAILLER:
      return new RavitaillerMove(...args);
    case MoveId.RECOLTER_DES_INFORMATIONS:
      return new RecolterDesInformationsMove(...args);
    case MoveId.ENGAGER_LE_COMBAT:
      return new EngagerLeCombatMove(...args);
    case MoveId.ATTAQUER:
      return new AttaquerMove(...args);
    case MoveId.RIPOSTER:
      return new RiposterMove(...args);
    case MoveId.METTRE_FIN_AU_COMBAT:
      return new MettreFinAuCombatMove(...args);
    case MoveId.ACTION_LIBRE:
      return new ActionLibreMove(...args);
    default:
      throw new Error(`Move ${moveId} not implemented`);
  }
}
