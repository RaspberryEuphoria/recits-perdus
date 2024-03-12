import styled from 'styled-components';

export const Footer = styled.footer`
  align-self: flex-start;
  align-items: center;
  background: var(--dark);
  border: none;
  border-top: 1px solid var(--flashy);
  justify-content: space-between;
  bottom: 0;
  display: flex;
  position: sticky;
  height: 5rem;
  padding: var(--space-1);
  width: 100%;
`;

export const SmallTextarea = styled.div<{ isDisabled: boolean }>`
  color: var(--light-08);
  font-size: 1.4rem;
  font-family: 'Oxanium';

  &:hover {
    text-shadow: 0 0 0.5rem var(--flashy);
  }

  ${({ isDisabled }) =>
    isDisabled
      ? `
        pointer-events: none;
      `
      : `
        cursor: pointer;
      `}
`;

export const ArrowButton = styled.div`
  background: var(--primary-alt);
  border-radius: 50%;
  color: var(--flashy);
  cursor: pointer;
  height: 30px;
  width: 30px;

  svg {
    width: 100%;
    height: 100%;
  }
`;
