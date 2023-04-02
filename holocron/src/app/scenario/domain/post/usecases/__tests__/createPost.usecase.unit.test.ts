import { Character, Prisma } from '@prisma/client';

import { checkIfGameMaster, getNextPoster, getTurnForNewPost } from '../createPost.usecase';

type PostWithCharacter = Prisma.PostGetPayload<{
  include: {
    character: true;
  };
}>;

const characters: Character[] = [
  {
    id: 1,
    userId: 1,
    name: 'Character 1',
    birthdate: 0,
    story: '',
  },
  {
    id: 2,
    userId: 2,
    name: 'Character 2',
    birthdate: 0,
    story: '',
  },
  {
    id: 3,
    userId: 2,
    name: 'Character 3',
    birthdate: 0,
    story: '',
  },
];

const withZeroPosts: PostWithCharacter[] = [];
const withOnePost: PostWithCharacter[] = [
  {
    id: 1,
    characterId: characters[0].id,
    character: characters[0],
    scenarioId: 1,
    content: 'Post 1',
    isGameMaster: false, // Keep it false, it's not relevant for this test
    turn: 1,
  },
];

const withTwoPosts: PostWithCharacter[] = [
  ...withOnePost,
  {
    id: 2,
    characterId: characters[1].id,
    character: characters[1],
    scenarioId: 1,
    content: 'Post 2',
    isGameMaster: false,
    turn: 1,
  },
];

const withThreePosts: PostWithCharacter[] = [
  ...withTwoPosts,
  {
    id: 3,
    characterId: characters[2].id,
    character: characters[2],
    scenarioId: 1,
    content: 'Post 3',
    isGameMaster: false,
    turn: 1,
  },
];

const with200Posts: PostWithCharacter[] = [];
for (let i = 0; i < 200; i++) {
  with200Posts.push({
    id: i + 1,
    characterId: characters[i % 3].id,
    character: characters[i % 3],
    scenarioId: 1,
    content: `Post ${i + 1}`,
    isGameMaster: false,
    turn: 1,
  });
}

function getFirstNPosts(x: number) {
  return with200Posts.slice(0, x);
}

const assert = (message: string, left: any, right: any) => {
  if (left !== right) {
    console.error(`❌ ${message}:\n - expected "${right}"\n + got "${left}"`);
    return;
  }

  console.log(`✔️  ${message}`);
};

const describe = (message: string, callback: () => void) => {
  console.log(message);
  callback();
};

describe('Get the current turn', () => {
  describe('With two characters', () => {
    const charactersCount = 2;

    assert(
      'The first turn should be returned when there is no post',
      getTurnForNewPost(withZeroPosts, charactersCount),
      1,
    );

    assert(
      'The first turn should be returned when there is one post',
      getTurnForNewPost(withOnePost, charactersCount),
      1,
    );

    assert(
      'The second turn should be returned when there is two post',
      getTurnForNewPost(withTwoPosts, charactersCount),
      2,
    );

    assert(
      'The second turn should be returned when there is three post',
      getTurnForNewPost(withThreePosts, charactersCount),
      2,
    );

    const first4Posts = getFirstNPosts(4);
    assert(
      'The second turn should be returned when there is four post',
      getTurnForNewPost(first4Posts, charactersCount),
      2,
    );

    const first5Posts = getFirstNPosts(5);
    assert(
      'The third turn should be returned when there is five post',
      getTurnForNewPost(first5Posts, charactersCount),
      3,
    );

    const first6Posts = getFirstNPosts(6);
    assert(
      'The third turn should be returned when there is six post',
      getTurnForNewPost(first6Posts, charactersCount),
      3,
    );

    const first7Posts = getFirstNPosts(7);
    assert(
      'The fourth turn should be returned when there is seven post',
      getTurnForNewPost(first7Posts, charactersCount),
      4,
    );
  });

  describe('With three characters', () => {
    const charactersCount = 3;

    assert(
      'The first turn should be returned when there is no post',
      getTurnForNewPost(withZeroPosts, charactersCount),
      1,
    );

    assert(
      'The first turn should be returned when there is one post',
      getTurnForNewPost(withOnePost, charactersCount),
      1,
    );

    assert(
      'The first turn should be returned when there is two post',
      getTurnForNewPost(withTwoPosts, charactersCount),
      1,
    );

    assert(
      'The second turn should be returned when there is three post',
      getTurnForNewPost(withThreePosts, charactersCount),
      2,
    );

    const first4Posts = getFirstNPosts(4);
    assert(
      'The second turn should be returned when there is four post',
      getTurnForNewPost(first4Posts, charactersCount),
      2,
    );

    const first5Posts = getFirstNPosts(5);
    assert(
      'The second turn should be returned when there is five post',
      getTurnForNewPost(first5Posts, charactersCount),
      2,
    );

    const first6Posts = getFirstNPosts(6);
    assert(
      'The second turn should be returned when there is six post',
      getTurnForNewPost(first6Posts, charactersCount),
      2,
    );

    const first7Posts = getFirstNPosts(7);
    assert(
      'The third turn should be returned when there is seven post',
      getTurnForNewPost(first7Posts, charactersCount),
      3,
    );

    const first8Posts = getFirstNPosts(8);
    assert(
      'The third turn should be returned when there is eight post',
      getTurnForNewPost(first8Posts, charactersCount),
      3,
    );
  });
});

describe('Get the next poster', () => {
  assert(
    'The first character should be returned when there is no post',
    getNextPoster(characters, withZeroPosts).id,
    1,
  );

  assert(
    'The second character should be returned when there is one post',
    getNextPoster(characters, withOnePost).id,
    2,
  );

  assert(
    'The third character should be returned when there is two posts',
    getNextPoster(characters, withTwoPosts).id,
    3,
  );

  assert(
    'The first character should be returned when there is three posts',
    getNextPoster(characters, withThreePosts).id,
    1,
  );

  const first48Posts = getFirstNPosts(48);
  const first49Posts = getFirstNPosts(49);
  const first50Posts = getFirstNPosts(50);
  const first51Posts = getFirstNPosts(51);

  assert(
    'The first character should be returned when there is 48 posts',
    getNextPoster(characters, first48Posts).id,
    1,
  );

  assert(
    'The second character should be returned when there is 49 posts',
    getNextPoster(characters, first49Posts).id,
    2,
  );

  assert(
    'The third character should be returned when there is 50 posts',
    getNextPoster(characters, first50Posts).id,
    3,
  );

  assert(
    'The first character should be returned when there is 51 posts',
    getNextPoster(characters, first51Posts).id,
    1,
  );
});

describe('Check if checkIfGameMaster', () => {
  describe('On turn 1, there should NOT be a game master', () => {
    assert(
      'The first character should NOT be the game master',
      checkIfGameMaster(withZeroPosts, characters.length),
      false,
    );

    assert(
      'The second character should NOT be the game master',
      checkIfGameMaster(withZeroPosts, characters.length),
      false,
    );

    assert(
      'The third character should NOT be the game master',
      checkIfGameMaster(withZeroPosts, characters.length),
      false,
    );
  });

  describe('On turn 2, the game master should be character 1', () => {
    const first4Posts = getFirstNPosts(4);
    const first5Posts = getFirstNPosts(5);
    const first6Posts = getFirstNPosts(5);

    assert(
      'The first character should be the game master',
      checkIfGameMaster(first4Posts, characters.length),
      true,
    );

    assert(
      'The second character should NOT be the game master',
      checkIfGameMaster(first5Posts, characters.length),
      false,
    );

    assert(
      'The third character should NOT be the game master',
      checkIfGameMaster(first6Posts, characters.length),
      false,
    );
  });

  describe('On turn 3, the game master should be character 2', () => {
    const first7Posts = getFirstNPosts(7);
    const first8Posts = getFirstNPosts(8);
    const first9Posts = getFirstNPosts(9);

    assert(
      'The first character should NOT be the game master',
      checkIfGameMaster(first7Posts, characters.length),
      false,
    );

    assert(
      'The second character should be the game master',
      checkIfGameMaster(first8Posts, characters.length),
      true,
    );

    assert(
      'The third character should NOT be the game master',
      checkIfGameMaster(first9Posts, characters.length),
      false,
    );
  });

  describe('On turn 4, the game master should be character 3', () => {
    const first10Posts = getFirstNPosts(10);
    const first11Posts = getFirstNPosts(11);
    const first12Posts = getFirstNPosts(12);

    assert(
      'The first character should NOT be the game master',
      checkIfGameMaster(first10Posts, characters.length),
      false,
    );

    assert(
      'The second character should NOT be the game master',
      checkIfGameMaster(first11Posts, characters.length),
      false,
    );

    assert(
      'The third character should be the game master',
      checkIfGameMaster(first12Posts, characters.length),
      true,
    );
  });
});
