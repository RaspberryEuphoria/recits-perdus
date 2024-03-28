import express from 'express';

import { UserContainer } from '../user.container';

const router = express.Router();

function userRoutes(userContainer: UserContainer) {
  router.post(`/register`, async (req, res, next) => {
    try {
      const user = await userContainer.register(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

  router.post(`/login`, async (req, res, next) => {
    try {
      const user = await userContainer.login(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id/characters', async (req, res, next) => {
    try {
      const characters = await userContainer.getCharacters(parseInt(req.params.id));
      res.json(characters);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id/characters/:characterId', async (req, res, next) => {
    try {
      const characters = await userContainer.getCharacter(
        parseInt(req.params.id),
        parseInt(req.params.characterId),
      );
      res.json(characters);
    } catch (error) {
      next(error);
    }
  });

  router.post('/:id/characters', async (req, res, next) => {
    try {
      const character = await userContainer.createCharacter({
        ...req.body,
        userId: parseInt(req.params.id),
        age: parseInt(req.body.age),
      });
      res.json(character);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export { userRoutes };
