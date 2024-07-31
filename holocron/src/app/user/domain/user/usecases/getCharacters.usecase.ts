import { ScenarioRepository } from '../../../../scenario/infrastructure/scenario-sql.repository';
import { UserRepository } from '../../../infrastructure/user-sql.repository';

function getCharactersUsecase(
  userRepository: UserRepository,
  scenarioRepository: ScenarioRepository,
) {
  return async function (userId: number) {
    const characters = await userRepository.getCharacters(userId);

    const charactersWithIsNextPoster = characters.map(async (character) => {
      if (!character.scenario || !character.scenario.length) {
        return character;
      }

      const nextPosterId = await scenarioRepository.getNextPosterId(
        character.characterScenario.scenarioId,
      );

      return {
        ...character,
        characterScenario: {
          ...character.characterScenario,
          isNextPoster: character.id === nextPosterId,
        },
      };
    });

    return Promise.all(charactersWithIsNextPoster);
  };
}

export { getCharactersUsecase };
