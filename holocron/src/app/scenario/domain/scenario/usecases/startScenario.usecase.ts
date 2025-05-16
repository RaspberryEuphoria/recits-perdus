import { DiscordService } from '../../../../../services/DiscordService';
import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';
import { ScenarioStatus } from '../entities/scenario';

function startScenarioUsecase(scenarioRepository: ScenarioRepository, discord: DiscordService) {
  return async function ({ scenarioId, userId }: { scenarioId: number; userId: number }) {
    const scenario = await scenarioRepository.getById(scenarioId);
    if (!scenario) {
      throw new Error(`Unable to start scenario ${scenarioId}: scenario was not found`);
    }

    const author = scenario.characters[0];
    if (userId !== author.userId) {
      throw new Error(
        `Unable to start scenario ${scenarioId}: logged user (${userId}) is not the author (${author.userId})`,
      );
    }

    const startedScenario = await scenarioRepository.update(scenarioId, {
      status: ScenarioStatus.IN_PROGRESS,
    });

    try {
      discord.startedScenario({
        scenario: scenario,
        characters: scenario.characters,
      });
    } catch (err) {
      /* empty */
    }

    return startedScenario;
  };
}

export { startScenarioUsecase };
