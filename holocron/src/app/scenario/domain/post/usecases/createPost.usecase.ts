import { Character, Post, Scenario } from '@prisma/client';

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

    const nextPoster = getNextPoster(scenario.characters, scenario.posts);
    const isAllowedToPost = post.characterId === nextPoster.id;

    if (!isAllowedToPost) {
      throw new Error(
        `Character ${post.characterId} is not allowed to post, next poster is ${nextPoster.id}`,
      );
    }

    const turn = getTurnForNewPost(scenario.posts, scenario.characters.length);
    const isGameMaster = checkIfGameMaster(scenario.posts, scenario.characters.length);

    return postRepository.create({ ...post, turn, isGameMaster });
  };
}

export function getNextPoster(characters: Character[], posts: Post[]) {
  const lastPosterId = posts[posts.length - 1]?.characterId;
  if (!lastPosterId) return characters[0];

  const lastPosterIndex = characters.findIndex((character) => character.id === lastPosterId);
  return characters[lastPosterIndex + 1] || characters[0];
}

export function getTurnForNewPost(posts: Post[], charactersCount: number) {
  const postsCount = posts.length;

  // The first turn ends when all characters have posted once
  if (postsCount < charactersCount) return 1;
  if (postsCount === charactersCount) return 2;

  // From then on, a turn ends when each characters AND the GM have posted
  const currentTurnPosts = getCurrentTurnPosts(posts);
  const isNewTurn = checkIfNewTurn(currentTurnPosts, charactersCount);
  if (isNewTurn) return currentTurnPosts[0].turn + 1;
  return currentTurnPosts[0].turn;
}

export function checkIfGameMaster(posts: Post[], charactersCount: number) {
  if (!posts.length) return false; // The GM never posts on the first turn

  const currentTurnPosts = getCurrentTurnPosts(posts);
  return checkIfNewTurn(currentTurnPosts, charactersCount); // The GM posts on the first post of a new turn
}

function checkIfNewTurn(currentTurnPosts: Post[], charactersCount: number) {
  const currentTurn = currentTurnPosts[0].turn;
  if (currentTurn === 1) return currentTurnPosts.length === charactersCount;
  return currentTurnPosts.length === charactersCount + 1; // +1 to account for the GM
}

function getCurrentTurnPosts(posts: Post[]) {
  const [lastPost] = posts.slice(-1);
  const currentTurnPosts = posts.filter((post) => post.turn === lastPost.turn);
  return currentTurnPosts;
}
