import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';
import { ImportNotesDto } from '../entities/note';

function importNotesUsecase(scenarioRepository: ScenarioRepository) {
  return async function (importNotesDto: ImportNotesDto) {
    const notes = await scenarioRepository.importNotes(importNotesDto);
    return notes;
  };
}

export { importNotesUsecase };
