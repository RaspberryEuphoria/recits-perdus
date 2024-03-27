import { CharactersOnScenarios, DiceType } from '@prisma/client';

import {
  CharacterRepository,
  CharacterStat,
} from '../../../../infrastructure/character-sql.repository';
import {
  CreateMoveDto,
  PostRepository,
  PostWithCharacterSkills,
} from '../../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../../infrastructure/scenario-sql.repository';
import { SkillRepository } from '../../../../infrastructure/skill-sql.repository';
import {
  computeBonus,
  createRoll,
  getDicesResult,
  resolveChallengeDices,
} from '../../../../scenario.utils';
import { MoveBonus, MoveId, MoveIntent } from '../../entities/move';
import { useMove } from '.';

export abstract class ActionMove {
  mustPayThePrice = false;

  /**
   * Stats change for the character that uses the move
   */
  selfStatsChange = {
    [CharacterStat.MOMENTUM]: 0,
    [CharacterStat.HEALTH]: 0,
    [CharacterStat.SPIRIT]: 0,
  };

  /**
   * Stats change for the character that is the target of the move, if any
   */
  targetStatsChange = {
    id: 0,
    [CharacterStat.MOMENTUM]: 0,
    [CharacterStat.HEALTH]: 0,
    [CharacterStat.SPIRIT]: 0,
  };

  /**
   * Stats change for the group
   */
  groupStatsChange = {
    supplies: 0,
  };

  move?: CreateMoveDto;
  moveId?: MoveId;

  hasRolled = false;
  moveBonus: Array<MoveBonus> = [];

  debugDices: number[] = [];

  constructor(
    private readonly scenarioRepository: ScenarioRepository,
    private readonly postRepository: PostRepository,
    private readonly characterRepository: CharacterRepository,
    private readonly skillRepository: SkillRepository,
    private readonly characterOnScenario: CharactersOnScenarios,
    private readonly moveIntent: MoveIntent,
    private readonly post: PostWithCharacterSkills,
  ) {
    if (post.content.startsWith('debug#') && post.character.userId === 2) {
      const [, values] = post.content.split('#');
      this.debugDices = values.split(',').map(Number);
    }
  }

  async getPreviousPostMove() {
    const previousPostInScenario = await this.postRepository.getPreviousPostInScenario(
      this.post.scenarioId,
      this.post.id,
    );

    return previousPostInScenario?.moves;
  }

  async roll() {
    if (!this.moveIntent.meta) {
      throw new Error(`Move ${this.moveIntent.id} meta not found`);
    }

    if (!this.moveId) {
      throw new Error(`Move ${this.moveIntent.id} id not found`);
    }

    const { meta } = this.moveIntent;
    const { skillId, hasMomentumBurn } = meta;

    if (!skillId) {
      throw new Error(
        `Skill id not provided while attempting to use move ${this.moveId} on post ${this.post.id}`,
      );
    }

    const characterSkill = this.post.character.skills.find(
      (characterSkill) => characterSkill.skillId === skillId,
    );
    const skillValue = characterSkill?.level || 0;

    const rollD6 = createRoll(6);
    const rollD8 = createRoll(8);

    const actionValue = this.debugDices[0] || rollD6();
    const actionRoll = actionValue + computeBonus(this.moveBonus);
    const challengeRolls = [this.debugDices[1] || rollD8(), this.debugDices[2] || rollD8()];
    const score = actionRoll + skillValue;

    const challengeDices = resolveChallengeDices(
      score,
      challengeRolls,
      this.characterOnScenario.momentum,
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

    this.move = {
      dices,
      moveResult,
      skillValue,
      skillId,
      meta,
      postId: this.post.id,
      moveId: this.moveId,
      isResolved: true,
    };

    this.hasRolled = true;

    return this.move;
  }

  async updateCharacterStat(
    characterId: number,
    stats: {
      [CharacterStat.MOMENTUM]: number;
      [CharacterStat.HEALTH]: number;
      [CharacterStat.SPIRIT]: number;
    },
  ) {
    await Promise.all(
      Object.entries(stats).map(async ([stat, value]) => {
        if (value === 0) return;

        await this.characterRepository.changeStat(
          characterId,
          this.characterOnScenario.scenarioId,
          stat as CharacterStat,
          value,
        );
      }),
    );
  }

  async commit(): Promise<PostWithCharacterSkills> {
    if (!this.hasRolled) {
      throw new Error(`Can't commit move ${this.moveId} without rolling it first.`);
    }

    if (!this.move) {
      throw new Error(`Can't commit move ${this.moveId} because it's empty.`);
    }

    await this.updateCharacterStat(this.characterOnScenario.characterId, this.selfStatsChange);

    if (this.targetStatsChange.id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...stats } = this.targetStatsChange;
      await this.updateCharacterStat(this.targetStatsChange.id, stats);
    }

    if (this.groupStatsChange.supplies != 0) {
      await this.scenarioRepository.changeSupplies(
        this.characterOnScenario.scenarioId,
        this.groupStatsChange.supplies,
      );
    }

    if (this.mustPayThePrice) {
      await this.postRepository.addMove(this.move);

      const payThePriceMove = {
        id: MoveId.PAYER_LE_PRIX,
        meta: { origin: 'previous_move', hasMomentumBurn: false },
      };

      return await useMove(
        this.scenarioRepository,
        this.postRepository,
        this.characterRepository,
        this.skillRepository,
      )(payThePriceMove, this.move.postId);
    }

    return await this.postRepository.addMove(this.move);
  }
}
