type Post = {
  id: number;
  content: string;
  // scenario: Scenario;
  scenarioId: number;
  // character: Character;
  characterId: number;
  isGameMaster: boolean;
  turn: number;

  dices?: Array<Dice>;
  // skill?: Skill;
};

type Dice = {
  id?: number;
  value: number;
  type: DiceType;
  isBurned: boolean;
};

export enum DiceType {
  CHALLENGE = 'CHALLENGE',
  ACTION = 'ACTION',
  PRICE = 'PRICE',
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
  action?: {
    move: Move;
  };
  dices?: Array<Dice>;
};

export enum Moves {
  FAIRE_FACE_AU_DANGER = 'FAIRE_FACE_AU_DANGER',
  PRENDRE_UN_AVANTAGE = 'PRENDRE_UN_AVANTAGE',
  RECOLTER_DES_INFORMATIONS = 'RECOLTER_DES_INFORMATIONS',
  PAYER_LE_PRIX = 'PAYER_LE_PRIX',
}

type Move = {
  id: Moves;
  meta: MoveMeta;
};

type MoveMeta = {
  danger?: Stat;
  attribute: string;
  hasMomentumBurn: boolean;
};

enum Stat {
  MOMENTUM = 'Élan',
  HEALTH = 'Santé',
  SPIRIT = 'Esprit',
  SUPPLIES = 'Provisions',
}

enum MoveResult {
  SUCCESS = 'SUCCESS',
  MIXED = 'MIXED',
  FAILURE = 'FAILURE',
}

export { CreatePostDto, Dice, Move, MoveMeta, MoveResult, Post, Stat };
