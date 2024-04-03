import sharp from 'sharp';

import { UpdateCharacterAvatarDto } from '../../../../scenario/domain/character/entities/character';
import { FileRepository } from '../../../infrastructure/file.repository';
import { UserRepository } from '../../../infrastructure/user-sql.repository';

function updateCharacterAvatarUsecase(
  userRepository: UserRepository,
  userFileRepository: FileRepository,
) {
  return async function (updateCharacterAvatarDto: UpdateCharacterAvatarDto) {
    const { base64Avatar } = updateCharacterAvatarDto;

    const newFilename = `${updateCharacterAvatarDto.userId}-${Date.now()}.png`;

    try {
      const file = base64Avatar.split(';base64,').pop();
      if (!file) {
        throw new Error(
          `User ${updateCharacterAvatarDto.userId} attempted to upload an invalid file.`,
        );
      }

      const croppedFile = await cropImage(file, updateCharacterAvatarDto.crop);
      await userFileRepository.uploadFile(croppedFile, 'avatars', newFilename);

      const character = await userRepository.getCharacter(updateCharacterAvatarDto.id);
      const previousAvatar = character.avatar;

      if (previousAvatar) await userFileRepository.removeFile('avatars', previousAvatar);

      await userRepository.updateCharacterAvatar({
        characterId: updateCharacterAvatarDto.id,
        avatar: newFilename,
      });

      return newFilename;
    } catch (err) {
      console.error(`There was an error while updating character avatar: ${err}`);
    }
  };
}

async function cropImage(base64Image: string, crop: UpdateCharacterAvatarDto['crop']) {
  const { x, y, width, height } = crop;

  return await sharp(Buffer.from(base64Image, 'base64'))
    .extract({
      width: Math.floor(width),
      height: Math.floor(height),
      left: Math.floor(x),
      top: Math.floor(y),
    })
    .resize(200, 230)
    .png()
    .toBuffer();
}

export { updateCharacterAvatarUsecase };
