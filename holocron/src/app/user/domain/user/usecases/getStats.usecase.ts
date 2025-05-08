import { UserRepository } from '../../../infrastructure/user-sql.repository';

function getStatsUsecase(userRepository: UserRepository) {
  return async function () {
    const stats = await userRepository.getStats();
    return stats;
  };
}

export { getStatsUsecase };
