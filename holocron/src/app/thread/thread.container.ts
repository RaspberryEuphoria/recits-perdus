import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

import { threadRoutes } from './api/thread.api';
import { CreatePostDto } from './domain/post/entities/post';
import { createPostUsecase } from './domain/post/usecases/createPost.usecase';
import { CreateThreadDto, ThreadStatus } from './domain/thread/entities/thread';
import { createThreadUsecase } from './domain/thread/usecases/createThread.usecase';
import { getAllThreads } from './domain/thread/usecases/getAllThreads.usecase';
import { getThreadByIdUsecase } from './domain/thread/usecases/getThreadById.usecase';
import { PostRepository } from './infrastructure/post-sql.repository';
import { ThreadRepository } from './infrastructure/thread-sql.repository';

export class ThreadContainer {
  private threadRepository: ThreadRepository;
  private postRepository: PostRepository;
  private threadRoutes: Router;

  constructor(db: PrismaClient) {
    this.threadRepository = new ThreadRepository(db);
    this.postRepository = new PostRepository(db);
    this.threadRoutes = threadRoutes(this);
  }

  get repository() {
    return this.threadRepository;
  }

  get routes() {
    return this.threadRoutes;
  }

  getAllThreads(threadStatus: ThreadStatus) {
    return getAllThreads(this.threadRepository)(threadStatus);
  }

  getThreadById(threadId: number) {
    return getThreadByIdUsecase(this.threadRepository)(threadId);
  }

  createThread(thread: CreateThreadDto) {
    return createThreadUsecase(this.threadRepository)(thread);
  }

  createPost(post: CreatePostDto) {
    return createPostUsecase(this.postRepository)(post);
  }
}
