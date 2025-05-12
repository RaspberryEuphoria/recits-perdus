import { useTranslations } from 'next-intl';

import { Avatar } from '@/components/DesignSystem/Avatar';
import { Button } from '@/components/DesignSystem/Button';
import { Row } from '@/components/DesignSystem/Row';
import { Text } from '@/components/DesignSystem/Text';
import PencilIcon from '@/public/images/icons/pencil.svg';
import { TextColor } from '@/utils/constants';
import type { Note as ScenarioNote } from '@/utils/types/scenario';

import * as Styled from './styled';

type NoteProps = {
  note: ScenarioNote;
  characterId?: number;
  onClose: () => void;
  onEdit: () => void;
};

/**
 * @todo Create a design system component to re-use here and in CharacterSheet
 */
export function NoteSheet({ note, characterId, onClose, onEdit }: NoteProps) {
  const t = useTranslations('scenarios');

  return (
    <Styled.Note>
      <Row gap="1" space="1" justify="space-between">
        <Button variant="small" outline onClick={onClose}>
          {t('notes.form.back-button.label')}
        </Button>
        {note.authorId === characterId && (
          <Button variant="small" outline onClick={onEdit}>
            <PencilIcon /> {t('notes.form.open-form-button.label.edit')}
          </Button>
        )}
      </Row>

      <Row justify="end">
        <Styled.AvatarWrapper>
          <Avatar name={note.title} avatarSrc={note.illustration} />
        </Styled.AvatarWrapper>

        <Styled.Content>
          <Row>
            <Styled.Name>
              {note.title}{' '}
              {note.subtitle && <Text color={TextColor.FlashyAlt}>{note.subtitle}</Text>}
            </Styled.Name>
          </Row>

          <Row space="1">
            <Text as="p">{note.description}</Text>
          </Row>
        </Styled.Content>
      </Row>
    </Styled.Note>
  );
}
