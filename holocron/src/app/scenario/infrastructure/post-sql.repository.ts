import { PrismaClient } from '@prisma/client';

import { CreatePostDto } from '../domain/post/entities/post';

export class PostRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async create(postDto: CreatePostDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { dices, ...post } = postDto;

    return this.db.post.create({
      data: post,
      include: {
        character: true,
      },
    });
  }

  async update(id: number, post: Partial<CreatePostDto>) {
    const { dices } = post;

    return this.db.post.update({
      where: {
        id,
      },
      data: {
        ...post,
        dices: {
          createMany: {
            data: dices || [],
          },
        },
      },
      include: {
        dices: true,
        skill: true,
      },
    });
  }

  async getById(id: number) {
    const post = await this.db.post.findUnique({
      where: {
        id,
      },
      include: {
        character: {
          include: {
            skills: true,
          },
        },
        skill: true,
        dices: true,
      },
    });

    if (!post) {
      return null;
    }

    return post;
  }
}
