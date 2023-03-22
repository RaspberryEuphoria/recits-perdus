import styled, { css } from 'styled-components';

export const Button = styled.button<{ width?: string; outline?: boolean }>`
  width: ${(props) => (props.width ? props.width : 'auto')};
  padding: var(--space-05) var(--space-2);
  background: var(--flashy);
  border: 2px solid;
  border-color: transparent;
  outline: none;
  text-transform: uppercase;
  font-family: 'Kontrapunkt-Bold';
  font-size: 1.4rem;

  ${(props) =>
    props.outline &&
    css`
      background: transparent;
      border-color: var(--flashy);
      color: var(--flashy);
    `}

  &:hover {
    cursor: pointer;
    animation: pulse 1s;
    box-shadow: 0 0 0 0.5em transparent;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--flashy-alt);
    }
  }
`;
