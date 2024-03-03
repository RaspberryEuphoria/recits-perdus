import { PostRepository } from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import { DiceType, Move, Moves, Post } from '../../entities/post';

export function faireFaceAuDangerUsecase(
  postRepository: PostRepository,
  scenarioRepository: ScenarioRepository,
  skillRepository: SkillRepository,
) {
  const id = Moves.FAIRE_FACE_AU_DANGER;
  console.log('faireFaceAuDangerUsecase');

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

    const updatedPost = await postRepository.update(postId, {
      skillId: skill.id,
      skillValue: characterSkill.level,
      moveId: id,
      dices: [
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
      ],
    });

    return updatedPost;
  };
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
