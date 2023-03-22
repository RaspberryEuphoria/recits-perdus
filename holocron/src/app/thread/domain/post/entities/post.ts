import { Thread } from '../../thread/entities/thread';

type Post = {
  id: number;
  content: string;
  thread: Thread;
  threadId: number;
  // character: Character;
  characterId: number;
};

type CreatePostDto = {
  content: string;
  threadId: number;
  characterId: number;
};

export { CreatePostDto, Post };
