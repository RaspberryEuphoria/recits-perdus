import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

import { AuthService } from '../../services/AuthService';
import { userRoutes } from './api/user.api';
import { CreateUserDto, User } from './domain/user/entities/user';
import { getCharactersUsecase } from './domain/user/usecases/getCharacters.usecase';
import { loginUserUsecase } from './domain/user/usecases/loginUser.usecase';
import { registerUserUsecase } from './domain/user/usecases/registerUser.usecase';
import { UserRepository } from './infrastructure/user-sql.repository';

export class UserContainer {
  private userRepository: UserRepository;
  private userRoutes: Router;

  constructor(db: PrismaClient, authService: AuthService) {
    this.userRepository = new UserRepository(db, authService);
    this.userRoutes = userRoutes(this);
  }

  get repository() {
    return this.userRepository;
  }

  get routes() {
    return this.userRoutes;
  }

  register(user: CreateUserDto) {
    return registerUserUsecase(this.userRepository)(user);
  }

  login(user: User) {
    return loginUserUsecase(this.userRepository)(user);
  }

  getCharacters(userId: number) {
    return getCharactersUsecase(this.userRepository)(userId);
  }
}
