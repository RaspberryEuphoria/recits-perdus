import { TextColor } from '../constants';
import { Scenario } from './scenario';

export type Character = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  origin: string;
  story: string;
  userId: number;
  textColor: TextColor;
  avatar: string;
  skills: CharacterSkill[];
  health: number;
  spirit: number;
  momentum: number;
  scenario?: Array<CharacterScenario>;
  characterScenario?: CharacterScenario;
};

export type CharacterStats = {
  count: number;
};

export type CharacterInActiveScenario = Character & {
  characterScenario: CharacterScenario;
};

export type CharacterScenario = {
  scenario: Scenario;
  health: number;
  spirit: number;
  momentum: number;
  isNextPoster?: boolean;
};

export type CharacterSkill = {
  id: string;
  skillId: number;
  level: number;
  name: string;
  skill: {
    description: string;
  };
};
