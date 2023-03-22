import { ThreadRepository } from '../../../infrastructure/thread-sql.repository';
import { CreateThreadDto } from '../entities/thread';

function createThreadUsecase(threadRepository: ThreadRepository) {
  return async function (thread: CreateThreadDto) {
    const newThread = await threadRepository.create(thread);
    return newThread;
  };
}

export { createThreadUsecase };
