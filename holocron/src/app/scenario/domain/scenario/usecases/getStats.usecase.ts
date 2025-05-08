import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';

function getStatsUsecase(scenarioRepository: ScenarioRepository) {
  return async function () {
    const stats = await scenarioRepository.getStats();
    return stats;
  };
}

export { getStatsUsecase };
