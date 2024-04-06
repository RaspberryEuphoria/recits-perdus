import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';

function addCharacterUsecase(scenarioRepository: ScenarioRepository) {
  return async function (scenarioId: number, character: { id: number; textColor: string }) {
    const scenario = await scenarioRepository.addCharacter({
      id: scenarioId,
      characterId: character.id,
      textColor: character.textColor,
    });

    return scenario;
  };
}
export { addCharacterUsecase };
