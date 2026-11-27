import createHttpError from 'http-errors';

import { cropImage } from '../../../../../services/Cropper';
import { UpdateCharacterAvatarDto } from '../../../../scenario/domain/character/entities/character';
import { FileRepository } from '../../../infrastructure/file.repository';
import { UserRepository } from '../../../infrastructure/user-sql.repository';

const AVATAR_WIDTH = 200;
const AVATAR_HEIGHT = 230;

function updateCharacterAvatarUsecase(
  userRepository: UserRepository,
  userFileRepository: FileRepository,
) {
  return async function (updateCharacterAvatarDto: UpdateCharacterAvatarDto) {
    const { base64Avatar, crop, id, userId } = updateCharacterAvatarDto;

    const file = base64Avatar.split(';base64,').pop();
    if (!file) throw createHttpError.BadRequest('Invalid image');

    const croppedFile = await cropImage(file, crop, AVATAR_WIDTH, AVATAR_HEIGHT);

    const newFilename = `${userId}-${Date.now()}.png`;
    await userFileRepository.uploadFile(croppedFile, 'avatars', newFilename);

    const character = await userRepository.getCharacter(id);
    const previousAvatar = character.avatar;

    await userRepository.updateCharacterAvatar({ characterId: id, avatar: newFilename });

    // only remove the old file once the new one is saved and referenced
    if (previousAvatar) await userFileRepository.removeFile('avatars', previousAvatar);

    return newFilename;
  };
}

export { updateCharacterAvatarUsecase };
