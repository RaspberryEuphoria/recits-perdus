import { Scenario } from './scenario';

export type Character = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  origin: string;
  story: string;
  userId: number;
  textColor: string;
  avatar: string;
  skills: CharacterSkill[];
  health: number;
  spirit: number;
  momentum: number;
  scenario?: Array<CharacterScenario>;
  characterScenario?: CharacterScenario;
};

export type CharacterInActiveScenario = Character & {
  characterScenario: CharacterScenario;
};

export type CharacterScenario = {
  scenario: Scenario;
  health: number;
  spirit: number;
  momentum: number;
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
