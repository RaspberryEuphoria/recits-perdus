import { useTranslations } from 'next-intl';
import { Fragment, useMemo, useState } from 'react';

import { Block } from '@/components/DesignSystem/Block';
import { Button } from '@/components/DesignSystem/Button';
import { DetailedPicture } from '@/components/DesignSystem/DetailedPicture';
import { Row } from '@/components/DesignSystem/Row';
import { Text } from '@/components/DesignSystem/Text';
import NotesCharacterIcon from '@/public/images/icons/notes_character.svg';
import NotesClueIcon from '@/public/images/icons/notes_clues.svg';
import NotesItemIcon from '@/public/images/icons/notes_item.svg';
import NotesLocationIcon from '@/public/images/icons/notes_location.svg';
import PencilIcon from '@/public/images/icons/pencil.svg';
import PlanetIcon from '@/public/images/icons/planet.svg';
import { TextColor } from '@/utils/constants';
import { Note, NoteCategory } from '@/utils/types/scenario';

import { NotesForm } from './NotesForm';
import { NoteSheet } from './NoteSheet/NoteSheet';
import * as Styled from './styled';

type NotesProps = {
  scenarioId: number;
  characterId?: number;
  notes: Note[];
  era: string;
  location: string;
};

const ILLUSTRATION_SRC_PREFIX = `${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/notes/illustrations`;

const categories = [
  NoteCategory.CHARACTER,
  NoteCategory.LOCATION,
  NoteCategory.ITEM,
  NoteCategory.CLUE,
];

const iconByCategory = {
  [NoteCategory.CHARACTER]: <NotesCharacterIcon fill={TextColor.Flashy} width="25" />,
  [NoteCategory.LOCATION]: <NotesLocationIcon fill={TextColor.Flashy} width="25" />,
  [NoteCategory.ITEM]: <NotesItemIcon fill={TextColor.Flashy} width="25" />,
  [NoteCategory.CLUE]: <NotesClueIcon fill={TextColor.Flashy} width="25" />,
};

function filterNotesByCategory(notes: Note[], category: NoteCategory) {
  if (!notes) return [];
  return notes.filter((note) => note.category === category);
}

export function Notes(props: NotesProps) {
  const { notes: initialNotes, scenarioId, characterId, era, location } = props;
  const t = useTranslations('scenarios');

  const [isNotesFormOpen, setIsNotesFormOpen] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const openNote = (noteId: number) => {
    const note = notes.find((note) => note.id === noteId);

    if (!note) return;

    setSelectedNote(note);
  };

  const closeNote = () => {
    setSelectedNote(null);
  };

  const openNotesForm = () => {
    setIsNotesFormOpen(true);
  };

  const closeNotesForm = () => {
    setIsNotesFormOpen(false);
  };

  const saveNote = (note: Note) => {
    closeNotesForm();

    setNotes((prevNotes) => {
      if (!prevNotes) return [note];

      const existingNoteIndex = prevNotes.findIndex((n) => n.id === note.id);

      if (existingNoteIndex !== -1) {
        const updatedNotes = [...prevNotes];
        updatedNotes[existingNoteIndex] = note;
        return updatedNotes;
      }

      return [...prevNotes, note];
    });

    if (selectedNote) {
      setSelectedNote(note);
    }
  };

  const notesByCategory = useMemo(() => {
    return categories.map((category) => ({
      category,
      notes: filterNotesByCategory(notes, category),
    }));
  }, [notes]);

  if (isNotesFormOpen && characterId) {
    return (
      <Styled.Container>
        <NotesForm
          scenarioId={scenarioId}
          characterId={characterId}
          isEditMode={!!selectedNote}
          note={selectedNote}
          onClose={closeNotesForm}
          onSaved={saveNote}
        />
      </Styled.Container>
    );
  }

  if (selectedNote) {
    return (
      <NoteSheet
        note={selectedNote}
        characterId={characterId}
        onClose={closeNote}
        onEdit={openNotesForm}
      />
    );
  }

  return (
    <Styled.Container>
      {characterId && (
        <Row gap="1" space="1" justify="end">
          <Button variant="small" outline onClick={openNotesForm}>
            <PencilIcon /> {t('notes.form.open-form-button.label.new')}
          </Button>
        </Row>
      )}

      <Row space="1" direction="column" align="start">
        <Block color={TextColor.Flashy}>
          <Row justify="end">
            <PlanetIcon width="25" fill={TextColor.FlashyAlt} />
          </Row>

          <Text color={TextColor.Flashy} fontStyle="italic" size="sm">
            {location},
          </Text>
          <Text color={TextColor.Flashy} fontStyle="italic" size="sm">
            {era}
          </Text>
        </Block>
      </Row>

      {notesByCategory.map(({ category, notes }) => (
        <Fragment key={category}>
          <Row gap="05" space="1">
            {iconByCategory[category]}
            <Text as="h2" color={TextColor.FlashyAlt}>
              {t(`notes.categories.${category.toLowerCase()}`)}
            </Text>
          </Row>
          <Row display="grid" gap="1" align="start" justify="space-between" gridRepeat={6}>
            {notes.map((note) => (
              <DetailedPicture
                key={note.id}
                title={note.title}
                subTitle={note.subtitle}
                imageSrc={`${ILLUSTRATION_SRC_PREFIX}/${note.illustration}`}
                handleClick={() => openNote(note.id)}
              />
            ))}
          </Row>
        </Fragment>
      ))}
    </Styled.Container>
  );
}
