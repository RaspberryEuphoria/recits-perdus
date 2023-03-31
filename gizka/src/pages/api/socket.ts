import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }

  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('post-new-dialog', (newDialog) => {
        socket.broadcast.emit('receive-new-dialog', newDialog);
      });
    });
  }

  res.status(200).json({});
}
