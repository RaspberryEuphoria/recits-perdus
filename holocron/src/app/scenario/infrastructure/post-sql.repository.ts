import { PrismaClient } from '@prisma/client';

import { CreatePostDto, Dice, MoveResult } from '../domain/post/entities/post';

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
      },
    });

    if (!post) {
      return null;
    }

    return post;
  }

  async addMove({
    postId,
    skillId,
    moveId,
    moveResult,
    isResolved,
    skillValue,
    dices,
    meta,
  }: {
    postId: number;
    skillId?: number;
    skillValue?: number;
    moveId: string;
    moveResult: MoveResult;
    isResolved: boolean;
    dices: Dice[];
    meta: Record<string, string | number>;
  }) {
    return this.db.post.update({
      where: {
        id: postId,
      },
      include: {
        moves: {
          include: {
            dices: true,
            skill: true,
          },
        },
      },
      data: {
        moves: {
          create: {
            moveId,
            skillId,
            skillValue,
            moveResult,
            isResolved,
            meta: JSON.stringify(meta),
            dices: {
              createMany: {
                data: dices,
              },
            },
          },
        },
      },
    });
  }
}
