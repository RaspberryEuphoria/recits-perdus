export type Character = {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: Date;
  story: string;
  userId: number;
  textColor: string;
  avatar: string;
  skills: CharacterSkill[];
};

export type CharacterSkill = {
  id: string;
  skillId: number;
  level: number;
  name: string;
};
