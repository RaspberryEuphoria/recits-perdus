import Image from 'next/image';
import { useContext, useMemo } from 'react';

import { UserContext } from '@/contexts/user';
import { useCharactersByUser } from '@/hooks/useCharacters';
import { getCharactersList } from '@/utils/character/helpers';
import { Character } from '@/utils/types/character';
import { Scenario } from '@/utils/types/scenario';

import * as Styled from './styled';

type ScenariosListPageProps = {
  scenarios: Scenario[];
  linkPrefix: string;
};

export function ScenariosListPage({ scenarios, linkPrefix }: ScenariosListPageProps) {
  const { currentUser } = useContext(UserContext);
  const { characters } = useCharactersByUser(currentUser?.id);

  const charactersByScenario = useMemo(() => {
    return characters.reduce((acc, character) => {
      if (!character.scenario) return acc;

      character.scenario.forEach((characterScenario) => {
        if (!acc[characterScenario.scenario.id]) {
          acc[characterScenario.scenario.id] = [];
        }

        acc[characterScenario.scenario.id].push(character);
      });

      return acc;
    }, {} as Record<number, Array<Character>>);
  }, [characters]);

  return (
    <Styled.ScenariosList>
      {scenarios.map((scenario) => (
        <Styled.Scenario
          key={scenario.id}
          background={scenario.thumbnail || ''}
          href={`/${linkPrefix}/${scenario.id}-${scenario.safeTitle}`}
        >
          <Styled.ScenarioLabel>{scenario.title} </Styled.ScenarioLabel>
          <Styled.ScenarioDescription>
            {scenario.location}, {scenario.era}
          </Styled.ScenarioDescription>
          <Styled.CharactersList>
            Avec {getCharactersList({ characters: scenario.characters })}
          </Styled.CharactersList>
          <Styled.CharactersCount></Styled.CharactersCount>
          {charactersByScenario[scenario.id]?.length > 0 &&
            charactersByScenario[scenario.id][0].avatar && (
              <Styled.MiniAvatar color={charactersByScenario[scenario.id][0].textColor}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/users/avatars/${
                    charactersByScenario[scenario.id][0].avatar
                  }`}
                  alt="Avatar"
                  width={40}
                  height={46}
                  quality={100}
                />
              </Styled.MiniAvatar>
            )}
        </Styled.Scenario>
      ))}
    </Styled.ScenariosList>
  );
}
