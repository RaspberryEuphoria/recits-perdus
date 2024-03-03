import express, { Request } from 'express';

import { ScenarioStatus } from '../domain/scenario/entities/scenario';
import { ScenarioContainer } from '../scenario.container';

const router = express.Router();

function isScenarioStatusAllowed(status: ScenarioStatus): status is ScenarioStatus {
  return status && Object.values(ScenarioStatus).includes(status as ScenarioStatus);
}

function scenarioRoutes(scenarioContainer: ScenarioContainer) {
  // Get scenarios
  router.get(
    `/`,
    async (
      _req: Request<
        unknown,
        unknown,
        unknown,
        {
          status: ScenarioStatus;
        }
      >,
      _res,
      next,
    ) => {
      try {
        const status = _req.query.status;
        if (!isScenarioStatusAllowed(status)) {
          _res.status(400).json({
            message: 'Invalid status',
          });

          return;
        }

        const scenarios = await scenarioContainer.getAllScenarios(status);
        _res.json(scenarios);
      } catch (error) {
        next(error);
      }
    },
  );

  // Create scenario
  router.post(`/`, async (_req, _res, next) => {
    try {
      const scenario = await scenarioContainer.createScenario(_req.body);
      _res.json(scenario);
    } catch (error) {
      next(error);
    }
  });

  // Get scenario
  router.get(`/:id`, async (_req, _res, next) => {
    try {
      const scenario = await scenarioContainer.getScenarioById(parseInt(_req.params.id));
      _res.json(scenario);
    } catch (error) {
      next(error);
    }
  });

  // Post in scenario
  router.post(`/:id/post`, async (_req, _res, next) => {
    try {
      const scenarioId = parseInt(_req.params.id);
      console.log(JSON.stringify(_req.body, null, 4));
      const scenario = await scenarioContainer.createPost({ ..._req.body, scenarioId });
      _res.json(scenario);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export { scenarioRoutes };
