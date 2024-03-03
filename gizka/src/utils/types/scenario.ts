import { Character, CharacterSkill } from './character';

enum ScenarioStatus {
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  LOCKED = 'LOCKED',
}

export type Post = {
  id: number;
  content: string;
  scenario: Scenario;
  scenarioId: number;
  character: Character;
  characterId: number;
  dice?: Array<Dice>;
  characterSkill?: CharacterSkill;
  nextPoster?: Character;
  turn: number;
};

type Scenario = {
  id: number;
  title: string;
  safeTitle: string;
  status: ScenarioStatus;
  era: string;
  location: string;
  thumbnail: string;
  introduction: string;

  posts: Post[];
  characters: Character[];
};

export type Dice = {
  id: number;
  value: number;
  type: DiceType;
};

export enum DiceType {
  ACTION = 'ACTION',
  CHALLENGE = 'CHALLENGE',
}

export enum MoveResult {
  SUCCESS = 'SUCCESS',
  MIXED = 'MIXED',
  FAILURE = 'FAILURE',
}

export { type Scenario, ScenarioStatus };
