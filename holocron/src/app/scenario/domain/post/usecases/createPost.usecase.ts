import { Character, Post } from '@prisma/client';

import { DiscordService } from '../../../../../services/DiscordService';
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
  discord: DiscordService,
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

    const { action, ...post } = postDto;
    const hasMove = action && action.move;

    const newPost = await postRepository.create({
      ...post,
      content: post.content.trim(),
    });
    const nextPosterAfterNewPost = getNextPoster(scenario.characters, [...scenario.posts, newPost]);

    if (!hasMove) {
      discord.postInScenario({ character: nextPoster, scenario, postId: newPost.id });

      return {
        ...newPost,
        nextPoster: nextPosterAfterNewPost,
      };
    }

    try {
      const newPostWithMove = await useMove(
        scenarioRepository,
        postRepository,
        characterRepository,
        skillRepository,
      )(action.move, newPost.id);

      discord.postInScenario({
        character: nextPoster,
        scenario,
        postId: newPost.id,
        moveId: action.move.id,
      });

      return {
        ...newPostWithMove,
        nextPoster: nextPosterAfterNewPost,
      };
    } catch (err: any) {
      console.error(`Unable to add move ${action.move.id} to post ${newPost.id}: "${err.message}"`);

      return {
        ...newPost,
        nextPoster: nextPosterAfterNewPost,
      };
    }
  };
}

export function getNextPoster(characters: Character[], posts: Post[]) {
  const lastPosterId = posts[posts.length - 1]?.characterId;
  if (!lastPosterId) return characters[0];

  const lastPosterIndex = characters.findIndex((character) => character.id === lastPosterId);
  return characters[lastPosterIndex + 1] || characters[0];
}

export function getNextPosterId(charactersIds: number[], posts: Post[]) {
  const lastPosterId = posts[posts.length - 1]?.characterId;
  if (!lastPosterId) return charactersIds[0];

  const lastPosterIndex = charactersIds.findIndex((characterId) => characterId === lastPosterId);
  return charactersIds[lastPosterIndex + 1] || charactersIds[0];
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
