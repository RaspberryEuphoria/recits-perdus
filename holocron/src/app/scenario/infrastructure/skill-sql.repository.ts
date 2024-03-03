import { PrismaClient } from '@prisma/client';

export class SkillRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getByName(name: string) {
    const skill = await this.db.skill.findFirst({
      where: {
        name,
      },
    });

    if (!skill) {
      return null;
    }

    return skill;
  }
}
