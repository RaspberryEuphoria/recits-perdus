import styled from 'styled-components';

export const Keyword = styled.span<{ stat: string }>`
  align-items: center;
  color: var(--${(props) => props.stat});
  display: inline-flex;
  gap: var(--space-05);

  svg {
    width: 25px;
    height: 25px;
    fill: currentColor;
  }

  ${({ stat }) => {
    if (stat === 'move') {
      return `
        font-style: italic;
        text-shadow: var(--shadow);
      `;
    } else {
      return `
        font-weight: bold;
      `;
    }
  }}
`;
