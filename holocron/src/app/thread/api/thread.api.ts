import express, { Request } from 'express';

import { ThreadStatus } from '../domain/thread/entities/thread';
import { ThreadContainer } from '../thread.container';

const router = express.Router();

function isThreadStatusAllowed(status: ThreadStatus): status is ThreadStatus {
  return status && Object.values(ThreadStatus).includes(status as ThreadStatus);
}

function threadRoutes(threadContainer: ThreadContainer) {
  // Get threads
  router.get(
    `/`,
    async (
      _req: Request<
        unknown,
        unknown,
        unknown,
        {
          status: ThreadStatus;
        }
      >,
      _res,
      next,
    ) => {
      try {
        const status = _req.query.status;
        if (!isThreadStatusAllowed(status)) {
          _res.status(400).json({
            message: 'Invalid status',
          });

          return;
        }

        const threads = await threadContainer.getAllThreads(status);
        _res.json(threads);
      } catch (error) {
        next(error);
      }
    },
  );

  // Create thread
  router.post(`/`, async (_req, _res, next) => {
    try {
      const thread = await threadContainer.createThread(_req.body);
      _res.json(thread);
    } catch (error) {
      next(error);
    }
  });

  // Get thread
  router.get(`/:id`, async (_req, _res, next) => {
    try {
      const thread = await threadContainer.getThreadById(parseInt(_req.params.id));
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
