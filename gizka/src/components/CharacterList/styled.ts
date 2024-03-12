import styled from 'styled-components';

import { Media } from '@/utils/constants';

export const CharacterList = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  margin: auto;
  width: 100%;
`;

export const CharacterPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  width: 204px; // 200 + border
  max-width: 20%;
`;

export const Stats = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  gap: var(--space-05);

  @media (max-width: ${Media.lg}) {
    font-size: 1rem;
    gap: 0;
  }
`;

export const Stat = styled.div<{ color: string }>`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: var(--space-05);

  strong {
    color: ${({ color }) => color};
  }

  svg {
    width: 25px;
    height: 25px;
    fill: ${({ color }) => color};
  }
`;
