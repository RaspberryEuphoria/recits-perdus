import styled from 'styled-components';

export const Row = styled.div<{
  display?: 'flex' | 'grid';
  gridRepeat?: number;
  gap?: '05' | '1' | '2';
  space?: '05' | '1' | '2';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'flex-end' | 'flex-start';
  align?: 'start' | 'center' | 'end';
  direction?: 'row' | 'column';
  flexWrap?: 'wrap' | 'nowrap';
}>`
  display: ${({ display }) => display || 'flex'};
  flex-direction: ${({ direction }) => direction || 'row'};
  ${({ display, gridRepeat }) =>
    display === 'grid' && `grid-template-columns: repeat(${gridRepeat || 3}, 1fr);`}

  ${({ gap }) => gap && `gap: var(--space-${gap});`}
  ${({ space }) => space && `margin: var(--space-${space}) 0;`}
  ${({ justify }) => justify && `justify-content: ${justify};`}
  ${({ align }) => align && `align-items: ${align};`}
  ${({ flexWrap }) => flexWrap && `flex-wrap: ${flexWrap};`}
`;
