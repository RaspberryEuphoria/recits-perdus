import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

import { characterRoutes } from './api/character.api';
import { getAllCharacters } from './domain/character/usecases/getAllCharacters.usecase';
import { getStatsUsecase } from './domain/character/usecases/getStats.usecase';
import { CharacterRepository } from './infrastructure/character-sql.repository';

export class CharacterContainer {
  private characterRepository: CharacterRepository;
  private characterRoutes: Router;

  constructor(db: PrismaClient) {
    this.characterRepository = new CharacterRepository(db);
    this.characterRoutes = characterRoutes(this);
  }

  get repository() {
    return this.characterRepository;
  }

  get routes() {
    return this.characterRoutes;
  }

  getStats() {
    return getStatsUsecase(this.characterRepository)();
  }

  getAllCharacters() {
    return getAllCharacters(this.characterRepository)();
  }
}
