import { DiceType, MoveResult, Post } from '@prisma/client';

import { CharacterRepository } from '../../../../infrastructure/character-sql.repository';
import { PostRepository } from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { createRoll } from '../../../../scenario.utils';
import { MoveId, MoveIntent } from '../../entities/move';

const moveId = MoveId.PAYER_LE_PRIX;

export function payerLePrix(
  scenarioRepository: ScenarioRepository,
  postRepository: PostRepository,
  characterRepository: CharacterRepository,
) {
  return async (moveIntent: MoveIntent, post: Post) => {
    const value = createRoll(100)();

    const priceDie = {
      value,
      type: DiceType.PRICE,
      isBurned: false,
    };

    if (value >= 51 && value < 60) {
      await characterRepository.removeMomentum(post.characterId, post.scenarioId, 1);
    } else if (value >= 60 && value < 69) {
      await characterRepository.removeHealth(post.characterId, post.scenarioId, 1);
    } else if (value >= 69 && value < 78) {
      await characterRepository.removeSpirit(post.characterId, post.scenarioId, 1);
    } else if (value >= 78 && value < 87) {
      await scenarioRepository.removeSupplies(post.scenarioId, 1);
    }

    const newMove = {
      characterId: post.characterId,
      dices: [priceDie],
      isResolved: true,
      meta: moveIntent.meta,
      moveId,
      moveResult: MoveResult.FAILURE,
      postId: post.id,
      scenarioId: post.scenarioId,
    };

    return postRepository.addMove(newMove);
  };
}

/**
 * Prices Table
 *
 * 1-5: Une personne ou une communauté perd sa foi ou oeuvre contre vous
 * 6-10: Une personne ou une communauté qui vous tient à coeur est exposée au danger
 * 10-16 : Vous êtes séparé de quelque chose ou de quelqu'un
 * 17-23 : Votre action a un effet imprévu
 * 24-32 : Quelque chose de valeur est perdu ou détruit
 * 33-41 : La situation actuelle se met à empirer
 * 42-50 : Un nouvel ennemi ou danger se révèle
 * 51-59 : Délai important -> PERTE DE MOMENTUM
 * 60-68 : Vous êtes blessé -> PERTE DE SANTÉ
 * 69-77 : Vous êtes stressé -> PERTE DE ESPRIT
 * 78-86 : Gaspillage de ressources -> PERTE DE SUPPLIES
 * 91-94 : Vous devez agir à l'encontre de vos intérêts
 * 95-99 : Un allié est exposé au danger
 * 100 : CATASTROPHE
 */
