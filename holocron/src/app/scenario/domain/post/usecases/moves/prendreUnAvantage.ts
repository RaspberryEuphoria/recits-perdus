import { STATS_LIMITS } from '../../../../../../rules';
import { CharacterRepository } from '../../../../infrastructure/character-sql.repository';
import { PostRepository } from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import { createRoll, getDicesResult } from '../../../../scenario.utils';
import { Dice, DiceType, Move, MoveResult, Moves, Post, Stat } from '../../entities/post';
import { useMove } from '.';

type MoveProps = {
  characterId: number;
  scenarioId: number;
  postId: number;
  skillId: number;
  skillValue: number;
  moveResult: MoveResult;
  dices: Dice[];
  meta: Record<string, string | number>;
};

export function prendreUnAvantage(
  postRepository: PostRepository,
  scenarioRepository: ScenarioRepository,
  skillRepository: SkillRepository,
  characterRepository: CharacterRepository,
) {
  const moveId = Moves.PRENDRE_UN_AVANTAGE;

  async function onSuccessOrMixed(props: MoveProps, momentum: number) {
    await characterRepository.addMomentum(props.characterId, props.scenarioId, momentum);

    return postRepository.addMove({
      ...props,
      moveId,
      isResolved: true,
    });
  }

  async function onFailure({ postId, moveResult, skillId, skillValue, dices, meta }: MoveProps) {
    await postRepository.addMove({
      moveResult,
      moveId,
      postId,
      skillId,
      skillValue,
      dices,
      meta,
      isResolved: true,
    });

    const payThePriceMove = { id: Moves.PAYER_LE_PRIX, meta: { origin: 'previous_move' } };

    return await useMove(
      postRepository,
      scenarioRepository,
      skillRepository,
      characterRepository,
    )(payThePriceMove, postId);
  }

  return async (postId: number, move: Move): Promise<Post> => {
    if (!move.meta) {
      throw new Error(`Move ${move.id} meta not found`);
    }

    const { attribute, hasMomentumBurn } = move.meta;

    const post = await postRepository.getById(postId);
    if (!post) {
      throw new Error(`Post ${postId} not found`);
    }

    const characterOnScenario = await characterRepository.getOnScenario(
      post.characterId,
      post.scenarioId,
    );
    if (!characterOnScenario) {
      throw new Error(`Character ${post.characterId} not found on scenario ${post.scenarioId}`);
    }

    const skill = await skillRepository.getByName(attribute);
    if (!skill) {
      throw new Error(`Skill ${attribute} not found`);
    }

    const characterSkill = post.character.skills.find(
      (characterSkill) => characterSkill.skillId === skill.id,
    );
    if (!characterSkill) {
      throw new Error(`Character ${post.characterId} does not have skill ${skill.id}`);
    }

    const rollD6 = createRoll(6);
    const rollD10 = createRoll(10);

    const actionDie = rollD6();
    const challengeDices = [rollD10(), rollD10()];
    const score = actionDie + characterSkill.level;

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
        isBurned: hasMomentumBurn && challengeDices[0] < characterOnScenario.momentum,
      },
      {
        type: DiceType.CHALLENGE,
        value: challengeDices[1],
        isBurned: hasMomentumBurn && challengeDices[1] < characterOnScenario.momentum,
      },
    ];

    const newMove = {
      moveResult,
      postId,
      dices,
      meta: move.meta,
      characterId: post.character.id,
      scenarioId: post.scenarioId,
      skillId: skill.id,
      skillValue: characterSkill.level,
    };

    if ([MoveResult.SUCCESS, MoveResult.MIXED].includes(moveResult)) {
      const momentumGain = moveResult === MoveResult.SUCCESS ? 2 : 1;
      return onSuccessOrMixed(newMove, momentumGain);
    }

    if (moveResult === MoveResult.FAILURE) {
      return onFailure(newMove);
    }

    throw new Error(`Invalid move result: ${moveResult}`);
  };
}
