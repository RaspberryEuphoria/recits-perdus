import createHttpError from 'http-errors';

import { CreateCharacterDTO } from '../../../../scenario/domain/character/entities/character';
import { UserRepository } from '../../../infrastructure/user-sql.repository';

const SKILLS_COUNT = 5;

function createCharacterUsecase(userRepository: UserRepository) {
  return async function (createCharacterDto: CreateCharacterDTO) {
    await checkSkills(userRepository, createCharacterDto.skills);

    return userRepository.createCharacter(createCharacterDto);
  };
}

/**
 * Skills are ordered by rank (3, 2, 2, 1, 1): each of the 5 stats must appear exactly once.
 */
async function checkSkills(userRepository: UserRepository, skills: number[]) {
  if (skills.length !== SKILLS_COUNT || new Set(skills).size !== SKILLS_COUNT) {
    throw createHttpError.BadRequest(`A character must have ${SKILLS_COUNT} different skills`);
  }

  const existingCount = await userRepository.countSkills(skills);
  if (existingCount !== SKILLS_COUNT) {
    throw createHttpError.BadRequest('Unknown skill');
  }
}

export { createCharacterUsecase };
