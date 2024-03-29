import { UpdateCharacterDto } from '../../../../scenario/domain/character/entities/character';
import { UserRepository } from '../../../infrastructure/user-sql.repository';

function updateCharacterUsecase(userRepository: UserRepository) {
  return async function (updateCharacterDto: UpdateCharacterDto) {
    const characters = await userRepository.updateCharacter(updateCharacterDto);
    return characters;
  };
}

export { updateCharacterUsecase };
