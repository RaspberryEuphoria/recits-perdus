import { Thread } from '@/utils/types/thread';

import * as Styled from './styled';

type ScenariosListPageProps = {
  scenarios: Thread[];
};

const planets = ['Ruusan', 'Dantooine', 'Coruscant', 'Ossus', 'Kamino', 'Corellia'];
const eras = [
  'Guerres Mandaloriennes',
  'Guerre des Clones',
  'Guerre Civile Galactique',
  'Legacy',
  'Guerre des Clones',
  'Guerres Mandaloriennes',
];

export function ScenariosListPage({ scenarios }: ScenariosListPageProps) {
  return (
    <Styled.ScenariosList>
      <Styled.List>
        {scenarios.map((scenario, i) => (
          <Styled.Scenario key={scenario.id} background={scenario.id + ''}>
            <Styled.ScenarioLabel>{scenario.title}</Styled.ScenarioLabel>
            <Styled.ScenarioDescription>
              {planets[i]}, {eras[i]}
            </Styled.ScenarioDescription>
          </Styled.Scenario>
        ))}
      </Styled.List>
    </Styled.ScenariosList>
  );
}
