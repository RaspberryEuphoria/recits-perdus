import { Character } from '@/utils/types/character';
import { Scenario } from '@/utils/types/scenario';

import * as Styled from './styled';

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
            Avec {getCharactersList(scenario.characters)}
          </Styled.CharactersList>
          <Styled.CharactersCount></Styled.CharactersCount>
        </Styled.Scenario>
      ))}
    </Styled.ScenariosList>
  );
}

function getCharactersList(characters: Character[]) {
  const charactersNames = characters.map((character) => character.name);

  if (characters.length === 1) {
    return charactersNames[0];
  }

  if (characters.length === 2) {
    return charactersNames.join(' et ');
  }

  return `${charactersNames.slice(0, -1).join(', ')} et ${charactersNames.slice(-1)}`;
}
