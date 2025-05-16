import styled from 'styled-components';

import { TextAlign, TextSize } from './Text';

export const Text = styled.p<{
  size: TextSize;
  textAlign?: TextAlign;
  color?: string;
  fontStyle?: 'italic';
}>`
  ${({ color }) => color && `color: ${color || 'var(--light)'};`}
  text-align: ${({ textAlign }) => textAlign};

  white-space: pre-line;

  font-size: ${({ size }) => {
    switch (size) {
      case 'xs':
        return '0.8rem';
      case 'sm':
        return '1rem';
      case 'md':
        return '1.4rem';
      case 'lg':
        return '1.8rem';
      case 'xl':
        return '2.5rem';
    }
  }};

  ${({ fontStyle }) => fontStyle && `font-style: ${fontStyle};`}

  line-height: ${({ size }) => {
    switch (size) {
      case 'xs':
        return '1.2rem';
      case 'sm':
        return '1.5rem';
      case 'md':
        return '2rem';
      case 'lg':
        return '2.5rem';
      case 'xl':
        return '3rem';
    }
  }};
`;
