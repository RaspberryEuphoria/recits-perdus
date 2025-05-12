import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';
import { UpdateNoteDto } from '../entities/note';

function updateNoteUsecase(scenarioRepository: ScenarioRepository) {
  return async function (noteDto: UpdateNoteDto) {
    const updatedNote = await scenarioRepository.updateNote(noteDto);
    return updatedNote;
  };
}
export { updateNoteUsecase };
