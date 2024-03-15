import styled from 'styled-components';

import { Text } from '@/components/DesignSystem/Text';

export const Category = styled(Text)`
  color: var(--move);
  font-family: 'Exo 2';
  text-transform: uppercase;
  font-style: italic;
`;

export const MovesList = styled.div`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

export const MoveItem = styled.div<{ isDisabled: boolean }>`
  align-items: center;
  background: var(--secondary);
  border: 1px solid var(--light-05);
  border-radius: 0.258rem;
  color: var(--light);
  cursor: pointer;
  display: flex;
  padding: var(--space-05) var(--space-1);
  min-height: var(--space-2);
  font-weight: bold;

  ${({ isDisabled }) =>
    isDisabled
      ? `
          color: var(--light-05);
          cursor: not-allowed;
        `
      : `
          &:hover {
            color: var(--flashy);
            border-color: var(--flashy);
        }`}
`;

export const Paragraph = styled.p`
  margin-top: 1rem;
`;
