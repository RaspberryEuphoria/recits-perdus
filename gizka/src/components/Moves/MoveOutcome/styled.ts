import styled from 'styled-components';

export const MoveOutcome = styled.div``;

export const CharacterName = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: bold;
`;

export const MomentumBonus = styled.span`
  color: var(--momentum);
  font-weight: bold;
`;
