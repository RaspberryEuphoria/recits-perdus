enum ThreadStatus {
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  LOCKED = 'LOCKED',
}

type Post = {
  id: number;
  content: string;
  thread: Thread;
  threadId: number;
  // character: Character;
  characterId: number;
};

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

export { ThreadStatus, type Thread };
