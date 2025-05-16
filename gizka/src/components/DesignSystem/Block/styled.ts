import styled from 'styled-components';

import { TextColor } from '@/utils/constants';

export const Block = styled.div<{ color?: TextColor }>`
  background: var(--dark);
  border: 1px solid ${({ color }) => color || 'var(--flashy)'};
  padding: var(--space-05);
`;
