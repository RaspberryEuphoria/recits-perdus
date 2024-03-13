import { PostRepository } from '../../../infrastructure/post-sql.repository';
import { UpdatePostDto } from '../entities/post';

export function updatePostUsecase(postRepository: PostRepository) {
  return async (postDto: UpdatePostDto) => {
    const { id, content } = postDto;

    return postRepository.update(id, content);
  };
}
