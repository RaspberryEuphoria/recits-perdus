import styled, { css } from 'styled-components';

export const Button = styled.button<{
  width?: string;
  outline?: boolean;
  variant?: 'small';
  isLoading?: boolean;
}>`
  align-items: center;
  background: var(--flashy);
  border-radius: var(--rounded);
  border: 2px solid;
  border-color: transparent;
  color: var(--dark);
  display: flex;
  font-family: 'Oxanium';
  font-size: 1.4rem;
  gap: var(--space-1);
  outline: none;
  padding: var(--space-05) var(--space-2);
  text-transform: uppercase;
  transition: background 0.3s ease-in;
  width: ${(props) => (props.width ? props.width : 'auto')};

  svg {
    width: 25px;
    height: 25px;
  }

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
      font-size: 1.2rem;
      gap: var(--space-05);
      padding: var(--space-05) var(--space-1);
      text-transform: none;
    `}

${(props) =>
    props.isLoading &&
    css`
      svg {
        animation: spin 1s linear infinite;
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

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
