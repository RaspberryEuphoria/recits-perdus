import { ThreadRepository } from '../../../infrastructure/thread-sql.repository';
import { CreateThreadDto, ThreadStatus } from '../entities/thread';

function createThreadUsecase(threadRepository: ThreadRepository) {
  return async function (thread: CreateThreadDto) {
    const newThread = await threadRepository.create({ ...thread, status: ThreadStatus.INITIATED });
    return newThread;
  };
}

export { createThreadUsecase };
