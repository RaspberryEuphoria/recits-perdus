import { UserRepository } from '../../../infrastructure/user-sql.repository';

function getCharactersUsecase(userRepository: UserRepository) {
  return async function (userId: number) {
    const characters = await userRepository.getCharacters(userId);
    return characters;
  };
}

export { getCharactersUsecase };
