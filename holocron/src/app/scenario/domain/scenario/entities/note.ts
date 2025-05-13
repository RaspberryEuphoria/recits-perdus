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

type Crop = {
  x: number;
  y: number;
  width: number;
  height: number;
};
type UpdateNoteIllustrationDto = { id: number; base64Image: string; crop: Crop };

export type { CreateNoteDto, Note, UpdateNoteDto, UpdateNoteIllustrationDto };
