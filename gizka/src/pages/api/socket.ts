import cors from 'cors';
import { Server as HttpServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';

import { NextApiResponseServerIO } from '@/utils/types/socket';

const corsMiddleware = cors();
let count = 0;

const logger = {
  info: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(message);
    }
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }

  if (res.socket.server.io) {
    logger.info('Socket already initialized');
    return res.status(200).json({});
  }

  logger.info('Initializing socket');

  const httpServer: HttpServer = res.socket.server as unknown as HttpServer;
  const io = new ServerIO(httpServer, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: `http://${process.env.NEXT_PUBLIC_BFF_PREFIX_HOSTNAME}`,
      methods: ['GET', 'POST', 'OPTIONS'],
    },
    transports: ['polling'],
  });

  io.on('connection', (socket) => {
    count++;
    logger.info(`Client connected on socket: ${count}`);

    socket.on('disconnect', () => {
      count--;
      logger.info(`Client disconnected on socket: ${count}`);
    });

    socket.on('post-new-dialog', (newDialog) => {
      logger.info('emit receive-new-dialog');
      socket.broadcast.emit('receive-new-dialog', newDialog);
    });

    socket.on('edit-dialog', (updatedDialog) => {
      logger.info('emit receive-edited-dialog');
      socket.broadcast.emit('receive-edited-dialog', updatedDialog);
    });

    socket.on('post-new-move', () => {
      logger.info('emit receive-new-move');
      socket.broadcast.emit('receive-new-move');
    });
  });

  corsMiddleware(req, res, () => {
    res.socket.server.io = io;
    res.status(200).json({});
  });
}
