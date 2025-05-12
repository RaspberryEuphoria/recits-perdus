import { CharacterRepository } from '../../../infrastructure/character-sql.repository';

function checkUserIdUsecase(characterRepository: CharacterRepository) {
  return async function (characterId: number, userId: number) {
    const characterCount = await characterRepository.countCharacterWithUserId(characterId, userId);
    return characterCount > 0;
  };
}
export { checkUserIdUsecase };
