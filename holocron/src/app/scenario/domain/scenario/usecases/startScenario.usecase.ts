import createHttpError from 'http-errors';

import { DiscordService } from '../../../../../services/DiscordService';
import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';
import { ScenarioStatus } from '../entities/scenario';

function startScenarioUsecase(scenarioRepository: ScenarioRepository, discord: DiscordService) {
  return async function ({ scenarioId, userId }: { scenarioId: number; userId: number }) {
    const scenario = await scenarioRepository.getById(scenarioId);
    if (!scenario) {
      throw createHttpError.NotFound(`Scenario ${scenarioId} not found`);
    }

    if (scenario.status !== ScenarioStatus.INITIATED) {
      throw createHttpError.Conflict(`Scenario ${scenarioId} has already started`);
    }

    const author = scenario.characters[0];
    if (!author || userId !== author.userId) {
      throw createHttpError.Forbidden(`Only the author can start scenario ${scenarioId}`);
    }

    const startedScenario = await scenarioRepository.update(scenarioId, {
      status: ScenarioStatus.IN_PROGRESS,
    });

    Promise.resolve(
      discord.startedScenario({ scenario: scenario, characters: scenario.characters }),
    ).catch((err) => console.error(`Discord notification failed: ${err}`));

    return startedScenario;
  };
}

export { startScenarioUsecase };
