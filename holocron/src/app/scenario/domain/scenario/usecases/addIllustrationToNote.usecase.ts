import sharp from 'sharp';

import { FileRepository } from '../../../../user/infrastructure/file.repository';
import { NoteRepository } from '../../../infrastructure/note-sql.repository';
import { UpdateNoteIllustrationDto } from '../entities/note';

function addIllustrationToNoteUsecase(
  noteRepository: NoteRepository,
  fileRepository: FileRepository,
) {
  return async function (updateNoteIllustrationDto: UpdateNoteIllustrationDto) {
    const { base64Image } = updateNoteIllustrationDto;

    const newFilename = `${updateNoteIllustrationDto.id}-${Date.now()}.png`;

    try {
      const file = base64Image.split(';base64,').pop();
      if (!file) {
        throw new Error(
          `Note ${updateNoteIllustrationDto.id} attempted to upload an invalid file.`,
        );
      }

      const croppedFile = await cropImage(file, updateNoteIllustrationDto.crop);
      fileRepository.uploadFile(croppedFile, 'illustrations', newFilename);

      const note = await noteRepository.getNote(updateNoteIllustrationDto.id);
      const previousIllustration = note?.illustration;

      if (previousIllustration) {
        await fileRepository.removeFile('illustrations', previousIllustration);
      }

      await noteRepository.updateIllustration({
        id: updateNoteIllustrationDto.id,
        illustration: newFilename,
      });

      return newFilename;
    } catch (err) {
      console.error(`There was an error while updating character avatar: ${err}`);
    }
  };
}

async function cropImage(base64Image: string, crop: UpdateNoteIllustrationDto['crop']) {
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

export { addIllustrationToNoteUsecase };
