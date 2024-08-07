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
      const scenario = await scenarioContainer.createScenario({
        ..._req.body,
        characterId: parseInt(_req.body.characterId),
      });

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

  // Start scenario
  router.post(`/:id/start`, async (req, res, next) => {
    try {
      const loggedUser = req.loggedUser;
      if (!loggedUser) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      await scenarioContainer.startScenario({
        scenarioId: parseInt(req.params.id),
        userId: loggedUser.id,
      });

      res.json({ message: 'ok' });
    } catch (error) {
      next(error);
    }
  });

  // Register character in scenario
  router.post(`/:id/character`, async (req, res, next) => {
    try {
      const scenario = await scenarioContainer.addCharacter(parseInt(req.params.id), {
        id: parseInt(req.body.characterId),
        textColor: req.body.textColor,
      });

      res.json(scenario);
    } catch (error) {
      next(error);
    }
  });

  // Post in scenario
  router.post(`/:id/post`, async (req, res, next) => {
    try {
      const scenarioId = parseInt(req.params.id);
      const { illustration, ...body } = req.body;

      const newPost = await scenarioContainer.createPost({ ...body, scenarioId });

      if (!illustration) {
        res.json(newPost);
        return;
      }

      const illustrationFilename = await scenarioContainer.addIllustrationToPost({
        ...illustration,
        id: newPost.id,
      });

      res.json({ ...newPost, illustration: illustrationFilename });
      return;
    } catch (error) {
      next(error);
    }
  });

  // Edit a post in scenario
  router.put(`/:id/post/:postId`, async (_req, _res, next) => {
    try {
      const scenario = await scenarioContainer.updatePost({
        ..._req.body,
        id: parseInt(_req.params.postId),
      });

      _res.json(scenario);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export { scenarioRoutes };
