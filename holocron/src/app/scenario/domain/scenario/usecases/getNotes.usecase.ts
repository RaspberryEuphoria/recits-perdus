import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';

function getNotesUsecase(scenarioRepository: ScenarioRepository) {
  return async function (scenarioId: number) {
    const notes = await scenarioRepository.getNotes(scenarioId);
    return notes;
  };
}
export { getNotesUsecase };
