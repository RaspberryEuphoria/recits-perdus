'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { Form } from '@/components/DesignSystem/Form';
import { Text } from '@/components/DesignSystem/Text';
import { UserContext } from '@/contexts/user';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { getSafeName } from '@/utils/character/helpers';
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
  onCharacterSaved,
}: {
  onCharacterSaved: (id: number, safeName: string) => void;
}) {
  const t = useTranslations('characters');
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const skillsTableRef = useRef<HTMLDivElement>(null);

  const [characterSkills, setCharacterSkills] = useState<Array<Skill | null>>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [currentSkillCellIndex, setCurrentSkillCell] = useState<number | null>(null);

  const inputs = useMemo(
    () => [
      {
        name: 'firstname',
        type: 'text' as const,
        label: t('forms.labels.firstname'),
      },
      {
        name: 'lastName',
        label: t('forms.labels.lastname'),
        type: 'text' as const,
      },
      {
        name: 'age',
        label: t('forms.labels.age'),
        type: 'text' as const,
        onInput(event: React.FormEvent<HTMLInputElement>) {
          const target = event.target as HTMLInputElement;
          target.value = target.value.replace(/(\D)/g, '');
        },
      },
    ],
    [t],
  );

  const handleCellClick = (index: number) => {
    openSkillPicker(index);
  };

  const handleSkillSelected = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    skill: Skill | null,
  ) => {
    event.stopPropagation();

    if (currentSkillCellIndex !== null) {
      setCharacterSkills(characterSkills.with(currentSkillCellIndex, skill));
      setCurrentSkillCell(null);
    }
  };

  const openSkillPicker = (index: number) => {
    setCurrentSkillCell(index);
  };

  const createNewCharacter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstName = e.currentTarget.firstName.value;
    const lastName = e.currentTarget.lastName.value;
    const age = e.currentTarget.age.value;

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
      setIsLoading(false);
      return;
    }

    onCharacterSaved(newCharacter.id, getSafeName(newCharacter));
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

  if (isLoading) {
    return <Text>Création en cours...</Text>;
  }

  return (
    <Styled.FormWrapper>
      {}
      <Form onSubmit={createNewCharacter} inputs={inputs} submitButtonLabel="Nouveau personnage">
        <Text as="h2">{t('forms.labels.skills')}</Text>
        <Styled.SkillsTable ref={skillsTableRef}>
          <Styled.Column>
            <Styled.Cell>Exceptionnel (+3)</Styled.Cell>
            <Styled.Cell>Avancé (+2)</Styled.Cell>
            <Styled.Cell>Compétent (+1)</Styled.Cell>
          </Styled.Column>
          <Styled.Column>
            {[0, 1, 2].map((index) => (
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
            <Styled.Cell isHidden>row 1</Styled.Cell>
            {[3, 4].map((index) => (
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
          Les attributs sont utilisés lorsque votre personnage entreprend une action pénible,
          dangereuse ou périlleuse.
        </Styled.SkillHelp>
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
        {skill?.key ? t(`skills.${skill.key}`) : t('forms.labels.select-skill')}
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
              <Styled.SkillLabel size="xs">Réinitialiser</Styled.SkillLabel>
            </Styled.SkillOption>
          )}
        </Styled.SkillPicker>
      )}
    </Styled.CellWrapper>
  );
}
