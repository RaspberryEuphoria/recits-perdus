import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { CharacterAvatar } from '@/components/CharacterAvatar';
import { Text } from '@/components/DesignSystem/Text';
import { getSafeName } from '@/utils/character/helpers';
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
  const router = useRouter();
  const charactersInActiveScenario = useMemo(
    () => characters.filter(hasActiveScenario),
    [characters],
  );
  const charactersNotInActiveScenario = useMemo(
    () => characters.filter((c) => !hasActiveScenario(c)),
    [characters],
  );

  const selectCharacter = (character: Character) => {
    router.push(`/mes-personnages/${character.id}-${getSafeName(character)}`);
  };

  return (
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
          <Styled.Row>
            {charactersNotInActiveScenario.map((character) => (
              <Styled.CharacterPreview key={character.id}>
                <CharacterAvatar
                  character={character}
                  handleClick={() => selectCharacter(character)}
                />
              </Styled.CharacterPreview>
            ))}
          </Styled.Row>
        </section>
      )}
    </Styled.UserCharacterList>
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
