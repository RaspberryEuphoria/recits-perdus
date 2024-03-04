import { Character, Post } from '@prisma/client';

import { CharacterRepository } from '../../../infrastructure/character-sql.repository';
import { PostRepository } from '../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';
import { SkillRepository } from '../../../infrastructure/skill-sql.repository';
import { CreatePostDto } from '../entities/post';
import { useMove } from './moves';

export function createPostUsecase(
  postRepository: PostRepository,
  scenarioRepository: ScenarioRepository,
  skillRepository: SkillRepository,
  characterRepository: CharacterRepository,
) {
  return async (postDto: CreatePostDto) => {
    const scenario = await scenarioRepository.getById(postDto.scenarioId);
    if (!scenario) throw new Error(`Scenario ${postDto.scenarioId} not found`);

    const nextPoster = getNextPoster(scenario.characters, scenario.posts);
    const isAllowedToPost = postDto.characterId === nextPoster.id;

    if (!isAllowedToPost) {
      throw new Error(
        `Character ${postDto.characterId} is not allowed to post, next poster is ${nextPoster.id}`,
      );
    }

    const turn = getTurnForNewPost(scenario.posts, scenario.characters.length);
    const isGameMaster = checkIfGameMaster(scenario.posts, scenario.characters.length);

    const { move, ...post } = postDto;
    const hasMove = !!move;

    const newPost = await postRepository.create({ ...post, turn, isGameMaster });

    const nextPosterAfterNewPost = getNextPoster(scenario.characters, [...scenario.posts, newPost]);

    if (!hasMove) {
      return {
        ...newPost,
        nextPoster: nextPosterAfterNewPost,
      };
    }

    const newPostWithMove = await useMove(
      postRepository,
      scenarioRepository,
      skillRepository,
      characterRepository,
    )(move, newPost.id);

    return {
      ...newPostWithMove,
      nextPoster: nextPosterAfterNewPost,
    };
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
  return false; // This feature is currently disabled

  if (!posts.length) return false; // The GM never posts on the first turn

  const currentTurnPosts = getCurrentTurnPosts(posts);
  return checkIfNewTurn(currentTurnPosts, charactersCount); // The GM posts on the first post of a new turn
}

function checkIfNewTurn(currentTurnPosts: Post[], charactersCount: number) {
  const currentTurn = currentTurnPosts[0].turn;
  if (currentTurn === 1) return currentTurnPosts.length === charactersCount;
  return currentTurnPosts.length === charactersCount; // +1 to account for the GM
}

function getCurrentTurnPosts(posts: Post[]) {
  const [lastPost] = posts.slice(-1);
  const currentTurnPosts = posts.filter((post) => post.turn === lastPost.turn);
  return currentTurnPosts;
}
