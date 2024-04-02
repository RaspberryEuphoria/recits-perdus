import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

import { AuthService } from '../../services/AuthService';
import {
  CreateCharacterDTO,
  UpdateCharacterAvatarDto,
  UpdateCharacterDto,
} from '../scenario/domain/character/entities/character';
import { userRoutes } from './api/user.api';
import { CreateUserDto, User } from './domain/user/entities/user';
import { createCharacterUsecase } from './domain/user/usecases/createCharacter.usecase';
import { getCharacterUsecase } from './domain/user/usecases/getCharacter.usecase';
import { getCharactersUsecase } from './domain/user/usecases/getCharacters.usecase';
import { loginUserUsecase } from './domain/user/usecases/loginUser.usecase';
import { registerUserUsecase } from './domain/user/usecases/registerUser.usecase';
import { updateCharacterUsecase } from './domain/user/usecases/updateCharacter.usecase';
import { updateCharacterAvatarUsecase } from './domain/user/usecases/updateCharacterAvatar.usecase';
import { FileRepository } from './infrastructure/file.repository';
import { UserRepository } from './infrastructure/user-sql.repository';

export class UserContainer {
  private userRepository: UserRepository;
  private userRoutes: Router;
  private fileRepository: FileRepository;

  constructor(db: PrismaClient, authService: AuthService) {
    this.userRepository = new UserRepository(db, authService);
    this.userRoutes = userRoutes(this);
    this.fileRepository = new FileRepository(
      `${process.env.PUBLIC_FOLDER_PATH}/${process.env.USERS_FOLDER_PATH}`,
    );
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

  getCharacter(userId: number, characterId: number) {
    return getCharacterUsecase(this.userRepository)(userId, characterId);
  }

  createCharacter(createCharacterDto: CreateCharacterDTO) {
    return createCharacterUsecase(this.userRepository)(createCharacterDto);
  }

  updateCharacter(updateCharacterDto: UpdateCharacterDto) {
    return updateCharacterUsecase(this.userRepository)(updateCharacterDto);
  }

  updateCharacterAvatar(updateCharacterAvatarDto: UpdateCharacterAvatarDto) {
    return updateCharacterAvatarUsecase(
      this.userRepository,
      this.fileRepository,
    )(updateCharacterAvatarDto);
  }
}
