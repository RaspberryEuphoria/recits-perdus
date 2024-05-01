export enum MoveId {
  FAIRE_FACE_AU_DANGER = 'FAIRE_FACE_AU_DANGER',
  PRENDRE_UN_AVANTAGE = 'PRENDRE_UN_AVANTAGE',
  RECOLTER_DES_INFORMATIONS = 'RECOLTER_DES_INFORMATIONS',
  PRODIGUER_DES_SOINS = 'PRODIGUER_DES_SOINS',
  RAVITAILLER = 'RAVITAILLER',
  MARCHANDER = 'MARCHANDER',
  CONTRAINDRE = 'CONTRAINDRE',
  ENGAGER_LE_COMBAT = 'ENGAGER_LE_COMBAT',
  ATTAQUER = 'ATTAQUER',
  RIPOSTER = 'RIPOSTER',
  METTRE_FIN_AU_COMBAT = 'METTRE_FIN_AU_COMBAT',
  ACTION_LIBRE = 'ACTION_LIBRE',
  PAYER_LE_PRIX = 'PAYER_LE_PRIX',
}

export type MoveIntent = {
  id: MoveId;
  meta: MoveMeta;
};

export enum DangerOnStat {
  MOMENTUM = 'MOMENTUM',
  HEALTH = 'HEALTH',
  SPIRIT = 'SPIRIT',
  SUPPLIES = 'SUPPLIES',
}

export enum DangerOnStory {
  NEW_DANGER = 'NEW_DANGER',
  DAMAGE = 'DAMAGE',
  GOAL_IS_LOST = 'GOAL_IS_LOST',
  VENDETTA = 'VENDETTA',
}

export type Danger = DangerOnStat;

export type MoveMeta = {
  danger?: Danger | number;
  skillId?: number;
  hasMomentumBurn?: boolean;
  targetId?: number;
  progress?: number;
  actionBonus?: MoveBonus[];
};

export type MoveBonus = {
  label: string;
  value: number;
};

export enum MoveResult {
  SUCCESS = 'SUCCESS',
  MIXED = 'MIXED',
  FAILURE = 'FAILURE',
}
