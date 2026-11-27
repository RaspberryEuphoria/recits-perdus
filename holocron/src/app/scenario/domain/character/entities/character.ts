type CreateCharacterDTO = {
  story: string;
  title: string;
  isTitleSuffix: boolean;
  origin: string;
  userId: number;
  age: number;
  avatar?: string;
  firstName: string;
  lastName: string;
  skills: number[];
};

/** Identity fields only: the avatar has its own endpoint, skills/stats are not editable. */
type UpdateCharacterDto = Partial<Omit<CreateCharacterDTO, 'skills' | 'userId' | 'avatar'>> & {
  id: number;
  userId: number;
};

type Crop = {
  x: number;
  y: number;
  width: number;
  height: number;
};
type UpdateCharacterAvatarDto = { id: number; userId: number; base64Avatar: string; crop: Crop };

export { CreateCharacterDTO, UpdateCharacterAvatarDto, UpdateCharacterDto };
