import styled from 'styled-components';

export const Keyword = styled.span<{ stat: string }>`
  color: var(--${(props) => props.stat});

  ${({ stat }) => {
    if (stat === 'move') {
      return `
        font-style: italic;
        text-shadow: var(--shadow);
      `;
    } else {
      return `
        font-weight: bold;
        text-transform: lowercase;
      `;
    }
  }}
`;
