import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

import { DiscordService } from '../../services/DiscordService';
import { FileRepository } from '../user/infrastructure/file.repository';
import { scenarioRoutes } from './api/scenario.api';
import { checkUserIdUsecase } from './domain/character/usecases/checkUserId.usecase';
import {
  CreatePostDto,
  UpdatePostDto,
  UpdatePostIllustrationDto,
} from './domain/post/entities/post';
import { addIllustrationToPostUsecase } from './domain/post/usecases/addIllustrationToPost.usecase';
import { createPostUsecase } from './domain/post/usecases/createPost.usecase';
import { updatePostUsecase } from './domain/post/usecases/updatePost.usecase';
import { CreateNoteDto, UpdateNoteDto } from './domain/scenario/entities/note';
import { CreateScenarioDto, ScenarioStatus } from './domain/scenario/entities/scenario';
import { addCharacterUsecase } from './domain/scenario/usecases/addCharacter.usecase';
import { addIllustrationToNoteUsecase } from './domain/scenario/usecases/addIllustrationToNote.usecase';
import { createNoteUsecase } from './domain/scenario/usecases/createNote.usecase';
import { createScenarioUsecase } from './domain/scenario/usecases/createScenario.usecase';
import { getAllScenarios } from './domain/scenario/usecases/getAllScenarios.usecase';
import { getNotesUsecase } from './domain/scenario/usecases/getNotes.usecase';
import { getScenarioByIdUsecase } from './domain/scenario/usecases/getScenarioById.usecase';
import { getStatsUsecase } from './domain/scenario/usecases/getStats.usecase';
import { startScenarioUsecase } from './domain/scenario/usecases/startScenario.usecase';
import { updateNoteUsecase } from './domain/scenario/usecases/updateNote.usecase';
import { CharacterRepository } from './infrastructure/character-sql.repository';
import { NoteRepository } from './infrastructure/note-sql.repository';
import { PostRepository } from './infrastructure/post-sql.repository';
import { ScenarioRepository } from './infrastructure/scenario-sql.repository';
import { SkillRepository } from './infrastructure/skill-sql.repository';

export class ScenarioContainer {
  private scenarioRepository: ScenarioRepository;
  private postRepository: PostRepository;
  private noteRepository: NoteRepository;
  private skillRepository: SkillRepository;
  private characterRepository: CharacterRepository;
  private scenarioRoutes: Router;
  private postFileRepository: FileRepository;
  private noteFileRepository: FileRepository;

  constructor(db: PrismaClient, private readonly discord: DiscordService) {
    this.scenarioRepository = new ScenarioRepository(db);
    this.postRepository = new PostRepository(db);
    this.noteRepository = new NoteRepository(db);
    this.skillRepository = new SkillRepository(db);
    this.characterRepository = new CharacterRepository(db);
    this.scenarioRoutes = scenarioRoutes(this);
    this.postFileRepository = new FileRepository(
      `${process.env.PUBLIC_FOLDER_PATH}/${process.env.POSTS_FOLDER_PATH}`,
    );
    this.noteFileRepository = new FileRepository(
      `${process.env.PUBLIC_FOLDER_PATH}/${process.env.NOTES_FOLDER_PATH}`,
    );
  }

  get repository() {
    return this.scenarioRepository;
  }

  get routes() {
    return this.scenarioRoutes;
  }

  getStats() {
    return getStatsUsecase(this.scenarioRepository)();
  }

  getAllScenarios(scenarioStatus: ScenarioStatus) {
    return getAllScenarios(this.scenarioRepository)(scenarioStatus);
  }

  getScenarioById(scenarioId: number) {
    return getScenarioByIdUsecase(this.scenarioRepository)(scenarioId);
  }

  createScenario(scenario: CreateScenarioDto) {
    return createScenarioUsecase(this.scenarioRepository, this.discord)(scenario);
  }

  startScenario({ scenarioId, userId }: { scenarioId: number; userId: number }) {
    return startScenarioUsecase(this.scenarioRepository, this.discord)({ scenarioId, userId });
  }

  addCharacter(scenarioId: number, character: { id: number; textColor: string }) {
    return addCharacterUsecase(this.scenarioRepository)(scenarioId, character);
  }

  createPost(post: CreatePostDto) {
    return createPostUsecase(
      this.postRepository,
      this.scenarioRepository,
      this.skillRepository,
      this.characterRepository,
      this.discord,
    )(post);
  }

  updatePost(post: UpdatePostDto) {
    return updatePostUsecase(this.postRepository)(post);
  }

  getNotes(scenarioId: number) {
    return getNotesUsecase(this.scenarioRepository)(scenarioId);
  }

  createNote(note: CreateNoteDto) {
    return createNoteUsecase(this.scenarioRepository)(note);
  }

  updateNote(note: UpdateNoteDto) {
    return updateNoteUsecase(this.scenarioRepository)(note);
  }

  addIllustrationToPost(illustrationDto: UpdatePostIllustrationDto) {
    return addIllustrationToPostUsecase(
      this.postRepository,
      this.postFileRepository,
    )(illustrationDto);
  }

  addIllustrationToNote(illustrationDto: UpdatePostIllustrationDto) {
    return addIllustrationToNoteUsecase(
      this.noteRepository,
      this.noteFileRepository,
    )(illustrationDto);
  }

  checkUserIdUsecase(characterId: number, userId: number) {
    return checkUserIdUsecase(this.characterRepository)(characterId, userId);
  }
}
