import { PrismaClient } from '@prisma/client';

import { STATS_LIMITS } from '../../../rules';
import { UpdateCharacterDto } from '../domain/character/entities/character';

export enum CharacterStat {
  MOMENTUM = 'momentum',
  HEALTH = 'health',
  SPIRIT = 'spirit',
}

export class CharacterRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async countCharacterWithUserId(characterId: number, userId: number) {
    return this.db.character.count({
      where: {
        id: characterId,
        userId,
      },
    });
  }

  async getOnScenario(characterId: number, scenarioId: number) {
    return this.db.charactersOnScenarios.findFirst({
      where: {
        characterId,
        scenarioId,
      },
    });
  }

  async update(id: number, character: Partial<UpdateCharacterDto>) {
    return this.db.character.update({
      where: {
        id,
      },
      data: character,
    });
  }

  async addHealth(characterId: number, scenarioId: number, value: number) {
    return this.addStat(characterId, scenarioId, CharacterStat.HEALTH, value);
  }

  async removeHealth(characterId: number, scenarioId: number, value: number) {
    return this.removeStat(characterId, scenarioId, CharacterStat.HEALTH, value);
  }

  async addMomentum(characterId: number, scenarioId: number, value: number) {
    return this.addStat(characterId, scenarioId, CharacterStat.MOMENTUM, value);
  }

  async removeMomentum(characterId: number, scenarioId: number, value: number) {
    return this.removeStat(characterId, scenarioId, CharacterStat.MOMENTUM, value);
  }

  async resetMomentum(characterId: number, scenarioId: number) {
    const characterOnScenario = await this.db.charactersOnScenarios.findFirst({
      where: {
        characterId,
        scenarioId,
      },
    });

    if (!characterOnScenario) {
      throw new Error(`Character ${characterId} not found on scenario ${scenarioId}`);
    }

    return this.db.charactersOnScenarios.update({
      where: { id: characterOnScenario.id },
      data: {
        momentum: STATS_LIMITS.momentum.default,
      },
    });
  }

  async addSpirit(characterId: number, scenarioId: number, value: number) {
    return this.addStat(characterId, scenarioId, CharacterStat.SPIRIT, value);
  }

  async removeSpirit(characterId: number, scenarioId: number, value: number) {
    return this.removeStat(characterId, scenarioId, CharacterStat.SPIRIT, value);
  }

  private async addStat(
    characterId: number,
    scenarioId: number,
    stat: CharacterStat,
    value: number,
  ) {
    return this.changeStat(characterId, scenarioId, stat, value);
  }

  private async removeStat(
    characterId: number,
    scenarioId: number,
    stat: CharacterStat,
    value: number,
  ) {
    return this.changeStat(characterId, scenarioId, stat, -value);
  }

  async changeStat(characterId: number, scenarioId: number, stat: CharacterStat, value: number) {
    const characterOnScenario = await this.db.charactersOnScenarios.findFirst({
      where: {
        characterId,
        scenarioId,
      },
    });

    if (!characterOnScenario) {
      throw new Error(`Character ${characterId} not found on scenario ${scenarioId}`);
    }

    const updatedValue = computeUpdatedValue({
      currentValue: characterOnScenario[stat],
      addedValue: value,
      min: STATS_LIMITS[stat].min,
      max: STATS_LIMITS[stat].max,
    });

    return this.db.charactersOnScenarios.update({
      where: { id: characterOnScenario.id },
      data: {
        [stat]: updatedValue,
      },
    });
  }
}

function computeUpdatedValue({
  currentValue,
  addedValue,
  min,
  max,
}: {
  currentValue: number;
  addedValue: number;
  min: number;
  max: number;
}) {
  const updatedValue = currentValue + addedValue;

  if (updatedValue < min) {
    return min;
  } else if (updatedValue > max) {
    return max;
  }

  return updatedValue;
}
