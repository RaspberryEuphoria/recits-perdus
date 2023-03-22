import { PrismaClient } from '@prisma/client';

import { CreateThreadDto } from '../domain/thread/entities/thread';

export class ThreadRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllThreads() {
    return this.db.thread.findMany({
      include: {
        posts: true,
      },
    });
  }

  async getById(id: number) {
    return this.db.thread.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          include: {
            character: true,
          },
        },
      },
    });
  }

  async create(thread: CreateThreadDto) {
    return this.db.thread.create({
      data: thread,
    });
  }
}
