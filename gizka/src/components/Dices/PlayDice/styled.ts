import styled from 'styled-components';

export const Dice = styled.div<{ isActive: boolean; isDraggable: boolean }>`
  display: flex;
  width: 5rem;
  height: 5rem;
  border: 1px solid var(--${(props) => (props.isActive ? 'dice' : 'light')});
  align-items: center;
  justify-content: center;
  color: var(--dark);
  font-size: 2rem;
  cursor: ${(props) => (props.isDraggable ? 'grab' : 'default')};

  div {
    display: flex;
    width: 3rem;
    height: 3rem;
    background: var(--dice);
    align-items: center;
    justify-content: center;
  }
`;
