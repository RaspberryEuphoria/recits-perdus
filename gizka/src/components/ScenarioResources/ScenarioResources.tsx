import SuppliesIcon from '@/public/images/icons/supplies.svg';

import * as Styled from './styled';

type ScenarioResourcesProps = {
  supplies: number;
};

export function ScenarioResources({ supplies }: ScenarioResourcesProps) {
  return (
    <Styled.ScenarioResources>
      <SuppliesIcon />
      <strong>{supplies}</strong> Provisions
    </Styled.ScenarioResources>
  );
}
