import { DiscordService } from '../../../../../services/DiscordService';
import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';
import { CreateScenarioDto, ScenarioStatus } from '../entities/scenario';

function createScenarioUsecase(scenarioRepository: ScenarioRepository, discord: DiscordService) {
  return async function (scenario: CreateScenarioDto) {
    const newScenario = await scenarioRepository.create({
      ...scenario,
      status: ScenarioStatus.INITIATED,
      safeTitle: createSlugFromString(scenario.title),
    });

    discord.createScenario({
      scenario: newScenario,
      character: newScenario.characters[0].character,
    });

    return newScenario;
  };
}

/**
 * Make the string safe for urls
 * Remove diactrics, replace spaces with dashes, remove non-alphanumeric characters
 * and lower case the string
 */
function createSlugFromString(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
}

export { createScenarioUsecase };
