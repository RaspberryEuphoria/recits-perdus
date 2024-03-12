import styled from 'styled-components';

import { Media } from '@/utils/constants';

export const DialogThread = styled.div`
  padding: var(--space-2);
  white-space: pre-line;

  @media (max-width: ${Media.md}) {
    padding: 5px;
  }
`;
