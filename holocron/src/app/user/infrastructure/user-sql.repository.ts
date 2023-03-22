import { PrismaClient } from '@prisma/client';

import { AuthService } from '../../../services/AuthService';
import { CreateUserDto, User } from '../domain/user/entities/user';

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
}
