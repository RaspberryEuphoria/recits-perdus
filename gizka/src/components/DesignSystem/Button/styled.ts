import styled, { css } from 'styled-components';

export const Button = styled.button<{ width?: string; outline?: boolean; variant?: 'small' }>`
  background: var(--flashy);
  border: 2px solid;
  border-color: transparent;
  border-radius: var(--rounded);
  color: var(--dark);
  font-family: 'Oxanium';
  font-size: 1.4rem;
  outline: none;
  padding: var(--space-05) var(--space-2);
  text-transform: uppercase;
  width: ${(props) => (props.width ? props.width : 'auto')};
  transition: background 0.3s ease-in;

  ${(props) =>
    props.outline &&
    css`
      background: transparent;
      border-color: var(--flashy);
      color: var(--flashy);
    `}

  ${(props) =>
    props.variant === 'small' &&
    css`
      align-items: center;
      display: flex;
      font-size: 1.2rem;
      gap: var(--space-05);
      padding: var(--space-05) var(--space-1);
      text-transform: none;

      svg {
        width: 25px;
        height: 25px;
      }
    `}

  &:hover&:not(:disabled) {
    background: var(--flashy-08);
    cursor: pointer;
    animation: pulse 1s;
    box-shadow: 0 0 0 0.5em transparent;
  }

  &:disabled {
    color: var(--light-05);
    background: var(--dark);
    border-color: var(--light-05);
    cursor: not-allowed;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--flashy);
    }
  }
`;
