import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';
import { CreateNoteDto } from '../entities/note';

function createNoteUsecase(scenarioRepository: ScenarioRepository) {
  return async function (noteDto: CreateNoteDto) {
    const newNote = await scenarioRepository.createNote(noteDto);
    return newNote;
  };
}
export { createNoteUsecase };
