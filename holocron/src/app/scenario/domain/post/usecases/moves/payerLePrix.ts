import { CharacterRepository } from '../../../../infrastructure/character-sql.repository';
import { PostRepository } from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { createRoll } from '../../../../scenario.utils';
import { DiceType, Move, MoveResult, Moves } from '../../entities/post';

export function payerLePrix(
  postRepository: PostRepository,
  scenarioRepository: ScenarioRepository,
  characterRepository: CharacterRepository,
) {
  const moveId = Moves.PAYER_LE_PRIX;

  return async (postId: number, move: Move) => {
    const post = await postRepository.getById(postId);

    if (!post) {
      throw new Error(`Post ${postId} not found`);
    }

    const value = createRoll(10)();

    const priceDie = {
      type: DiceType.PRICE,
      value,
    };

    if (value >= 51 && value < 60) {
      await characterRepository.removeMomentum(post.character.id, post.scenarioId, 1);
    } else if (value >= 60 && value < 69) {
      await characterRepository.removeHealth(post.character.id, post.scenarioId, 1);
    } else if (value >= 69 && value < 78) {
      await characterRepository.removeSpirit(post.character.id, post.scenarioId, 1);
    } else if (value >= 78 && value < 87) {
      await scenarioRepository.removeSupplies(post.scenarioId, 1);
    }

    const newMove = {
      postId,
      moveId,
      meta: move.meta,
      moveResult: MoveResult.SUCCESS,
      characterId: post.character.id,
      scenarioId: post.scenarioId,
      dices: [priceDie],
      isResolved: true,
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
