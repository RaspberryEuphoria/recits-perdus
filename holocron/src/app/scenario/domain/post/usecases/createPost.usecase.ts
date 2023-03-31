import { Character } from '@prisma/client';

import { PostRepository } from '../../../infrastructure/post-sql.repository';
import { ScenarioRepository } from '../../../infrastructure/scenario-sql.repository';
import { CreatePostDto } from '../entities/post';

function createPostUsecase(postRepository: PostRepository, scenarioRepository: ScenarioRepository) {
  return async (post: CreatePostDto) => {
    const scenario = await scenarioRepository.getById(post.scenarioId);
    if (!scenario) throw new Error(`Scenario ${post.scenarioId} not found`);

    const nextPoster = getNextPoster(
      scenario.characters,
      scenario.posts[scenario.posts.length - 1]?.character,
    );

    const isAllowedToPost = post.characterId === nextPoster.id;
    if (!isAllowedToPost)
      throw new Error(
        `Character ${post.characterId} is not allowed to post, next poster is ${nextPoster.id}`,
      );

    const newPost = postRepository.create(post);
    return newPost;
  };
}

function getNextPoster(characters: Character[], lastPoster: Character) {
  if (!lastPoster) return characters[0];

  const lastPosterIndex = characters.findIndex((character) => character.id === lastPoster.id);
  return characters[lastPosterIndex + 1] || characters[0];
}

export { createPostUsecase };
