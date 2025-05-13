import Link from 'next/link';
import styled from 'styled-components';

export const UserCharacterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
`;

export const CharacterPreview = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1 0 21%;
  align-items: center;
  gap: var(--space-1);

  a {
    text-decoration: none;
  }

  p {
    max-width: 200px;
    text-align: center;
  }
`;

export const Scenario = styled(Link)``;

export const YourTurn = styled.span<{ color: string }>`
  display: block;
  color: ${({ color }) => color};
  font-style: italic;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 0 5px ${({ color }) => color};
`;
