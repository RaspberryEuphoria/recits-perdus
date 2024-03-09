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
  supplies: number;
};

export type Move = {
  id: number;
  moveId: Moves;
  skill: CharacterSkill;
  skillId: number;
  skillValue: number;
  dices: Dice[];
  moveResult: MoveResult;
  meta: string;
};

export enum Moves {
  FAIRE_FACE_AU_DANGER = 'FAIRE_FACE_AU_DANGER',
  PRENDRE_UN_AVANTAGE = 'PRENDRE_UN_AVANTAGE',
  RECOLTER_DES_INFORMATIONS = 'RECOLTER_DES_INFORMATIONS',
  PRODIGUER_DES_SOINS = 'PRODIGUER_DES_SOINS',
  RAVITAILLER = 'RAVITAILLER',
  MONTER_LE_CAMP = 'MONTER_LE_CAMP',
  VOYAGER = 'VOYAGER',
  ATTEINDRE_SA_DESTINATION = 'ATTEINDRE_SA_DESTINATION',
  PERSUADER = 'PERSUADER',
  PAYER_LE_PRIX = 'PAYER_LE_PRIX',
}

export type Dice = {
  id: number;
  value: number;
  type: DiceType;
  isBurned: boolean;
};

export enum DiceType {
  ACTION = 'ACTION',
  CHALLENGE = 'CHALLENGE',
  PRICE = 'PRICE',
}

export enum MoveResult {
  SUCCESS = 'SUCCESS',
  MIXED = 'MIXED',
  FAILURE = 'FAILURE',
}

export enum Skill {
  FINESSE = 'Finesse',
  DETERMINATION = 'Détermination',
  TENACITE = 'Ténacité',
  SUBTERFUGE = 'Subterfuge',
  INTUITION = 'Intuition',
}

export enum Stat {
  MOMENTUM = 'Élan',
  HEALTH = 'Santé',
  SPIRIT = 'Esprit',
  SUPPLIES = 'Provisions',
}

export { type Scenario, ScenarioStatus };
