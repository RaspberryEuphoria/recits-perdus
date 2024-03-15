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

export type PostWithMoves = Prisma.PostGetPayload<{
  include: {
    moves: {
      include: {
        dices: true;
        skill: true;
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

  async update(id: number, content: string) {
    const updatedPost = await this.db.post.update({
      where: {
        id,
      },
      data: { content },
      include: {
        moves: {
          include: {
            dices: true,
            skill: true,
          },
        },
        character: true,
      },
    });

    await this.db.scenario.update({
      where: {
        id: updatedPost.scenarioId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return updatedPost;
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

  async getPreviousPostInScenario(
    scenarioId: number,
    postId: number,
  ): Promise<PostWithMoves | null> {
    const previousPost = await this.db.post.findFirst({
      where: {
        scenarioId,
        id: {
          lt: postId,
        },
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        moves: {
          include: {
            dices: true,
            skill: true,
          },
        },
      },
    });

    if (!previousPost) {
      return null;
    }

    return previousPost;
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
        character: true,
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
