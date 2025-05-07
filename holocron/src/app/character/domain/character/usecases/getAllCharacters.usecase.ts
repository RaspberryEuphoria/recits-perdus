import { CharacterRepository } from '../../../infrastructure/character-sql.repository';

function getAllCharacters(characterRepository: CharacterRepository) {
  return async function () {
    const characters = await characterRepository.getAll();
    return characters;
  };
}

export { getAllCharacters };
