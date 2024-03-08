import { Server as HttpServer, Socket } from 'net';
import type { NextApiResponse } from 'next';
import { Server as ServerIO } from 'socket.io';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: HttpServer & {
      io: ServerIO;
    };
  };
};
