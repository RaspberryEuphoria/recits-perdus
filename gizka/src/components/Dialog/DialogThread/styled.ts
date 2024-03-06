import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const DialogThread = styled.div`
  position: relative;
  padding: var(--space-2);
  white-space: pre-line;
`;

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

export const SmallTextarea = styled.div`
  color: var(--light-08);
  font-size: 1.4rem;
  font-family: 'Oxanium';

  &:hover {
    text-shadow: 0 0 0.5rem var(--flashy);
  }

  &:not(:disabled) {
    cursor: pointer;
  }
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
