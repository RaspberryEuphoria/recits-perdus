import { Prisma, PrismaClient } from '@prisma/client';

import { CreateScenarioDto, ScenarioStatus } from '../domain/scenario/entities/scenario';

type FullScenario = Prisma.ScenarioGetPayload<{
  include: {
    characters: {
      include: {
        character: {
          select: {
            name: true;
            story: true;
            birthdate: true;
          };
        };
      };
    };
  };
}>;

export class ScenarioRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllScenariosByStatus(status: ScenarioStatus) {
    const scenarios = await this.db.scenario.findMany({
      where: {
        status,
      },
      include: {
        characters: {
          include: {
            character: {
              select: {
                name: true,
                story: true,
                birthdate: true,
              },
            },
          },
        },
      },
    });

    return scenarios.map(this.mapScenario);
  }

  async getById(id: number) {
    return this.db.scenario.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          include: {
            character: true,
          },
        },
      },
    });
  }

  async create(scenario: CreateScenarioDto) {
    return this.db.scenario.create({
      data: scenario,
    });
  }

  private mapScenario(scenario: FullScenario) {
    return {
      ...scenario,
      // Merge character without relation table "CharactersOnScenarios" fields
      characters: scenario.characters.map(({ character }) => ({
        ...character,
      })),
    };
  }
}