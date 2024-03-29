type CreateCharacterDTO = {
  story: string;
  title: string;
  isTitleSuffix: boolean;
  origin: string;
  userId: number;
  age: number;
  avatar: string;
  firstName: string;
  lastName: string;
  skills: number[];
};

type UpdateCharacterDto = Omit<CreateCharacterDTO, 'skills'> & { id: number; userId: number };

export { CreateCharacterDTO, UpdateCharacterDto };
