import { UserRepository } from '../../../infrastructure/user-sql.repository';
import { User } from '../entities/user';

function loginUserUsecase(userRepository: UserRepository) {
  return async function (user: User) {
    const loggedUser = await userRepository.login(user);
    return loggedUser;
  };
}

export { loginUserUsecase };
