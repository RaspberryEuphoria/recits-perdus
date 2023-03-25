import { Post } from '../../post/entities/post';

enum ThreadStatus {
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  LOCKED = 'LOCKED',
}

type Thread = {
  id: number;
  title: string;
  safeTitle: string;
  posts: Post[];
  status: ThreadStatus;
  era: string;
  location: string;
  thumbnail: string;
};

type CreateThreadDto = {
  title: string;
  safeTitle: string;
  status: ThreadStatus;
};

export { CreateThreadDto, Thread, ThreadStatus };
