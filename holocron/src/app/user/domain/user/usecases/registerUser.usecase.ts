import { UserRepository } from '../../../infrastructure/user-sql.repository';
import { CreateUserDto } from '../entities/user';

function registerUserUsecase(userRepository: UserRepository) {
  return async function (user: CreateUserDto) {
    const scenario = await userRepository.create(user);
    return scenario;
  };
}

export { registerUserUsecase };
