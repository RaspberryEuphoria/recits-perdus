import { ThreadRepository } from '../../../infrastructure/thread-sql.repository';
import { CreateThreadDto, ThreadStatus } from '../entities/thread';

function createThreadUsecase(threadRepository: ThreadRepository) {
  return async function (thread: CreateThreadDto) {
    const newThread = await threadRepository.create({
      ...thread,
      status: ThreadStatus.INITIATED,
      safeTitle: createSlugFromString(thread.title),
    });
    return newThread;
  };
}

/**
 * Make the string safe for urls
 * Remove diactrics, replace spaces with dashes, remove non-alphanumeric characters
 * and lower case the string
 */
function createSlugFromString(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
}

export { createThreadUsecase };
