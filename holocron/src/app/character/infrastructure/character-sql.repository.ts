import { NoteCategory, PrismaClient } from '@prisma/client';

type ScenarioNotesResponse = {
  id: number;
  title: string;
  notes: {
    id: number;
    category: NoteCategory;
    title: string;
  }[];
};

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

  async getAllNotes(characterId: number) {
    const notes = await this.db.note.findMany({
      where: {
        authorId: characterId,
      },
      select: {
        id: true,
        category: true,
        title: true,
        scenario: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [{ scenarioId: 'asc' }, { updatedAt: 'desc' }],
    });

    const scenariosById = new Map<number, ScenarioNotesResponse>();

    notes.forEach((note) => {
      const scenarioId = note.scenario.id;
      const scenarioTitle = note.scenario.title;

      if (!scenariosById.has(scenarioId)) {
        scenariosById.set(scenarioId, {
          id: scenarioId,
          title: scenarioTitle,
          notes: [],
        });
      }

      scenariosById.get(scenarioId)?.notes.push({
        id: note.id,
        category: note.category,
        title: note.title,
      });
    });

    return Array.from(scenariosById.values());
  }
}
