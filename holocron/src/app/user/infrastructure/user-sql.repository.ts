import { Prisma, PrismaClient } from '@prisma/client';

import { AuthService } from '../../../services/AuthService';
import { CreateUserDto, User } from '../domain/user/entities/user';

type FullCharacter = Prisma.CharacterGetPayload<{
  select: {
    userId: true;
    id: true;
    firstName: true;
    lastName: true;
    story: true;
    birthdate: true;
    avatar: true;
    scenario: true;
    skills: {
      include: {
        skill: true;
      };
    };
  };
}>;

export class UserRepository {
  private db: PrismaClient;
  private authService;

  constructor(db: PrismaClient, authService: AuthService) {
    this.db = db;
    this.authService = authService;
  }

  async create(user: CreateUserDto) {
    const hashedUser = await this.authService.hashUser(user);

    const newUser = await this.db.user.create({
      data: hashedUser,
    });

    if (!newUser) throw new Error('User not created');

    return this.authService.giveAccessToken(newUser);
  }

  async login(user: User) {
    const hashedUser = await this.db.user.findUnique({
      where: { email: user.email },
    });

    if (!hashedUser) throw new Error('Email address or password not valid');

    return this.authService.loginUser(user.password, hashedUser);
  }

  async getCharacters(userId: number) {
    const characters = await this.db.character.findMany({
      where: { userId },
      include: {
        scenario: {
          take: 1,
          orderBy: {
            id: 'desc',
          },
        },
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    return characters.map(mapCharacters);
  }
}

function mapCharacters(character: FullCharacter) {
  return {
    ...character,
    skills: character.skills
      ? character.skills.map((characterSkill) => ({
          ...characterSkill,
          name: characterSkill.skill.name,
        }))
      : [],
    textColor: character.scenario[0].textColor,
    health: character.scenario[0].health,
    spirit: character.scenario[0].spirit,
    momentum: character.scenario[0].momentum,
  };
}
