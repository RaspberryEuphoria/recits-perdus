import { PrismaClient } from '@prisma/client';

import { MAX_MOMENTUM, MIN_MOMENTUM } from '../../../rules';
import { CreateCharacterDTO } from '../domain/character/entities/character';

export class CharacterRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async update(id: number, character: Partial<CreateCharacterDTO>) {
    return this.db.character.update({
      where: {
        id,
      },
      data: character,
    });
  }

  async addHealth(characterId: number, scenarioId: number, health: number) {
    return this.changeHealth(characterId, scenarioId, health);
  }

  async removeHealth(characterId: number, scenarioId: number, health: number) {
    return this.changeHealth(characterId, scenarioId, -health);
  }

  async changeHealth(characterId: number, scenarioId: number, health: number) {
    const characterOnScenario = await this.db.charactersOnScenarios.findFirst({
      where: {
        characterId,
        scenarioId,
      },
    });

    if (!characterOnScenario) {
      throw new Error(`Character ${characterId} not found on scenario ${scenarioId}`);
    }

    if (characterOnScenario.health === 0) {
      console.log(`Character ${characterId} already has 0 health`);
      return characterOnScenario;
    }

    return this.db.charactersOnScenarios.update({
      where: { id: characterOnScenario.id },
      data: {
        health: {
          increment: health,
        },
      },
    });
  }

  async addSpirit(characterId: number, scenarioId: number, spirit: number) {
    return this.changeSpirit(characterId, scenarioId, spirit);
  }

  async removeSpirit(characterId: number, scenarioId: number, spirit: number) {
    return this.changeSpirit(characterId, scenarioId, -spirit);
  }

  async changeSpirit(characterId: number, scenarioId: number, spirit: number) {
    const characterOnScenario = await this.db.charactersOnScenarios.findFirst({
      where: {
        characterId,
        scenarioId,
      },
    });

    if (!characterOnScenario) {
      throw new Error(`Character ${characterId} not found on scenario ${scenarioId}`);
    }

    if (characterOnScenario.spirit === 0) {
      console.log(`Character ${characterId} already has 0 spirit`);
      return characterOnScenario;
    }

    return this.db.charactersOnScenarios.update({
      where: { id: characterOnScenario.id },
      data: {
        spirit: {
          increment: spirit,
        },
      },
    });
  }

  async addMomentum(characterId: number, scenarioId: number, momentum: number) {
    return this.changeMomentum(characterId, scenarioId, momentum);
  }

  async removeMomentum(characterId: number, scenarioId: number, momentum: number) {
    return this.changeMomentum(characterId, scenarioId, -momentum);
  }

  async changeMomentum(characterId: number, scenarioId: number, momentum: number) {
    const characterOnScenario = await this.db.charactersOnScenarios.findFirst({
      where: {
        characterId,
        scenarioId,
      },
    });

    if (!characterOnScenario) {
      throw new Error(`Character ${characterId} not found on scenario ${scenarioId}`);
    }

    let newMomentum = characterOnScenario.momentum + momentum;

    if (newMomentum > MAX_MOMENTUM) {
      newMomentum = MAX_MOMENTUM;
    } else if (newMomentum < MIN_MOMENTUM) {
      newMomentum = MIN_MOMENTUM;
    }

    return this.db.charactersOnScenarios.update({
      where: { id: characterOnScenario.id },
      data: {
        momentum: newMomentum,
      },
    });
  }
}
