import styled from 'styled-components';

export const MoveOutcome = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  font-size: 1.2rem;
  position: relative;
`;

export const MoveResult = styled.div`
  align-items: center;
  display: flex;
  gap: var(--space-05);
`;

export const MoveScore = styled.div<{ color: string }>`
  align-items: center;
  border: 3px dashed ${(props) => props.color};
  border-radius: 1rem;
  color: ${(props) => props.color};
  display: flex;
  font-family: 'Philosopher';
  font-size: 2rem;
  font-weight: bold;
  height: 65px;
  justify-content: center;
  margin-right: var(--space-1);
  width: 65px;
`;

export const DestinyScore = styled.span`
  top: 0;
  right: 0;
  color: var(--malus);
  font-family: 'Philosopher';
  font-weight: bold;
  height: 65px;
  position: absolute;
  height: auto;
`;

export const CharacterName = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: bold;
`;

export const Move = styled.span`
  color: var(--move);
  font-style: italic;
  text-shadow: var(--shadow);
`;
