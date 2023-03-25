import { Thread } from '@/utils/types/thread';

import * as Styled from './styled';

type ScenariosListPageProps = {
  scenarios: Thread[];
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
        </Styled.Scenario>
      ))}
    </Styled.ScenariosList>
  );
}
