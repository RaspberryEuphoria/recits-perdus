import styled from 'styled-components';

export const Row = styled.div<{
  gap?: '05' | '1' | '2';
  space?: '05' | '1' | '2';
  justify?: 'start' | 'center' | 'end';
  align?: 'start' | 'center' | 'end';
}>`
  display: flex;

  ${({ gap }) => gap && `gap: var(--space-${gap});`}
  ${({ space }) => space && `margin: var(--space-${space}) 0;`}
  ${({ justify }) => justify && `justify-content: ${justify};`}
  ${({ align }) => align && `align-items: ${align};`}
`;
