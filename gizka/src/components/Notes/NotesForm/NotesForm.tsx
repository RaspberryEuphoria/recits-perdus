import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { AvatarModal, Illustration } from '@/components/AvatarModal/AvatarModal';
import { Button } from '@/components/DesignSystem/Button';
import { Form } from '@/components/DesignSystem/Form';
import { Row } from '@/components/DesignSystem/Row';
import ThumbnailIcon from '@/public/images/icons/thumbnail.svg';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { Note, NoteDto } from '@/utils/types/scenario';

import * as Styled from './styled';

type NotesFormProps = {
  note?: Note | null;
  scenarioId: number;
  characterId: number;
  isEditMode: boolean;
  onClose: () => void;
  onSaved: (note: Note) => void;
};

const ILLUSTRATION_SIZE = {
  targetWidth: 200,
  targetHeight: 230,
};

const NOTES_FOLDER = 'notes/illustrations';

export function NotesForm(props: NotesFormProps) {
  const { note, scenarioId, characterId, isEditMode, onClose, onSaved } = props;

  const initialIllustration = note?.illustration
    ? `${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/${NOTES_FOLDER}/${note.illustration}`
    : null;

  const [isLoading, setIsLoading] = useState(false);
  const [isIllustrationModalOpen, setIsIllustrationModalOpen] = useState(false);
  const [illustration, setIllustration] = useState<Illustration | null>(null);
  const [illustrationPreview, setIllustrationPreview] = useState<string | null>(
    initialIllustration,
  );

  const t = useTranslations('scenarios');

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const category = e.currentTarget.category.value;
    const title = e.currentTarget.noteTitle.value;
    const subtitle = e.currentTarget.subtitle.value;
    const description = e.currentTarget.description.value;

    const isFormFilled = [category, title].every((value) => value);
    if (!isFormFilled) return;

    const note = {
      category,
      title,
      subtitle,
      description,
      illustration,
    };

    if (isEditMode) {
      await editNote(note);
    } else {
      await createNewNote(note);
    }
  };

  const createNewNote = async ({
    category,
    title,
    subtitle,
    description,
    illustration,
  }: Partial<NoteDto>) => {
    setIsLoading(true);

    const newNote = await httpBffClient.post<Note>(
      `/scenario/${scenarioId}/character/${characterId}/note`,
      {
        category,
        title,
        subtitle,
        description,
        illustration,
      },
    );

    if (isHttpError(newNote)) {
      console.error(`There was an error creating the note: ${newNote.message}`);
      return;
    }

    onSaved({ ...newNote, illustration: newNote.illustration });
    setIsLoading(false);
  };

  const editNote = async ({
    category,
    title,
    subtitle,
    description,
    illustration,
  }: Partial<NoteDto>) => {
    if (!note) return;

    setIsLoading(true);

    const updatedNote = await httpBffClient.patch<Note>(
      `/scenario/${scenarioId}/character/${characterId}/note/${note.id}`,
      {
        category,
        title,
        subtitle,
        description,
        illustration,
      },
    );

    if (isHttpError(updatedNote)) {
      console.error(`There was an error updating the note: ${updatedNote.message}`);
      return;
    }

    onSaved({ ...updatedNote, illustration: updatedNote.illustration });
    setIsLoading(false);
  };

  const openIllustrationModal = () => {
    setIsIllustrationModalOpen(true);
  };

  const closeIllustrationModal = () => {
    setIsIllustrationModalOpen(false);
  };

  const saveIllustration = async (
    crop: { x: number; y: number; width: number; height: number },
    base64Image: string,
  ) => {
    setIllustration({ crop, base64Image });

    const illustrationPreview = await httpBffClient.post<{ croppedImage: string }>(`/image-crop`, {
      crop,
      base64Image,
      ...ILLUSTRATION_SIZE,
    });

    if (!isHttpError(illustrationPreview)) {
      setIllustrationPreview(illustrationPreview.croppedImage);
    }
  };

  const inputs = useMemo(() => {
    return [
      {
        name: 'category',
        label: t('notes.form.labels.category.select'),
        type: 'select' as const,
        options: ['character', 'location', 'item', 'clue'].map((value) => ({
          value: value.toLocaleUpperCase(),
          label: t(`notes.form.labels.category.${value}`),
        })),
        mandatory: true,
        defaultValue: note?.category,
      },
      {
        name: 'noteTitle',
        label: t('notes.form.labels.title'),
        type: 'text' as const,
        mandatory: true,
        defaultValue: note?.title,
      },
      {
        name: 'subtitle',
        label: t('notes.form.labels.subtitle'),
        type: 'text' as const,
        defaultValue: note?.subtitle,
      },
      {
        name: 'description',
        label: t('notes.form.labels.description'),
        type: 'textarea' as const,
        defaultValue: note?.description,
      },
    ];
  }, [t]);

  return (
    <>
      <AvatarModal
        isOpen={isIllustrationModalOpen}
        closeAvatarModal={closeIllustrationModal}
        onAvatarSave={saveIllustration}
        initialImage={illustrationPreview}
        {...ILLUSTRATION_SIZE}
      />

      <Row gap="1" space="1" justify="space-between">
        <Button variant="small" outline onClick={onClose} disabled={isLoading}>
          {t('notes.form.back-button.label')}
        </Button>
        <Button
          onClick={openIllustrationModal}
          variant="small"
          outline={!illustration}
          disabled={isLoading}
        >
          <ThumbnailIcon />
          {t(
            `notes.form.labels.illustration.${
              illustration || initialIllustration ? 'edit' : 'new'
            }`,
          )}
        </Button>
      </Row>

      <Form
        onSubmit={submitForm}
        inputs={inputs}
        submitButton={
          <Button isLoading={isLoading} disabled={isLoading}>
            {t('notes.form.submit-button.label')}
          </Button>
        }
      />

      {illustrationPreview && (
        <Row gap="1" space="1" justify="space-between">
          <Styled.IllustrationPreview>
            <Image
              src={illustrationPreview}
              width={ILLUSTRATION_SIZE.targetWidth}
              height={ILLUSTRATION_SIZE.targetHeight}
              quality={100}
              alt="Illustration"
            />
          </Styled.IllustrationPreview>
        </Row>
      )}
    </>
  );
}
