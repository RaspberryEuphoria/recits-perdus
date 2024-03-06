import styled from 'styled-components';

export const Prompt = styled.span<{ stat?: string }>`
  align-items: center;
  color: ${({ stat }) => (stat ? `var(--${stat})` : `var(--flashy)`)};
  display: flex;
  font-style: italic;
  gap: var(--space-05);
  margin-top: 1rem;
  text-shadow: var(--shadow);

  svg {
    fill: currentColor;
    height: 30px;
    width: 30px;
  }

  label {
    cursor: pointer;
  }
`;
