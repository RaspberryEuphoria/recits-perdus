import { UserRepository } from '../../../infrastructure/user-sql.repository';
import { User } from '../entities/user';

function loginUserUsecase(userRepository: UserRepository) {
  return async function (user: User) {
    const scenario = await userRepository.login(user);
    return scenario;
  };
}

export { loginUserUsecase };
