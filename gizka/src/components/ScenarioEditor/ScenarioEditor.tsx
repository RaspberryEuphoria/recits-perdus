import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { Button } from '@/components/DesignSystem/Button';
import { Form } from '@/components/DesignSystem/Form';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { TextColor } from '@/utils/constants';
import { Character } from '@/utils/types/character';
import { Scenario } from '@/utils/types/scenario';

import * as Styled from './styled';

type ScenarioEditorProps = {
  scenario?: Scenario;
  availableCharacters: Array<Character>;
  unavailableCharacters: Array<Character>;
  onScenarioSaved: (scenario: Scenario) => void;
};

type CreateScenarioPayload = {
  title: string;
  era: string;
  location: string;
  characterId: number;
  textColor: string;
  introduction: string;
};

export function ScenarioEditor({
  scenario,
  availableCharacters = [],
  unavailableCharacters = [],
  onScenarioSaved,
}: ScenarioEditorProps) {
  const t = useTranslations('scenarios');
  const [isLoading, setIsLoading] = useState(false);

  const inputs = useMemo(() => {
    return [
      {
        name: 'title',
        type: 'text' as const,
        label: t('creer.form.labels.title'),
        defaultValue: scenario?.title,
        mandatory: true,
      },
      {
        name: 'era',
        label: t('creer.form.labels.era'),
        type: 'select' as const,
        defaultValue: scenario?.era,
        mandatory: true,
        options: [
          { label: "L'Ancienne République", value: "L'Ancienne République" },
          { label: 'La Chute de la République', value: 'La Chute de la République' },
          { label: 'Guerre Civile Galactique', value: 'Guerre Civile Galactique' },
          { label: 'Nouvelle République', value: 'Nouvelle République' },
        ],
      },
      {
        name: 'location',
        label: t('creer.form.labels.location'),
        type: 'text' as const,
        defaultValue: scenario?.location,
        mandatory: true,
      },
      {
        name: 'characterId',
        label: t('creer.form.labels.character'),
        type: 'select' as const,
        // defaultValue: scenario?.character,
        options: [
          ...availableCharacters.map((character) => ({
            value: character.id,
            label: `${character.firstName} ${character.lastName}`,
          })),
          ...unavailableCharacters.map((character) => ({
            value: character.id,
            label: `${character.firstName} ${character.lastName} ${t(
              'creer.form.character-unavailable',
              {
                title: character.characterScenario?.scenario.title,
              },
            )}`,
            isDisabled: true,
          })),
        ],
        mandatory: true,
      },
      {
        name: 'textColor',
        label: t('creer.form.labels.text-color'),
        type: 'color-picker' as const,
        // defaultValue: scenario?.character,
        options: [
          {
            value: TextColor.Red,
          },
          {
            value: TextColor.Blue,
          },
          {
            value: TextColor.Orange,
          },
          {
            value: TextColor.Green,
          },
          {
            value: TextColor.Grey,
          },
          {
            value: TextColor.Purple,
          },
        ],
        mandatory: true,
      },
      {
        name: 'introduction',
        label: t('creer.form.labels.introduction'),
        help: t.raw('creer.form.help.introduction'),
        type: 'textarea' as const,
        defaultValue: scenario?.introduction,
        value: t('creer.form.labels.introduction'),
        mandatory: true,
      },
    ];
  }, [
    availableCharacters,
    unavailableCharacters,
    scenario?.era,
    scenario?.introduction,
    scenario?.location,
    scenario?.title,
    t,
  ]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = inputs.reduce(
      (acc, input) => {
        return { ...acc, [input.name]: e.currentTarget[input.name].value };
      },
      { title: '', era: '', location: '', characterId: 0, textColor: '', introduction: '' },
    );

    await createScenario(payload);
  };

  const createScenario = async ({
    title,
    era,
    location,
    characterId,
    textColor,
    introduction,
  }: CreateScenarioPayload) => {
    const isFormFilled = [title, era, location, characterId, textColor, introduction].every(
      (value) => value,
    );

    if (!isFormFilled || isLoading) return;

    setIsLoading(true);

    const newScenario = await httpBffClient.post<Scenario>(`/scenario`, {
      title,
      era,
      location,
      characterId,
      textColor,
      introduction,
    });

    if (isHttpError(newScenario)) {
      console.error(`There was an error while creating scenario: ${newScenario.message}`);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    onScenarioSaved(newScenario);
  };

  return (
    <Styled.ScenarioEditor>
      <Form
        onSubmit={submitForm}
        inputs={inputs}
        submitButton={
          <Button isLoading={isLoading} disabled={isLoading}>
            {t(`creer.form.submit`)}
          </Button>
        }
      />
    </Styled.ScenarioEditor>
  );
}
