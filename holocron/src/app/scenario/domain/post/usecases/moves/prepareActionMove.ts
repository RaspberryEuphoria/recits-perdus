import { CharacterRepository } from '../../../../infrastructure/character-sql.repository';
import { PostWithCharacterSkills } from '../../../../infrastructure/post-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import { createRoll, getDicesResult } from '../../../../scenario.utils';
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
    const rollD10 = createRoll(10);

    const actionDie = rollD6();
    const challengeDices = [rollD10(), rollD10()];
    const score = actionDie + skillValue;

    const moveResult = getDicesResult({
      score,
      challengeDices,
      momentum: characterOnScenario.momentum,
      hasMomentumBurn,
    });

    const nativeMoveResult = getDicesResult({
      score,
      challengeDices,
      momentum: characterOnScenario.momentum,
      hasMomentumBurn: false,
    });

    const usedBurn = hasMomentumBurn && moveResult !== nativeMoveResult;

    if (moveResult !== nativeMoveResult) {
      await characterRepository.resetMomentum(post.characterId, post.scenarioId);
    }

    const dices = [
      {
        type: DiceType.ACTION,
        value: actionDie,
        isBurned: false,
      },
      {
        type: DiceType.CHALLENGE,
        value: challengeDices[0],
        isBurned: usedBurn && challengeDices[0] < characterOnScenario.momentum,
      },
      {
        type: DiceType.CHALLENGE,
        value: challengeDices[1],
        isBurned: usedBurn && challengeDices[1] < characterOnScenario.momentum,
      },
    ];

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
