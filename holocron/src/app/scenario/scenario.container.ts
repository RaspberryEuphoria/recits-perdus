import { PrismaClient } from '@prisma/client';
import { WebhookClient } from 'discord.js';
import { Router } from 'express';

import { scenarioRoutes } from './api/scenario.api';
import { CreatePostDto, UpdatePostDto } from './domain/post/entities/post';
import { createPostUsecase } from './domain/post/usecases/createPost.usecase';
import { updatePostUsecase } from './domain/post/usecases/updatePost.usecase';
import { CreateScenarioDto, ScenarioStatus } from './domain/scenario/entities/scenario';
import { createScenarioUsecase } from './domain/scenario/usecases/createScenario.usecase';
import { getAllScenarios } from './domain/scenario/usecases/getAllScenarios.usecase';
import { getScenarioByIdUsecase } from './domain/scenario/usecases/getScenarioById.usecase';
import { CharacterRepository } from './infrastructure/character-sql.repository';
import { PostRepository } from './infrastructure/post-sql.repository';
import { ScenarioRepository } from './infrastructure/scenario-sql.repository';
import { SkillRepository } from './infrastructure/skill-sql.repository';

export class ScenarioContainer {
  private scenarioRepository: ScenarioRepository;
  private postRepository: PostRepository;
  private skillRepository: SkillRepository;
  private characterRepository: CharacterRepository;
  private scenarioRoutes: Router;

  constructor(db: PrismaClient, private readonly discordWebhookClient: WebhookClient) {
    this.scenarioRepository = new ScenarioRepository(db);
    this.postRepository = new PostRepository(db);
    this.skillRepository = new SkillRepository(db);
    this.characterRepository = new CharacterRepository(db);
    this.scenarioRoutes = scenarioRoutes(this);
  }

  get repository() {
    return this.scenarioRepository;
  }

  get routes() {
    return this.scenarioRoutes;
  }

  getAllScenarios(scenarioStatus: ScenarioStatus) {
    return getAllScenarios(this.scenarioRepository)(scenarioStatus);
  }

  getScenarioById(scenarioId: number) {
    return getScenarioByIdUsecase(this.scenarioRepository)(scenarioId);
  }

  createScenario(scenario: CreateScenarioDto) {
    return createScenarioUsecase(this.scenarioRepository)(scenario);
  }

  createPost(post: CreatePostDto) {
    return createPostUsecase(
      this.postRepository,
      this.scenarioRepository,
      this.skillRepository,
      this.characterRepository,
      this.discordWebhookClient,
    )(post);
  }

  updatePost(post: UpdatePostDto) {
    return updatePostUsecase(this.postRepository)(post);
  }
}
