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

  /** Imported notes share the original's illustration file */
  async countNotesUsingIllustration(illustration: string) {
    return this.db.note.count({ where: { illustration } });
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
