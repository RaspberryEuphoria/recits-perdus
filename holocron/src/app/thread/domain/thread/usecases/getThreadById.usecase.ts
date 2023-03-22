import { ThreadRepository } from '../../../infrastructure/thread-sql.repository';

function getThreadByIdUsecase(threadRepository: ThreadRepository) {
  return async function (threadId: number) {
    const thread = await threadRepository.getById(threadId);
    return thread;
  };
}

export { getThreadByIdUsecase };
