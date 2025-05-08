import express, { Request } from 'express';

import { CharacterContainer } from '../character.container';

const router = express.Router();

function characterRoutes(characterContainer: CharacterContainer) {
  router.get('/stats', async (req, res, next) => {
    try {
      const stats = await characterContainer.getStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  });

  router.get(`/`, async (_req: Request<unknown, unknown, unknown>, _res, next) => {
    try {
      const characters = await characterContainer.getAllCharacters();
      _res.json(characters);
    } catch (error) {
      next(error);
    }
  });

  // router.get(`/:id`, async (_req, _res, next) => {
  //   try {
  //     const character = await characterContainer.getCharacterById(parseInt(_req.params.id));
  //     _res.json(character);
  //   } catch (error) {
  //     next(error);
  //   }
  // });

  return router;
}

export { characterRoutes };
