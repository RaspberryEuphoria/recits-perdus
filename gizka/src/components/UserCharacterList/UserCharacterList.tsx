import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { DetailedPicture } from '@/components/DesignSystem/DetailedPicture';
import { Text } from '@/components/DesignSystem/Text';
import { getSafeName } from '@/utils/character/helpers';
import { Character, CharacterInActiveScenario } from '@/utils/types/character';
import { ScenarioStatus } from '@/utils/types/scenario';

import * as Styled from './styled';

type UserCharacterListProps = {
  characters: Character[];
};

const AVATAR_SRC_PREFIX = `${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/users/avatars`;

function hasActiveScenario(character: Character): character is CharacterInActiveScenario {
  return Boolean(
    character.characterScenario &&
      character.characterScenario.scenario.status === ScenarioStatus.IN_PROGRESS,
  );
}

export function UserCharacterList({ characters }: UserCharacterListProps) {
  const t = useTranslations('characters');
  const charactersInActiveScenario = useMemo(
    () => characters.filter(hasActiveScenario),
    [characters],
  );
  const charactersNotInActiveScenario = useMemo(
    () => characters.filter((c) => !hasActiveScenario(c)),
    [characters],
  );

  return (
    <Styled.UserCharacterList>
      {charactersInActiveScenario.length > 0 && (
        <section>
          <Text as="h1">{t('my-characters.sections.in-progress.title')}</Text>
          <Styled.Row>
            {charactersInActiveScenario.map((character) => (
              <DetailedPicture
                key={character.id}
                title={character.firstName}
                subTitle={character.characterScenario.scenario.title}
                textColor={character.textColor}
                imageSrc={`${AVATAR_SRC_PREFIX}/${character.avatar}`}
                imageLinkHref={`/mes-personnages/${character.id}-${getSafeName(character)}`}
                subTitleLinkHref={`/scenarios/en-cours/${character.characterScenario.scenario.id}-${character.characterScenario.scenario.safeTitle}`}
                displayPill={character.characterScenario.isNextPoster}
              />
            ))}
          </Styled.Row>
        </section>
      )}

      {charactersNotInActiveScenario.length > 0 && (
        <section>
          <Text as="h1">{t('my-characters.sections.reserve.title')}</Text>
          <Styled.Row>
            {charactersNotInActiveScenario.map((character) => (
              <DetailedPicture
                key={character.id}
                title={character.firstName}
                textColor={character.textColor}
                imageSrc={`${AVATAR_SRC_PREFIX}/${character.avatar}`}
                imageLinkHref={`/mes-personnages/${character.id}-${getSafeName(character)}`}
              />
            ))}
          </Styled.Row>
        </section>
      )}
    </Styled.UserCharacterList>
  );
}
