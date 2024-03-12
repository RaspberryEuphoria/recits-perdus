import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { CharacterAvatar } from '@/components/CharacterAvatar';
import { CharacterSheet } from '@/components/CharacterSheet';
import { Text } from '@/components/DesignSystem/Text';
import { Character, CharacterInActiveScenario } from '@/utils/types/character';
import { Scenario, ScenarioStatus } from '@/utils/types/scenario';

import * as Styled from './styled';

type UserCharacterListProps = {
  characters: Character[];
};

function hasActiveScenario(character: Character): character is CharacterInActiveScenario {
  return Boolean(
    character.characterScenario &&
      character.characterScenario.scenario.status === ScenarioStatus.IN_PROGRESS,
  );
}

export function UserCharacterList({ characters }: UserCharacterListProps) {
  const t = useTranslations('characters');
  const [character, setCharacter] = useState<Character | null>();
  const charactersInActiveScenario = useMemo(
    () => characters.filter(hasActiveScenario),
    [characters],
  );
  const charactersNotInActiveScenario = useMemo(
    () => characters.filter((c) => !hasActiveScenario(c)),
    [characters],
  );

  const selectCharacter = (character: Character) => {
    setCharacter(character);
  };

  const closeCharacterSheet = () => {
    setCharacter(null);
  };

  if (character) {
    return <CharacterSheet character={character} handleBackClick={closeCharacterSheet} />;
  }

  return (
    <>
      <Styled.UserCharacterList>
        {charactersInActiveScenario.length > 0 && (
          <section>
            <Text as="h1">{t('my-characters.sections.in-progress.title')}</Text>
            <Styled.Row>
              {charactersInActiveScenario.map((character) => (
                <Styled.CharacterPreview key={character.id}>
                  <CharacterAvatar
                    character={character}
                    handleClick={() => selectCharacter(character)}
                  />
                  <CharacterScenario scenario={character.characterScenario.scenario} />
                </Styled.CharacterPreview>
              ))}
            </Styled.Row>
          </section>
        )}

        {charactersNotInActiveScenario.length > 0 && (
          <section>
            <Text as="h1">{t('my-characters.sections.reserve.title')}</Text>
            {charactersNotInActiveScenario.map((character) => (
              <Styled.CharacterPreview key={character.id}>
                <CharacterAvatar
                  character={character}
                  handleClick={() => selectCharacter(character)}
                />
              </Styled.CharacterPreview>
            ))}
          </section>
        )}
      </Styled.UserCharacterList>
    </>
  );
}

function CharacterScenario({ scenario }: { scenario: Scenario }) {
  return (
    <Text size="sm">
      <Styled.Scenario href={`/scenarios/en-cours/${scenario.id}-${scenario.safeTitle}`}>
        {scenario.title}
      </Styled.Scenario>
    </Text>
  );
}
