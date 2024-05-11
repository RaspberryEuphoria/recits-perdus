import styled, { css } from 'styled-components';

export const Border = styled.div<{
  width?: string;
  isDisabled?: boolean;
}>`
  border: 1px solid var(--flashy);
  border-radius: var(--rounded);
  width: ${(props) => (props.width ? props.width : 'auto')};
  padding: 3px;

  ${(props) =>
    props.isDisabled &&
    css`
      border-color: var(--light-05);
    `}
`;

export const Button = styled.button<{
  width?: string;
  outline?: boolean;
  variant?: 'small';
  isLoading?: boolean;
}>`
  align-self: flex-start;
  align-items: center;
  background: var(--flashy-05);
  border: 1px solid var(--flashy);
  border-radius: var(--rounded);
  color: var(--light);
  display: flex;
  font-family: 'Philosopher';
  font-size: 1.4rem;
  gap: var(--space-1);
  outline: none;
  padding: var(--space-05) var(--space-1);
  text-transform: uppercase;
  transition: background 0.3s ease-in;
  width: 100%;
  justify-content: center;

  svg {
    width: 25px;
    height: 25px;
  }

  ${(props) =>
    props.outline &&
    css`
      background: transparent;
      color: var(--flashy);
    `}

  ${(props) =>
    props.variant === 'small' &&
    css`
      font-size: 1.2rem;
      gap: var(--space-05);
      padding: var(--space-05);
      border: none;
      text-transform: none;
      font-size: 0.9rem;

      svg {
        width: 20px;
        height: 20px;
      }
    `}

${(props) =>
    props.isLoading &&
    css`
      svg {
        animation: spin 1s linear infinite;
      }
    `}

  &:hover&:not(:disabled) {
    background: var(--flashy);
    color: var(--dark);
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
