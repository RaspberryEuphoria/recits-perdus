import styled from 'styled-components';

export const Row = styled.div<{ space?: '05' | '1' | '2'; justify?: 'start' | 'center' | 'end' }>`
  display: flex;

  ${({ justify }) => justify && `justify-content: ${justify};`}
  ${({ space }) => space && `margin: var(--space-${space}) 0;`}
`;
