import { CharacterRepository } from '../../../../infrastructure/character-sql.repository';
import { PostRepository } from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import { createRoll } from '../../../../scenario.utils';
import { Dice, DiceType, Move, MoveResult, Moves, Stat } from '../../entities/post';
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

export function faireFaceAuDanger(
  postRepository: PostRepository,
  scenarioRepository: ScenarioRepository,
  skillRepository: SkillRepository,
  characterRepository: CharacterRepository,
) {
  const moveId = Moves.FAIRE_FACE_AU_DANGER;

  async function onSuccess({
    characterId,
    scenarioId,
    postId,
    skillId,
    dices,
    skillValue,
    moveResult,
    meta,
  }: MoveProps) {
    await characterRepository.addMomentum(characterId, scenarioId, 1);

    return postRepository.addMove({
      moveResult,
      moveId,
      postId,
      skillId,
      skillValue,
      dices,
      meta,
      isResolved: true,
    });
  }

  async function onMixed(
    { characterId, scenarioId, postId, skillId, dices, skillValue, moveResult, meta }: MoveProps,
    danger: Stat,
  ) {
    switch (danger) {
      case Stat.MOMENTUM:
        await characterRepository.removeMomentum(characterId, scenarioId, 1);
        break;
      case Stat.HEALTH:
        await characterRepository.removeHealth(characterId, scenarioId, 1);
        break;
      case Stat.SPIRIT:
        await characterRepository.removeSpirit(characterId, scenarioId, 1);
        break;
      case Stat.SUPPLIES:
        await scenarioRepository.removeSupplies(scenarioId, 1);
        break;
    }

    return postRepository.addMove({
      moveResult,
      moveId,
      postId,
      skillId,
      skillValue,
      dices,
      meta,
      isResolved: false,
    });
  }

  async function onFailure({ postId, skillId, dices, skillValue, moveResult, meta }: MoveProps) {
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

    await useMove(
      postRepository,
      scenarioRepository,
      skillRepository,
      characterRepository,
    )({ id: Moves.PAYER_LE_PRIX, meta: { origin: 'previous_move' } }, postId);
  }

  return async (postId: number, move: Move) => {
    if (!move.meta) {
      throw new Error(`Move ${move.id} meta not found`);
    }

    const post = await postRepository.getById(postId);

    if (!post) {
      throw new Error(`Post ${postId} not found`);
    }

    const { attribute, danger } = move.meta;

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

    const dices = [
      {
        type: DiceType.ACTION,
        value: actionDie,
      },
      {
        type: DiceType.CHALLENGE,
        value: challengeDices[0],
      },
      {
        type: DiceType.CHALLENGE,
        value: challengeDices[1],
      },
    ];

    const moveResult = getDicesResult(score, challengeDices);

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

    if (moveResult === MoveResult.SUCCESS) {
      return onSuccess(newMove);
    } else if (moveResult === MoveResult.MIXED) {
      return onMixed(newMove, danger);
    } else if (moveResult === MoveResult.FAILURE) {
      return onFailure(newMove);
    }
  };
}

function getDicesResult(score: number, challengeDices: number[]) {
  if (challengeDices.every((dice) => dice >= score)) {
    return MoveResult.FAILURE;
  }

  if (challengeDices.some((dice) => dice >= score)) {
    return MoveResult.MIXED;
  }

  if (challengeDices.every((dice) => dice < score)) {
    return MoveResult.SUCCESS;
  }

  throw new Error(`Invalid dices result! ${JSON.stringify({ score, challengeDices }, null, 4)}`);
}
