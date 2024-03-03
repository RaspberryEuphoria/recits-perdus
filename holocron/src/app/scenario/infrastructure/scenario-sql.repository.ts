import { Prisma, PrismaClient } from '@prisma/client';

import { CreateScenarioDto, ScenarioStatus } from '../domain/scenario/entities/scenario';

type FullScenario = Prisma.ScenarioGetPayload<{
  include: {
    posts: {
      include: {
        character: true;
        skill: true;
        moveId: true;
        dices: true;
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
            birthdate: true;
            avatar: true;
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

  async getAllScenariosByStatus(status: ScenarioStatus) {
    const scenarios = await this.db.scenario.findMany({
      where: {
        status,
      },
      include: {
        posts: {
          include: {
            character: true,
            skill: true,
            dices: true,
            // moveId: true,
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
                birthdate: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return scenarios.map(this.mapScenario);
  }

  async getById(id: number) {
    const scenario = await this.db.scenario.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          include: {
            character: true,
            skill: true,
            dices: true,
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
                birthdate: true,
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

    return this.mapScenario(scenario);
  }

  async create(scenario: CreateScenarioDto) {
    return this.db.scenario.create({
      data: scenario,
    });
  }

  private mapScenario(scenario: FullScenario) {
    return {
      ...scenario,
      // Merge character without relation table "CharactersOnScenarios" fields
      characters: scenario.characters.map(({ textColor, character }) => ({
        ...character,
        skills: character.skills
          ? character.skills.map((characterSkill) => ({
              ...characterSkill,
              name: characterSkill.skill.name,
            }))
          : [],
        textColor,
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
}
