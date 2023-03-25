import { ThreadRepository } from '../../../infrastructure/thread-sql.repository';
import { ThreadStatus } from '../entities/thread';

function getAllThreads(threadRepository: ThreadRepository) {
  return async function (threadStatus: ThreadStatus) {
    const threads = await threadRepository.getAllThreadsByStatus(threadStatus);
    return threads;
  };
}

export { getAllThreads };
