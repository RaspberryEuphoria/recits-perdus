'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { AvatarModal } from '@/components/AvatarModal';
import { Button } from '@/components/DesignSystem/Button';
import { Form } from '@/components/DesignSystem/Form';
import { Row } from '@/components/DesignSystem/Row';
import { Text } from '@/components/DesignSystem/Text';
import { UserContext } from '@/contexts/user';
import ThumbnailIcon from '@/public/images/icons/thumbnail.svg';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { Character } from '@/utils/types/character';
import { SkillId } from '@/utils/types/scenario';

import * as Styled from './styled';

type Skill = {
  id: SkillId;
  key: string;
};

const skills = [
  { id: SkillId.DETERMINATION, key: 'heart' },
  { id: SkillId.FINESSE, key: 'edge' },
  { id: SkillId.INTUITION, key: 'wits' },
  { id: SkillId.SUBTERFUGE, key: 'shadow' },
  { id: SkillId.TENACITE, key: 'iron' },
];

export function CharacterEditor({
  character,
  onCharacterSaved,
}: {
  character?: Character;
  onCharacterSaved: (character: Character) => void;
}) {
  const t = useTranslations('characters');
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const skillsTableRef = useRef<HTMLDivElement>(null);
  const isEditMode = useMemo(() => Boolean(character), [character]);

  const [characterSkills, setCharacterSkills] = useState<Array<Skill | null>>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [currentSkillCellIndex, setCurrentSkillCell] = useState<number | null>(null);

  const inputs = useMemo(() => {
    const commonInputs = [
      {
        name: 'firstName',
        type: 'text' as const,
        label: t('character-editor.form.labels.firstname'),
        defaultValue: character?.firstName,
        mandatory: true,
      },
      {
        name: 'lastName',
        label: t('character-editor.form.labels.lastname'),
        type: 'text' as const,
        defaultValue: character?.lastName,
        mandatory: true,
      },
      {
        name: 'age',
        label: t('character-editor.form.labels.age'),
        type: 'text' as const,
        defaultValue: character?.age,
        mandatory: true,
        onInput(event: React.FormEvent<HTMLInputElement>) {
          const target = event.target as HTMLInputElement;
          target.value = target.value.replace(/(\D)/g, '');
        },
      },
    ];

    if (!isEditMode) return commonInputs;

    return [
      ...commonInputs,
      {
        name: 'origin',
        label: t('character-editor.form.labels.origin'),
        type: 'text' as const,
        defaultValue: character?.origin,
        mandatory: false,
      },
      {
        name: 'story',
        label: t('character-editor.form.labels.story'),
        type: 'textarea' as const,
        defaultValue: character?.story,
        mandatory: false,
      },
    ];
  }, [t, character, isEditMode]);

  const handleCellClick = (index: number) => {
    openSkillPicker(index);
  };

  const handleSkillSelected = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    skill: Skill | null,
  ) => {
    event.stopPropagation();

    if (currentSkillCellIndex !== null) {
      console.log({ currentSkillCellIndex, skill });
      setCharacterSkills(characterSkills.with(currentSkillCellIndex, skill));
      setCurrentSkillCell(null);
    }
  };

  const openSkillPicker = (index: number) => {
    setCurrentSkillCell(index);
  };

  const saveAvatar = async (
    crop: { x: number; y: number; width: number; height: number },
    base64Image: string,
  ) => {
    if (!currentUser || !character) return;

    const updatedCharacter = await httpBffClient.put<{ avatar: string }>(
      `/user/${currentUser.id}/characters/${character.id}/avatar`,
      {
        crop,
        base64Image,
      },
    );

    if (isHttpError(updatedCharacter)) {
      console.error(`There was an error saving the character avatar: ${updatedCharacter.message}`);
      return;
    }

    onCharacterSaved({ ...character, avatar: updatedCharacter.avatar });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstName = e.currentTarget.firstName.value;
    const lastName = e.currentTarget.lastName.value;
    const age = e.currentTarget.age.value;

    if (!isEditMode) {
      await createNewCharacter({ firstName, lastName, age });
      return;
    }

    const origin = e.currentTarget.origin.value;
    const story = e.currentTarget.story.value;

    await editCharacter({ firstName, lastName, age, origin, story });
  };

  const createNewCharacter = async ({ firstName, lastName, age }: Partial<Character>) => {
    const isFormFilled = [firstName, lastName, age, ...characterSkills].every((value) => value);
    if (!isFormFilled || !currentUser) return;

    setIsLoading(true);

    const newCharacter = await httpBffClient.post<Character>(`/user/${currentUser.id}/characters`, {
      firstName,
      lastName,
      age,
      characterSkills,
    });

    if (isHttpError(newCharacter)) {
      console.error(`There was an error creating the character: ${newCharacter.message}`);
      return;
    }

    onCharacterSaved(newCharacter);
    setIsLoading(false);
  };

  const editCharacter = async ({ firstName, lastName, age, origin, story }: Partial<Character>) => {
    const isFormFilled = [firstName, lastName, age].every((value) => value);
    if (!isFormFilled || !currentUser || !character) return;

    setIsLoading(true);

    const updatedCharacter = await httpBffClient.put<Character>(
      `/user/${currentUser?.id}/characters/${character.id}`,
      {
        firstName,
        lastName,
        age,
        origin,
        story,
      },
    );

    if (isHttpError(updatedCharacter)) {
      console.error(`There was an error updating the character: ${updatedCharacter.message}`);
      setIsLoading(false);
      return;
    }

    onCharacterSaved(updatedCharacter);
    setIsLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (skillsTableRef.current && !skillsTableRef.current.contains(event.target as Node)) {
        setCurrentSkillCell(null);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const availableSkills = useMemo(
    () =>
      skills.filter(
        (skill) =>
          !Object.values(characterSkills)
            .filter((s) => s !== null)
            .map((s) => s?.id)
            .includes(skill.id),
      ),
    [characterSkills],
  );

  const openAvatarModal = () => {
    setIsAvatarModalOpen(true);
  };

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
  };

  if (isLoading) {
    return <Text>{t('character-editor.form.loading')}</Text>;
  }

  return (
    <Styled.FormWrapper>
      <AvatarModal
        isOpen={isAvatarModalOpen}
        closeAvatarModal={closeAvatarModal}
        onAvatarSave={saveAvatar}
        targetWidth={200}
        targetHeight={230}
      />
      {isEditMode && (
        <Row justify="end">
          <Button onClick={openAvatarModal} variant="small">
            <ThumbnailIcon />
            {t('character-editor.form.labels.avatar')}
          </Button>
        </Row>
      )}
      <Form
        onSubmit={submitForm}
        inputs={inputs}
        submitButton={
          <Button>{t(`character-editor.form.submit.${isEditMode ? 'edit' : 'new'}`)}</Button>
        }
      >
        {!isEditMode && (
          <>
            <Text as="h2">{t('character-editor.form.labels.skills')}</Text>
            <Styled.SkillsTable ref={skillsTableRef}>
              <Styled.Column>
                <Styled.Cell>{t('character-editor.form.labels.superb')} (+3)</Styled.Cell>
                <Styled.Cell>{t('character-editor.form.labels.great')} (+2)</Styled.Cell>
                <Styled.Cell>{t('character-editor.form.labels.good')} (+1)</Styled.Cell>
              </Styled.Column>
              <Styled.Column>
                {/*
                 * It's 0,1,3 instead of 0,1,2 because we want the skill with index "2" to be on the first column on the last row,
                 * and the skill with index "3" to be on the second column but on the second rows.
                 *
                 * Basically, the layout presented to the user is this:
                 * +3 [0, none]
                 * +2 [1, 2]
                 * +1 [3, 4]
                 */}
                {[0, 1, 3].map((index) => (
                  <SkillCell
                    key={index}
                    onCellClick={() => handleCellClick(index)}
                    onSkillSelected={handleSkillSelected}
                    skill={characterSkills[index]}
                    showSkillPicker={currentSkillCellIndex === index}
                    availableSkills={availableSkills}
                  />
                ))}
              </Styled.Column>
              <Styled.Column>
                <Styled.Cell isHidden>...</Styled.Cell>
                {[2, 4].map((index) => (
                  <SkillCell
                    key={index}
                    onCellClick={() => handleCellClick(index)}
                    onSkillSelected={handleSkillSelected}
                    skill={characterSkills[index]}
                    showSkillPicker={currentSkillCellIndex === index}
                    availableSkills={availableSkills}
                  />
                ))}
              </Styled.Column>
            </Styled.SkillsTable>

            <Styled.SkillHelp size="sm">
              {t('character-editor.form.labels.skills-help')}
            </Styled.SkillHelp>
          </>
        )}
      </Form>
    </Styled.FormWrapper>
  );
}

function SkillCell({
  onCellClick,
  onSkillSelected,
  skill,
  showSkillPicker,
  availableSkills,
}: {
  onCellClick: () => void;
  onSkillSelected: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    skill: Skill | null,
  ) => void;
  skill: Skill | null;
  showSkillPicker: boolean;
  availableSkills: Skill[];
}) {
  const t = useTranslations('characters');

  return (
    <Styled.CellWrapper>
      <Styled.Cell
        onClick={onCellClick}
        isFilled={Boolean(skill)}
        hasShowPickerOpen={showSkillPicker}
      >
        {skill?.key ? t(`skills.${skill.key}`) : t('character-editor.form.labels.select-skill')}
      </Styled.Cell>
      {showSkillPicker && (
        <Styled.SkillPicker>
          {availableSkills.map((skill) => (
            <Styled.SkillOption key={skill.id} onClick={(e) => onSkillSelected(e, skill)}>
              <Styled.SkillLabel size="sm">{t(`skills.${skill.key}`)}</Styled.SkillLabel>
              <Styled.SkillDescription size="xs">
                {t(`skills.${skill.key}-description`)}
              </Styled.SkillDescription>
            </Styled.SkillOption>
          ))}
          {skill !== null && (
            <Styled.SkillOption onClick={(e) => onSkillSelected(e, null)}>
              <Styled.SkillLabel size="xs">
                {t('character-editor.form.labels.reset')}
              </Styled.SkillLabel>
            </Styled.SkillOption>
          )}
        </Styled.SkillPicker>
      )}
    </Styled.CellWrapper>
  );
}
