import { Prisma, PrismaClient } from '@prisma/client';

import { MoveId } from '../domain/post/entities/move';
import { getNextPosterId } from '../domain/post/usecases/createPost.usecase';
import { CreateNoteDto, UpdateNoteDto } from '../domain/scenario/entities/note';
import { CreateScenarioDto, ScenarioStatus } from '../domain/scenario/entities/scenario';

type FullScenario = Prisma.ScenarioGetPayload<{
  include: {
    posts: {
      include: {
        character: true;
        moves: {
          include: {
            skill: true;
            dices: true;
          };
        };
      };
    };
    characters: {
      include: {
        character: {
          select: {
            userId: true;
            id: true;
            firstName: true;
            lastName: true;
            story: true;
            title: true;
            isTitleSuffix: true;
            origin: true;
            age: true;
            avatar: true;
            health: true;
            spirit: true;
            momentum: true;
            skills: {
              include: {
                skill: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export class ScenarioRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getStats() {
    const count = await this.db.scenario.count();
    const postCount = await this.db.post.count();
    const diceCount = await this.db.dicesOnMoves.count({
      where: {
        type: 'ACTION',
      },
    });

    const lastPostWithCharacterAndScenario = await this.db.post.findFirst({
      include: {
        character: true,
        scenario: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    const characterFromScenario = await this.db.charactersOnScenarios.findFirst({
      where: {
        scenarioId: lastPostWithCharacterAndScenario?.scenario.id,
        characterId: lastPostWithCharacterAndScenario?.character.id,
      },
    });

    return {
      count,
      postCount,
      diceCount,
      lastPostId: lastPostWithCharacterAndScenario?.id,
      lastPostAt: lastPostWithCharacterAndScenario?.createdAt,
      lastPostCharacter: {
        firstName: lastPostWithCharacterAndScenario?.character.firstName,
        lastName: lastPostWithCharacterAndScenario?.character.lastName,
        textColor: characterFromScenario?.textColor,
        avatar: lastPostWithCharacterAndScenario?.character.avatar,
      },
      lastPostScenario: {
        id: lastPostWithCharacterAndScenario?.scenario.id,
        title: lastPostWithCharacterAndScenario?.scenario.title,
        safeTitle: lastPostWithCharacterAndScenario?.scenario.safeTitle,
        era: lastPostWithCharacterAndScenario?.scenario.era,
        location: lastPostWithCharacterAndScenario?.scenario.location,
        status: lastPostWithCharacterAndScenario?.scenario.status,
      },
    };
  }

  async getAllScenariosByStatus(status: ScenarioStatus) {
    const scenarios = await this.db.scenario.findMany({
      where: {
        status,
      },
      include: {
        posts: {
          include: {
            character: true,
            moves: {
              include: {
                skill: true,
                dices: true,
              },
            },
          },
        },
        characters: {
          include: {
            character: {
              select: {
                userId: true,
                id: true,
                firstName: true,
                lastName: true,
                story: true,
                title: true,
                isTitleSuffix: true,
                origin: true,
                age: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return scenarios.map(mapScenario);
  }

  async getNextPosterId(scenarioId: number) {
    const scenario = await this.db.scenario.findUnique({
      where: {
        id: scenarioId,
      },
      include: {
        posts: {
          include: {
            character: true,
          },
        },
        characters: {
          include: {
            character: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!scenario) {
      return null;
    }

    return getNextPosterId(
      scenario.characters.map((character) => character.character.id),
      scenario.posts,
    );
  }

  async getById(id: number) {
    const scenario = await this.db.scenario.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          orderBy: {
            id: 'asc',
          },
          include: {
            character: true,
            moves: {
              include: {
                skill: true,
                dices: true,
              },
            },
          },
        },
        characters: {
          orderBy: {
            id: 'asc',
          },
          include: {
            character: {
              select: {
                userId: true,
                id: true,
                firstName: true,
                lastName: true,
                story: true,
                title: true,
                isTitleSuffix: true,
                origin: true,
                age: true,
                avatar: true,
                skills: {
                  include: {
                    skill: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!scenario) {
      return null;
    }

    return mapScenario(scenario);
  }

  async create(createScenarioDto: CreateScenarioDto) {
    const { characterId, textColor, ...scenario } = createScenarioDto;

    return this.db.scenario.create({
      data: {
        ...scenario,
        characters: {
          create: {
            characterId,
            textColor,
          },
        },
      },
      include: {
        characters: {
          orderBy: {
            id: 'asc',
          },
          include: {
            character: {
              select: {
                userId: true,
                id: true,
                firstName: true,
                lastName: true,
                story: true,
                title: true,
                isTitleSuffix: true,
                origin: true,
                age: true,
                avatar: true,
                skills: {
                  include: {
                    skill: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async addCharacter({
    id,
    characterId,
    textColor,
  }: {
    id: number;
    characterId: number;
    textColor: string;
  }) {
    return this.db.scenario.update({
      where: {
        id,
      },
      data: {
        characters: {
          create: {
            characterId,
            textColor,
          },
        },
      },
    });
  }

  async update(id: number, scenario: Partial<CreateScenarioDto>) {
    return this.db.scenario.update({
      where: {
        id,
      },
      data: scenario,
    });
  }

  async addSupplies(id: number, supplies: number) {
    return this.changeSupplies(id, supplies);
  }

  async removeSupplies(id: number, supplies: number) {
    return this.changeSupplies(id, -supplies);
  }

  async changeSupplies(id: number, supplies: number) {
    return this.db.scenario.update({
      where: {
        id,
      },
      data: {
        supplies: {
          increment: supplies,
        },
      },
    });
  }

  async getCurrentFightProgress(scenarioId: number, postId: number, characterId: number) {
    const endingLastFightPost = await this.db.post.findFirst({
      where: {
        scenarioId,
        characterId,
        id: {
          lt: postId,
        },
        moves: {
          some: {
            moveId: MoveId.METTRE_FIN_AU_COMBAT,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    const startingCurrentFightPost = await this.db.post.findFirst({
      where: {
        scenarioId,
        id: {
          gt: endingLastFightPost?.id,
        },
        moves: {
          some: { moveId: MoveId.ENGAGER_LE_COMBAT },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    if (!startingCurrentFightPost) {
      throw new Error(`Post ${postId} is not part of a fight!`);
    }

    const currentFightPosts = await this.db.post.findMany({
      where: {
        scenarioId,
        id: {
          lt: postId,
          gte: startingCurrentFightPost.id,
        },
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

    const previousMoves = currentFightPosts.flatMap((post) => post.moves);

    const progressMoves = previousMoves.filter((move) => {
      if (!move.meta) return false;
      return JSON.parse(move.meta as string).progress;
    });

    const lastMove = progressMoves.at(-1);
    if (!lastMove) {
      return 0;
    }

    return JSON.parse(lastMove.meta as string).progress;
  }

  async getCurrentFightDifficulty(scenarioId: number, postId: number, characterId: number) {
    const startingCurrentFightPost = await this.db.post.findFirst({
      where: {
        scenarioId,
        characterId,
        id: {
          lt: postId,
        },
        moves: {
          some: {
            moveId: MoveId.ENGAGER_LE_COMBAT,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        moves: true,
      },
    });

    if (!startingCurrentFightPost) {
      throw new Error(`Post ${postId} is not part of a fight!`);
    }

    return JSON.parse(startingCurrentFightPost.moves[0].meta as string).difficulty;
  }

  async createNote(noteDto: CreateNoteDto) {
    return this.db.note.create({
      data: noteDto,
    });
  }

  async updateNote(noteDto: UpdateNoteDto) {
    console.log({ noteDto });
    return this.db.note.update({
      where: {
        id: noteDto.id,
      },
      data: noteDto,
    });
  }

  async getNotes(scenarioId: number) {
    return this.db.note.findMany({
      where: {
        scenarioId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
}

function mapScenario(scenario: FullScenario) {
  return {
    ...scenario,
    // Merge character without relation table "CharactersOnScenarios" fields
    characters: scenario.characters.map(({ textColor, health, spirit, momentum, character }) => ({
      ...character,
      skills: character.skills
        ? character.skills.map((characterSkill) => ({
            ...characterSkill,
            name: characterSkill.skill.name,
          }))
        : [],
      textColor,
      health,
      spirit,
      momentum,
    })),
    posts: scenario.posts.map((post) => ({
      ...post,
      // characterSkill: post.characterSkill
      //   ? {
      //       ...post.characterSkill,
      //       name: post.characterSkill.skill.name,
      //     }
      //   : null,
    })),
  };
}
