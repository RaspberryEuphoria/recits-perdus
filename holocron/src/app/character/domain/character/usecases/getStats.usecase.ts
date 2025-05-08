import { CharacterRepository } from '../../../infrastructure/character-sql.repository';

function getStatsUsecase(characterRepository: CharacterRepository) {
  return async function () {
    const stats = await characterRepository.getStats();
    return stats;
  };
}

export { getStatsUsecase };
