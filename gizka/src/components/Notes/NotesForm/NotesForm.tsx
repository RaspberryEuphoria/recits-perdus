import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { Button } from '@/components/DesignSystem/Button';
import { Form } from '@/components/DesignSystem/Form';
import { Row } from '@/components/DesignSystem/Row';
import ThumbnailIcon from '@/public/images/icons/thumbnail.svg';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { Note } from '@/utils/types/scenario';

type NotesFormProps = {
  note?: Note | null;
  scenarioId: number;
  characterId: number;
  isEditMode: boolean;
  onClose: () => void;
  onSaved: (note: Note) => void;
};

export function NotesForm(props: NotesFormProps) {
  const { note, scenarioId, characterId, isEditMode, onClose, onSaved } = props;
  const [isLoading, setIsLoading] = useState(false);

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
    };

    if (isEditMode) {
      await editNote(note);
    } else {
      await createNewNote(note);
    }
  };

  const createNewNote = async ({ category, title, subtitle, description }: Partial<Note>) => {
    setIsLoading(true);

    const newNote = await httpBffClient.post<Note>(
      `/scenario/${scenarioId}/character/${characterId}/note`,
      {
        category,
        title,
        subtitle,
        description,
      },
    );

    if (isHttpError(newNote)) {
      console.error(`There was an error creating the note: ${newNote.message}`);
      return;
    }

    onSaved(newNote);
    setIsLoading(false);
  };

  const editNote = async ({ category, title, subtitle, description }: Partial<Note>) => {
    if (!note) return;

    setIsLoading(true);

    console.log('UPDATE', `/scenario/${scenarioId}/character/${characterId}/note/${note.id}`);

    const updatedNote = await httpBffClient.patch<Note>(
      `/scenario/${scenarioId}/character/${characterId}/note/${note.id}`,
      {
        category,
        title,
        subtitle,
        description,
      },
    );

    if (isHttpError(updatedNote)) {
      console.error(`There was an error updating the note: ${updatedNote.message}`);
      return;
    }

    onSaved(updatedNote);
    setIsLoading(false);
  };

  const openIllustrationModal = () => {
    console.log('Open illustration modal');
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

  const illustration = false;

  return (
    <>
      <Row gap="1" space="1" justify="space-between">
        <Button variant="small" outline onClick={onClose} disabled={isLoading}>
          {t('notes.form.back-button.label')}
        </Button>
        <Button
          onClick={openIllustrationModal}
          variant="small"
          outline={!illustration}
          disabled
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore WiP
          title="En construction"
        >
          <ThumbnailIcon />
          {t('en-cours.textarea.new.illustration-button.label')}
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
    </>
  );
}
