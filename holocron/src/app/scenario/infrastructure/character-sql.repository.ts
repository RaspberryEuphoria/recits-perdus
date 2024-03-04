import { PrismaClient } from '@prisma/client';

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

  async addMomentum(characterId: number, scenarioId: number, momentum: number) {
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
        momentum: {
          increment: momentum,
        },
      },
    });
  }
}
