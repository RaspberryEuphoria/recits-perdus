import { Scenario } from '../../scenario/entities/scenario';

type Post = {
  id: number;
  content: string;
  // scenario: Scenario;
  scenarioId: number;
  // character: Character;
  characterId: number;
  isGameMaster: boolean;
  turn: number;

  moveId: string | null;
  dices?: Array<Dice>;
  // skill?: Skill;
};

type Dice = {
  id?: number;
  value: number;
  type: DiceType;
};

export enum DiceType {
  CHALLENGE = 'CHALLENGE',
  ACTION = 'ACTION',
}

type CreatePostDto = {
  content: string;
  scenarioId: number;
  characterId: number;
  isGameMaster: boolean;
  turn: number;
  skillValue?: number;
  skillId?: number;
  moveId?: Moves;
  move?: Move;
  dices?: Array<Dice>;
};

export enum Moves {
  FAIRE_FACE_AU_DANGER = 'FAIRE_FACE_AU_DANGER',
}

type Move = {
  id: string;
  meta: Record<string, string>;
};

export { CreatePostDto, Move, Post };
