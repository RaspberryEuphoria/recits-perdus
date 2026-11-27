import createHttpError from 'http-errors';

import { UserRepository } from '../../../infrastructure/user-sql.repository';

function getCharacterUsecase(userRepository: UserRepository) {
  return async function (userId: number, characterId: number) {
    const character = await userRepository.getCharacter(characterId);

    if (character.userId !== userId) {
      throw createHttpError.Forbidden(`Character ${characterId} does not belong to ${userId}`);
    }

    return character;
  };
}

export { getCharacterUsecase };
