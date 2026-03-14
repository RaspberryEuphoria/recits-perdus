import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '@/components/DesignSystem/Button';
import { Checkbox } from '@/components/DesignSystem/Checkbox/Checkbox';
import { Row } from '@/components/DesignSystem/Row';
import { Text } from '@/components/DesignSystem/Text';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { TextColor } from '@/utils/constants';
import { Note, NoteCategory } from '@/utils/types/scenario';

// import * as Styled from './styled';

type NotesImportProps = {
  scenarioId: number;
  characterId: number;
  onClose: () => void;
  onSaved: (note: Note) => void;
};

type ScenarioWithNote = {
  id: number;
  title: string;
  notes: Array<{
    id: number;
    title: string;
    category: NoteCategory;
  }>;
};

function hasNotes(scenario: {
  notes?: Array<{ id: number; title: string }>;
}): scenario is ScenarioWithNote {
  return !!scenario.notes && scenario.notes.length > 0;
}

export function NotesImport(props: NotesImportProps) {
  const { scenarioId, characterId, onClose } = props;
  const [scenarioNotes, setScenarioNotes] = useState<ScenarioWithNote[]>([]);
  const [selectedNoteIds, setSelectedNoteIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);

  const t = useTranslations('scenarios');

  const submitForm = async () => {
    setIsLoading(true);

    await httpBffClient.post<Note>(
      `/scenario/${scenarioId}/character/${characterId}/import-notes`,
      {
        notesIds: selectedNoteIds,
      },
    );

    setIsLoading(false);
    onClose();
  };

  const onCheckboxChange = (noteId: number) => {
    setSelectedNoteIds((prevSelectedNoteIds) =>
      prevSelectedNoteIds.includes(noteId)
        ? prevSelectedNoteIds.filter((id) => id !== noteId)
        : [...prevSelectedNoteIds, noteId],
    );
  };

  useEffect(() => {
    const getNotes = async () => {
      setIsFetchingNotes(true);

      try {
        const data = await httpBffClient.get<ScenarioWithNote[]>(`/character/${characterId}/notes`);

        if (isHttpError(data)) {
          console.error('Error fetching notes:', data.status, data.message);
          return;
        }

        const scenarioWithNotes = data
          .filter(hasNotes)
          .filter((scenario) => scenario.id !== scenarioId)
          .toSorted((a, b) => b.id - a.id);

        setScenarioNotes(scenarioWithNotes);
      } catch (error) {
        if (isHttpError(error)) {
          console.error('Error fetching notes:', error.status, error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }

      setIsFetchingNotes(false);
    };

    getNotes();
  }, [scenarioId, characterId]);

  return (
    <>
      <Row gap="1" space="1" justify="space-between">
        <Button variant="small" outline onClick={onClose} disabled={isLoading}>
          {t('notes.form.back-button.label')}
        </Button>
      </Row>

      {isFetchingNotes && <Row gap="1" space="1" justify="space-between"></Row>}

      {scenarioNotes.map((scenario) => (
        <Row key={scenario.id} gap="1" space="1" justify="space-between">
          <Text as="h2" color={TextColor.FlashyAlt}>
            {scenario.title}
            {scenario.notes.map((note) => (
              <Row key={note.id} gap="1" space="1" align="center">
                <Checkbox id={`note-${note.id}`} onChange={() => onCheckboxChange(note.id)} />
                <Text key={note.id} color={TextColor.Flashy} as="label" htmlFor={`note-${note.id}`}>
                  {note.title}
                </Text>
              </Row>
            ))}
          </Text>
        </Row>
      ))}

      <Row gap="1" space="1" justify="space-between">
        <Button
          isLoading={isLoading}
          disabled={isLoading || selectedNoteIds.length === 0}
          onClick={submitForm}
        >
          {t('notes.form.import-button.label')}
        </Button>
      </Row>
    </>
  );
}
