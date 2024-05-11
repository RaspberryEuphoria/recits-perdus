import sharp from 'sharp';

import { FileRepository } from '../../../../user/infrastructure/file.repository';
import { PostRepository } from '../../../infrastructure/post-sql.repository';
import { UpdatePostIllustrationDto } from '../entities/post';

function addIllustrationToPostUsecase(
  postRepository: PostRepository,
  postFileRepository: FileRepository,
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

      const croppedFile = await cropImage(file, updatePostIllustrationDto.crop);
      await postFileRepository.uploadFile(croppedFile, 'illustrations', newFilename);

      await postRepository.updateIllustration({
        id: updatePostIllustrationDto.id,
        illustration: newFilename,
      });

      return newFilename;
    } catch (err) {
      console.error(`There was an error while updating character avatar: ${err}`);
    }
  };
}

async function cropImage(base64Image: string, crop: UpdatePostIllustrationDto['crop']) {
  const { x, y, width, height } = crop;

  return await sharp(Buffer.from(base64Image, 'base64'))
    .extract({
      width: Math.floor(width),
      height: Math.floor(height),
      left: Math.floor(x),
      top: Math.floor(y),
    })
    .resize(680, 230)
    .png()
    .toBuffer();
}

export { addIllustrationToPostUsecase };
