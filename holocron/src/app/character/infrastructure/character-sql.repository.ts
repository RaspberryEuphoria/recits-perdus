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

  async getAll() {
    return this.db.character.findMany();
  }
}
