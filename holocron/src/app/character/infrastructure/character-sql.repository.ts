import { PrismaClient } from '@prisma/client';

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

  async getStats() {
    const count = await this.db.character.count();
    return { count };
  }

  async getAll() {
    return this.db.character.findMany();
  }
}
