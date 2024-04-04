import styled from 'styled-components';

import { TextColor } from '@/utils/constants';

export const ColorPicker = styled.div`
  display: flex;
  color: var(--light);
  width: 100%;
  gap: var(--space-05);
`;

export const Color = styled.label`
  background: currentColor;
  border-radius: 50%;
  cursor: pointer;
  height: 30px;
  opacity: 0.6;
  transition: opacity 0.2s ease-in-out, border-radius 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  width: 30px;

  &:hover {
    box-shadow: 0 0 15px currentColor;
    opacity: 1;
  }
`;

export const Option = styled.div<{
  color: TextColor;
}>`
  color: ${(props) => props.color};
  display: flex;
  gap: var(--space-05);
  height: 30px;
  width: 30px;
  position: relative;

  input:checked ~ ${Color} {
    box-shadow: 0 0 15px currentColor;
    border-radius: var(--rounded);
    opacity: 1;
  }
`;
