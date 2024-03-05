import { CharacterRepository } from '../../../../infrastructure/character-sql.repository';
import { PostRepository } from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import { Dice, DiceType, Move, MoveResult, Moves } from '../../entities/post';

export function faireFaceAuDangerUsecase(
  postRepository: PostRepository,
  scenarioRepository: ScenarioRepository,
  skillRepository: SkillRepository,
  characterRepository: CharacterRepository,
) {
  const id = Moves.FAIRE_FACE_AU_DANGER;

  async function onSuccess(characterId: number, scenarioId: number) {
    return characterRepository.addMomentum(characterId, scenarioId, 1);
  }

  return async (postId: number, move: Move) => {
    const post = await postRepository.getById(postId);

    if (!post) {
      throw new Error(`Post ${postId} not found`);
    }

    const { attribute } = move.meta;

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

    const updatedPost = await postRepository.update(postId, {
      skillId: skill.id,
      skillValue: characterSkill.level,
      moveId: id,
      dices,
    });

    const result = getDicesResult(score, dices);

    console.log(result);

    if (result === MoveResult.SUCCESS) {
      await onSuccess(post.character.id, post.scenarioId);
    }

    return updatedPost;
  };
}

function getDicesResult(score: number, challengeDices: Array<Dice>) {
  if (challengeDices.every((dice) => dice.value >= score)) {
    return MoveResult.FAILURE;
  }

  if (challengeDices.some((dice) => dice.value >= score)) {
    return MoveResult.MIXED;
  }

  if (challengeDices.every((dice) => dice.value < score)) {
    return MoveResult.SUCCESS;
  }

  throw new Error(`Invalid dices result! ${JSON.stringify({ score, challengeDices }, null, 4)}`);
}

function rollD10() {
  return getRandom(1, 10);
}

function rollD6() {
  return getRandom(1, 6);
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
