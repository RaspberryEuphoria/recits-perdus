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
  posts: Post[];
  status: ThreadStatus;
};

type CreateThreadDto = {
  title: string;
  status: ThreadStatus;
};

export { CreateThreadDto, Thread, ThreadStatus };
