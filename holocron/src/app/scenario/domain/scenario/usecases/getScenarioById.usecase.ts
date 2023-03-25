import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';

function getScenarioByIdUsecase(scenarioRepository: ScenarioRepository) {
  return async function (scenarioId: number) {
    const scenario = await scenarioRepository.getById(scenarioId);
    return scenario;
  };
}

export { getScenarioByIdUsecase };
