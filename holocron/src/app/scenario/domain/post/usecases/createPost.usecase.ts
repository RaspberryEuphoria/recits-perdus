import { Character, Post } from '@prisma/client';

import { PostRepository } from '../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';
import { CreatePostDto } from '../entities/post';

export function createPostUsecase(
  postRepository: PostRepository,
  scenarioRepository: ScenarioRepository,
) {
  return async (post: CreatePostDto) => {
    const scenario = await scenarioRepository.getById(post.scenarioId);
    if (!scenario) throw new Error(`Scenario ${post.scenarioId} not found`);

    const nextPoster = getNextPoster(
      scenario.characters,
      scenario.posts[scenario.posts.length - 1]?.character,
    );

    const isAllowedToPost = post.characterId === nextPoster.id;
    if (!isAllowedToPost) {
      throw new Error(
        `Character ${post.characterId} is not allowed to post, next poster is ${nextPoster.id}`,
      );
    }

    const currentTurn = getCurrentTurn(scenario.posts, scenario.characters.length);
    const isGameMaster = checkIfGameMaster(
      post.characterId,
      currentTurn,
      scenario.posts,
      scenario.characters.length,
    );

    const newPost = await postRepository.create({ ...post, isGameMaster });
    return newPost;
  };
}

export function getNextPoster(characters: Character[], lastPoster?: Character) {
  if (!lastPoster) return characters[0];

  const lastPosterIndex = characters.findIndex((character) => character.id === lastPoster.id);
  return characters[lastPosterIndex + 1] || characters[0];
}

export function getCurrentTurn(posts: Post[], charactersCount: number) {
  const postsCount = posts.length;
  if (postsCount < charactersCount) return 1;
  if (postsCount === charactersCount) return 2;

  const postsPerTurn = charactersCount;
  return Math.ceil(postsCount / postsPerTurn);
}

/**
 * The game master is the one who was the first to post on the previous turn
 */
export function checkIfGameMaster(
  characterId: number,
  currentTurn: number,
  posts: Post[],
  charactersCount: number,
) {
  if (currentTurn === 1) return false; // The game master never posts on the first turn

  const previousTurn = currentTurn - 1;
  const postsPerTurn = charactersCount + 1; // +1 to account for the GM
  const start = previousTurn * postsPerTurn - postsPerTurn;
  const end = start + postsPerTurn;

  const [firstPostOnPreviousTurn] = posts.slice(start, end);
  return firstPostOnPreviousTurn && firstPostOnPreviousTurn.characterId === characterId;
}
