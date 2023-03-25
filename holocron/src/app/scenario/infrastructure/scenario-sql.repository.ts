import { PrismaClient } from '@prisma/client';

import { CreateScenarioDto, ScenarioStatus } from '../domain/scenario/entities/scenario';

export class ScenarioRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllScenariosByStatus(status: ScenarioStatus) {
    return this.db.scenario.findMany({
      where: {
        status,
      },
      include: {
        posts: true,
      },
    });
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
}
