import { UserRepository } from '../../../infrastructure/user-sql.repository';
import { LoginDto } from '../entities/user';

function loginUserUsecase(userRepository: UserRepository) {
  return async function (credentials: LoginDto) {
    return userRepository.login(credentials);
  };
}

export { loginUserUsecase };
