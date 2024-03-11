import express from 'express';

import { UserContainer } from '../user.container';

const router = express.Router();

function userRoutes(userContainer: UserContainer) {
  router.post(`/register`, async (_req, _res, next) => {
    try {
      const user = await userContainer.register(_req.body);
      _res.json(user);
    } catch (error) {
      next(error);
    }
  });

  router.post(`/login`, async (_req, _res, next) => {
    try {
      const user = await userContainer.login(_req.body);
      _res.json(user);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id/characters', async (_req, _res, next) => {
    try {
      const characters = await userContainer.getCharacters(parseInt(_req.params.id));
      _res.json(characters);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export { userRoutes };
