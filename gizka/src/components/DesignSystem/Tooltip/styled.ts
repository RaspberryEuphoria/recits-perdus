import styled from 'styled-components';

export const Tooltip = styled.div`
  > :first-child {
    position: relative;

    &::after {
      border-bottom: 2px dotted currentColor;
      bottom: -5px;
      content: '';
      width: 100%;
      height: 3px;
      left: 0;
      position: absolute;
    }
  }

  &:hover {
    > :first-child {
      color: var(--flashy);
    }
  }
`;

export const Content = styled.div`
  background: var(--dark);
  border: 2px solid var(--flashy);
  border-radius: 5px;
  color: var(--light);
  max-width: 300px;
  padding: var(--space-1);
  position: fixed;
  z-index: 1000;

  &::after {
    // triangle
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid var(--flashy);
    content: '';
    position: absolute;
    top: -10px;
    left: 10px;
  }
`;
