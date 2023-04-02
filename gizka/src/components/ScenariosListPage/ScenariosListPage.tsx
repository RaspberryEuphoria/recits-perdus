import { Character } from '@/utils/types/character';
import { Scenario } from '@/utils/types/scenario';

import * as Styled from './styled';
import { getCharactersList } from '@/utils/character/helpers';

type ScenariosListPageProps = {
  scenarios: Scenario[];
};

export function ScenariosListPage({ scenarios }: ScenariosListPageProps) {
  return (
    <Styled.ScenariosList>
      {scenarios.map((scenario) => (
        <Styled.Scenario
          key={scenario.id}
          background={scenario.thumbnail}
          href={`/scenarios/en-cours/${scenario.id}-${scenario.safeTitle}`}
        >
          <Styled.ScenarioLabel>{scenario.title} </Styled.ScenarioLabel>
          <Styled.ScenarioDescription>
            {scenario.location}, {scenario.era}
          </Styled.ScenarioDescription>
          <Styled.CharactersList>
            Avec {getCharactersList({ characters: scenario.characters })}
          </Styled.CharactersList>
          <Styled.CharactersCount></Styled.CharactersCount>
        </Styled.Scenario>
      ))}
    </Styled.ScenariosList>
  );
}
