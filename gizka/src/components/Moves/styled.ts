import styled from 'styled-components';

export const MovesList = styled.div`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

export const MoveItem = styled.div`
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

  &:hover {
    color: var(--flashy);
    border-color: var(--flashy);
  }
`;

export const BurnMomentum = styled.div`
  align-items: center;
  color: var(--momentum);
  gap: var(--space-05);
  display: flex;

  svg {
    fill: currentColor;
    height: 25px;
    width: 25px;
  }
`;

export const Paragraph = styled.p`
  margin-top: 1rem;
`;
