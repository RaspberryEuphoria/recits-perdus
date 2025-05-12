import { Character, Note as PrismaNote, Scenario } from '@prisma/client';

type Note = {
  id: number;
  authorId: Character['id'];
  scenarioId: Scenario['id'];
  title: string;
  subtitle?: string;
  description?: string;
  category: PrismaNote['category'];
  illustration?: string;
};

type CreateNoteDto = Omit<Note, 'id'>;
type UpdateNoteDto = Omit<Note, 'authorId' | 'scenarioId'>;

export type { CreateNoteDto, Note, UpdateNoteDto };
