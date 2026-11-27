import { cropImage } from '../../../../../services/Cropper';
import { FileRepository } from '../../../../user/infrastructure/file.repository';
import { NoteRepository } from '../../../infrastructure/note-sql.repository';
import { UpdateNoteIllustrationDto } from '../entities/note';

const ILLUSTRATION_WIDTH = 200;
const ILLUSTRATION_HEIGHT = 230;

function addIllustrationToNoteUsecase(
  noteRepository: NoteRepository,
  fileRepository: FileRepository,
) {
  return async function (updateNoteIllustrationDto: UpdateNoteIllustrationDto) {
    const { base64Image, crop, id } = updateNoteIllustrationDto;

    try {
      const file = base64Image.split(';base64,').pop();
      if (!file) throw new Error(`Note ${id} attempted to upload an invalid file.`);

      const croppedFile = await cropImage(file, crop, ILLUSTRATION_WIDTH, ILLUSTRATION_HEIGHT);
      const newFilename = `${id}-${Date.now()}.png`;
      await fileRepository.uploadFile(croppedFile, 'illustrations', newFilename);

      const note = await noteRepository.getNote(id);
      const previousIllustration = note?.illustration;

      await noteRepository.updateIllustration({ id, illustration: newFilename });

      // keep the file if an imported copy of this note still uses it
      if (
        previousIllustration &&
        (await noteRepository.countNotesUsingIllustration(previousIllustration)) === 0
      ) {
        await fileRepository.removeFile('illustrations', previousIllustration);
      }

      return newFilename;
    } catch (err) {
      console.error(`There was an error while updating note ${id} illustration: ${err}`);
    }
  };
}

export { addIllustrationToNoteUsecase };
