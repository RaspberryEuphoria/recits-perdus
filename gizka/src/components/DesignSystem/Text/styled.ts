import styled from 'styled-components';

import { TextSize } from './Text';

export const Text = styled.p<{ size: TextSize }>`
  font-size: ${({ size }) => {
    switch (size) {
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

  line-height: ${({ size }) => {
    switch (size) {
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
