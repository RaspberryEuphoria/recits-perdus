import { Scenario, Skill } from './scenario';

export type Character = {
  id: number;
  firstName: Skill;
  lastName: string;
  birthdate: Date;
  story: string;
  userId: number;
  textColor: string;
  avatar: string;
  skills: CharacterSkill[];
  health: number;
  spirit: number;
  momentum: number;
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
  name: Skill;
  skill: {
    description: string;
  };
};
