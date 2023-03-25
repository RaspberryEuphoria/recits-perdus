import { PrismaClient } from '@prisma/client';

import { CreatePostDto } from '../domain/post/entities/post';

export class PostRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async create(post: CreatePostDto) {
    return this.db.post.create({
      data: post,
      include: {
        character: true,
      },
    });
  }
}
