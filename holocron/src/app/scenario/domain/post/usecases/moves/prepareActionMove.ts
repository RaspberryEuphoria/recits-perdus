import { CharacterRepository } from '../../../../infrastructure/character-sql.repository';
import { PostWithCharacterSkills } from '../../../../infrastructure/post-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import { createRoll, getDicesResult, resolveChallengeDices } from '../../../../scenario.utils';
import { Dice, DiceType, Move, MoveMeta, MoveResult } from '../../entities/post';

export type ActionMoveProps = {
  characterId: number;
  scenarioId: number;
  postId: number;
  skillId: number;
  skillValue: number;
  moveResult: MoveResult;
  dices: Dice[];
  meta: MoveMeta;
};

export function prepareActionMove(
  characterRepository: CharacterRepository,
  skillRepository: SkillRepository,
) {
  return async (move: Move, post: PostWithCharacterSkills): Promise<ActionMoveProps> => {
    if (!move.meta) {
      throw new Error(`Move ${move.id} meta not found`);
    }

    const { attribute, hasMomentumBurn } = move.meta;

    const characterOnScenario = await characterRepository.getOnScenario(
      post.characterId,
      post.scenarioId,
    );
    if (!characterOnScenario) {
      throw new Error(
        `Character ${post.characterId} not found on scenario ${post.scenarioId} while attempting to use move ${move.id}`,
      );
    }

    const skill = await skillRepository.getByName(attribute);
    if (!skill) {
      throw new Error(
        `Skill ${attribute} not found for character ${post.characterId} while attempting to use move ${move.id}`,
      );
    }

    const characterSkill = post.character.skills.find(
      (characterSkill) => characterSkill.skillId === skill.id,
    );
    const skillValue = characterSkill?.level || 0;

    const rollD6 = createRoll(6);
    const rollD8 = createRoll(8);

    const actionRoll = rollD6();
    const challengeRolls = [rollD8(), rollD8()];
    const score = actionRoll + skillValue;

    const challengeDices = resolveChallengeDices(
      score,
      challengeRolls,
      characterOnScenario.momentum,
      hasMomentumBurn,
    );

    const moveResult = getDicesResult({
      score,
      challengeDices,
    });

    const dices = [
      {
        type: DiceType.ACTION,
        value: actionRoll,
        isBurned: false,
      },
      ...challengeDices,
    ];

    if (dices.some((dice) => dice.isBurned)) {
      await characterRepository.resetMomentum(post.characterId, post.scenarioId);
    }

    const newMove = {
      dices,
      moveResult,
      skillValue,
      characterId: characterOnScenario.characterId,
      meta: move.meta,
      postId: post.id,
      scenarioId: post.scenarioId,
      skillId: skill.id,
    };

    return newMove;
  };
}
