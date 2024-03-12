import { Prisma, PrismaClient } from '@prisma/client';

import { CreatePostDto, Dice, MoveMeta, MoveResult } from '../domain/post/entities/post';

export type PostWithCharacterSkills = Prisma.PostGetPayload<{
  include: {
    character: {
      include: {
        skills: true;
      };
    };
  };
}>;

export class PostRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async create(postDto: CreatePostDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { dices, ...post } = postDto;

    const newPost = await this.db.post.create({
      data: post,
      include: {
        character: true,
      },
    });

    await this.db.scenario.update({
      where: {
        id: postDto.scenarioId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return newPost;
  }

  async getById(id: number): Promise<PostWithCharacterSkills | null> {
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
    meta: MoveMeta;
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
