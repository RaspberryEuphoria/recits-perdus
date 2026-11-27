import { cropImage } from '../../../../../services/Cropper';
import { FileRepository } from '../../../../user/infrastructure/file.repository';
import { PostRepository } from '../../../infrastructure/post-sql.repository';
import { UpdatePostIllustrationDto } from '../entities/post';

function addIllustrationToPostUsecase(
  postRepository: PostRepository,
  fileRepository: FileRepository,
) {
  return async function (updatePostIllustrationDto: UpdatePostIllustrationDto) {
    const { base64Image } = updatePostIllustrationDto;

    const newFilename = `${updatePostIllustrationDto.id}-${Date.now()}.png`;

    try {
      const file = base64Image.split(';base64,').pop();
      if (!file) {
        throw new Error(
          `Post ${updatePostIllustrationDto.id} attempted to upload an invalid file.`,
        );
      }

      const croppedFile = await cropImage(file, updatePostIllustrationDto.crop, 680, 230);
      await fileRepository.uploadFile(croppedFile, 'illustrations', newFilename);

      await postRepository.updateIllustration({
        id: updatePostIllustrationDto.id,
        illustration: newFilename,
      });

      return newFilename;
    } catch (err) {
      console.error(`There was an error while adding a post illustration: ${err}`);
    }
  };
}

export { addIllustrationToPostUsecase };
