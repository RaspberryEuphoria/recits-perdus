import { Character, CharacterSkill } from './character';

enum ScenarioStatus {
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  LOCKED = 'LOCKED',
}

export type ScenarioStats = {
  count: number;
  postCount: number;
  diceCount: number;
  lastPostId: number;
  lastPostAt: string;
  lastPostCharacter: Pick<Character, 'firstName' | 'lastName' | 'textColor' | 'avatar'>;
  lastPostScenario: Pick<Scenario, 'id' | 'title' | 'safeTitle' | 'status' | 'era' | 'location'>;
};

export type Post = {
  id: number;
  content: string;
  scenario: Scenario;
  scenarioId: number;
  character: Character;
  characterId: number;
  characterSkill?: CharacterSkill;
  nextPoster?: Character;
  moves?: Move[];
  illustration?: string;
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
  MARCHANDER = 'MARCHANDER',
  MONTER_LE_CAMP = 'MONTER_LE_CAMP',
  VOYAGER = 'VOYAGER',
  ATTEINDRE_SA_DESTINATION = 'ATTEINDRE_SA_DESTINATION',
  CONTRAINDRE = 'CONTRAINDRE',
  ENGAGER_LE_COMBAT = 'ENGAGER_LE_COMBAT',
  ATTAQUER = 'ATTAQUER',
  RIPOSTER = 'RIPOSTER',
  METTRE_FIN_AU_COMBAT = 'METTRE_FIN_AU_COMBAT',
  ACTION_LIBRE = 'ACTION_LIBRE',
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

/**
 * These are the id corresponding to the skills in db.
 * They're not supposed to ever change (unless we overaul
 * the whole skill system),
 * but maybe we could pull these from the db directly?
 */
export enum SkillId {
  FINESSE = 1,
  DETERMINATION = 2,
  INTUITION = 3,
  SUBTERFUGE = 4,
  TENACITE = 5,
}

export enum Stat {
  MOMENTUM = 'MOMENTUM',
  HEALTH = 'HEALTH',
  SPIRIT = 'SPIRIT',
  SUPPLIES = 'SUPPLIES',
}

export enum FightOutcome {
  NEW_DANGER = 'NEW_DANGER',
  DAMAGE = 'DAMAGE',
  GOAL_IS_LOST = 'GOAL_IS_LOST',
  VENDETTA = 'VENDETTA',
}

export { type Scenario, ScenarioStatus };
