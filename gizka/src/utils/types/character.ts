import { Skill } from './scenario';

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
};

export type CharacterSkill = {
  id: string;
  skillId: number;
  level: number;
  name: Skill;
};
