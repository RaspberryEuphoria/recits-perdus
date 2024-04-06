import styled from 'styled-components';

import { Media } from '@/utils/constants';

export const Introduction = styled.div`
  padding: var(--space-2);
  white-space: pre-line;

  @media (max-width: ${Media.md}) {
    padding: 5px;
  }
`;

export const Block = styled.div`
  background: var(--secondary);
  border-radius: var(--rounded);
  padding: var(--space-1);

  h1 {
    color: var(--flashy-alt);
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  justify-content: space-evenly;
  margin: 0 auto;
  width: 65%;
`;

export const Separator = styled.div`
  position: relative;
  width: 100%;
  margin: var(--space-2) 0;
  text-align: center;

  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    display: block;
    width: 25%;
    height: 1px;
    background-color: var(--flashy);
    transform: translateY(-50%);
  }

  &::before {
    left: 60%;
  }

  &::after {
    right: 60%;
  }
`;
