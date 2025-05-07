import express, { Request } from 'express';

import { CharacterContainer } from '../character.container';

const router = express.Router();

function characterRoutes(characterContainer: CharacterContainer) {
  router.get(`/`, async (_req: Request<unknown, unknown, unknown>, _res, next) => {
    try {
      const characters = await characterContainer.getAllCharacters();
      _res.json(characters);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export { characterRoutes };
