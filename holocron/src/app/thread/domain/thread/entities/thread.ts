import { Post } from '../../post/entities/post';

type Thread = {
  id: number;
  title: string;
  posts: Post[];
};

type CreateThreadDto = {
  title: string;
};

export { CreateThreadDto, Thread };
