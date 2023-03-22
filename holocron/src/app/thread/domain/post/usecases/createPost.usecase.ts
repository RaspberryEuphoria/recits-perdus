import { PostRepository } from '../../../infrastructure/post-sql.repository';
import { CreatePostDto } from '../entities/post';

function createPostUsecase(postRepository: PostRepository) {
  return async (post: CreatePostDto) => {
    const newPost = postRepository.create(post);
    return newPost;
  };
}

export { createPostUsecase };
