import { Media } from '@/utils/constants';

import styled from 'styled-components';

export const ScenarioResources = styled.div`
  align-items: center;
  background: var(--dark);
  border: 1px solid var(--flashy);
  display: flex;
  font-size: 1.5rem;
  gap: var(--space-05);
  padding: var(--space-1);
  margin: 1rem auto;

  strong {
    color: var(--supplies);
  }

  svg {
    fill: var(--supplies);
    height: 25px;
    width: 25px;
  }

  @media (max-width: ${Media.lg}) {
    font-size: 1rem;
  }
`;

export const Label = styled.span`
  align-items: center;
  display: flex;
`;
