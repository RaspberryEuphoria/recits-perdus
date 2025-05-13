import { PrismaClient } from '@prisma/client';

export class NoteRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getNote(id: number) {
    return await this.db.note.findUnique({
      where: {
        id,
      },
    });
  }

  async updateIllustration({ id, illustration }: { id: number; illustration: string }) {
    return await this.db.note.update({
      where: {
        id,
      },
      data: {
        illustration,
      },
    });
  }
}
