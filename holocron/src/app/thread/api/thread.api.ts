import express from 'express';

import { ThreadContainer } from '../thread.container';

const router = express.Router();

function threadRoutes(threadContainer: ThreadContainer) {
  // Get thread
  router.get(`/:id`, async (_req, _res, next) => {
    try {
      const thread = await threadContainer.getThreadById(parseInt(_req.params.id));
      _res.json(thread);
    } catch (error) {
      next(error);
    }
  });

  // Create thread
  router.post(`/`, async (_req, _res, next) => {
    try {
      const thread = await threadContainer.createThread(_req.body);
      _res.json(thread);
    } catch (error) {
      next(error);
    }
  });

  // Post in thread
  router.post(`/:id/post`, async (_req, _res, next) => {
    try {
      const threadId = parseInt(_req.params.id);
      const thread = await threadContainer.createPost({ ..._req.body, threadId });
      _res.json(thread);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export { threadRoutes };
