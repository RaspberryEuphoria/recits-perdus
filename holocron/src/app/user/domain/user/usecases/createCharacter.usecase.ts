import { CreateCharacterDTO } from '../../../../scenario/domain/character/entities/character';
import { UserRepository } from '../../../infrastructure/user-sql.repository';

function createCharacterUsecase(userRepository: UserRepository) {
  return async function (createCharacterDto: CreateCharacterDTO) {
    checkSkills(createCharacterDto);

    const characters = await userRepository.createCharacter(createCharacterDto);
    return characters;
  };
}

function checkSkills(createCharacterDto: CreateCharacterDTO) {
  const skills = createCharacterDto.skills;

  if (skills.length !== 5) {
    throw new Error(
      `Unable to create character for user ${createCharacterDto.userId}. Character must have 5 skills.`,
    );
  }
}

export { createCharacterUsecase };
