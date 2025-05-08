import express from 'express';

import { UserContainer } from '../user.container';

const router = express.Router();

function userRoutes(userContainer: UserContainer) {
  router.get('/stats', async (req, res, next) => {
    try {
      const stats = await userContainer.getStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  });

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

  router.put('/:userId/characters/:characterId', async (req, res, next) => {
    try {
      const character = await userContainer.updateCharacter({
        ...req.body,
        userId: parseInt(req.params.userId),
        id: parseInt(req.params.characterId),
        age: parseInt(req.body.age),
      });

      res.json(character);
    } catch (error) {
      next(error);
    }
  });

  router.put('/:userId/characters/:characterId/avatar', async (req, res, next) => {
    try {
      const newAvatar = await userContainer.updateCharacterAvatar({
        ...req.body,
        userId: parseInt(req.params.userId),
        id: parseInt(req.params.characterId),
      });

      res.json({ avatar: newAvatar });
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
