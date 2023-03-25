import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';
import { ScenarioStatus } from '../entities/scenario';

function getAllScenarios(scenarioRepository: ScenarioRepository) {
  return async function (scenarioStatus: ScenarioStatus) {
    const scenarios = await scenarioRepository.getAllScenariosByStatus(scenarioStatus);
    return scenarios;
  };
}

export { getAllScenarios };
