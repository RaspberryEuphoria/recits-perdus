type CreateCharacterDTO = {
  story: string;
  userId: number;
  age: number;
  avatar: string;
  firstName: string;
  lastName: string;
  skills: number[];
};

type UpdateCharacterDto = Omit<CreateCharacterDTO, 'skills'>;

export { CreateCharacterDTO, UpdateCharacterDto };
