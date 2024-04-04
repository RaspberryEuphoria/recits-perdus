import styled, { css } from 'styled-components';

import { Text } from '@/components/DesignSystem/Text';

export const FormWrapper = styled.div`
  padding: var(--space-1);

  h2 {
    align-self: flex-start;
    color: var(--flashy-alt);
  }
`;

export const SkillsTable = styled.div`
  align-items: center;
  display: flex;
  gap: var(--space-05);
  justify-content: space-between;
  width: 100%;
  padding: var(--space-05);
`;

export const CellWrapper = styled.div`
  display: inline-flex;
  position: relative;
  gap: var(--space-05);
`;

export const Cell = styled.div<{
  isHidden?: boolean;
  isFilled?: boolean;
  hasShowPickerOpen?: boolean;
}>`
  align-items: center;
  border-radius: var(--rounded);
  border: 2px dashed var(--flashy-alt);
  color: var(--flashy-alt);
  cursor: pointer;
  font-weight: bold;
  padding: var(--space-05);
  width: 100%;

  &:hover {
    border-style: solid;
  }

  ${({ hasShowPickerOpen }) =>
    hasShowPickerOpen &&
    css`
      border-style: solid;
    `}

  ${({ isHidden }) =>
    isHidden &&
    css`
      visibility: hidden;
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      background: var(--primary);
      border-style: solid;
    `}
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  text-align: center;
  width: 33%;

  &:first-of-type {
    width: 30%;
  }

  &:first-of-type ${Cell} {
    background: none;
    border: none;
    color: var(--light);
    cursor: default;
    font-weight: bold;
    padding-left: 0;
    text-align: right;
  }
`;

export const SkillHelp = styled(Text)`
  align-self: flex-start;
  background: var(--secondary);
  border-radius: var(--rounded);
  color: var(--flashy-alt);
  margin: var(--space-05) 0;
  font-family: 'Roboto';
  padding: var(--space-05);
`;

export const SkillPicker = styled.div`
  background: var(--dark);
  border-radius: var(--rounded);
  border: 2px solid var(--flashy-alt);
  left: 50%;
  position: absolute;
  top: calc(100% + var(--space-05));
  transform: translateX(-50%);
  width: 200%;
  z-index: 100;
`;

export const SkillOption = styled.div`
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
  color: var(--light);
  cursor: pointer;
  padding: var(--space-05);
  text-align: left;

  &:hover {
    background: var(--primary);
    border-color: var(--flashy-alt);
    color: var(--flashy-alt);
  }

  &:first-of-type {
    border-top: 1px solid var(--flashy-alt);
    border-radius: var(--rounded) var(--rounded) 0 0;
  }

  &:last-of-type {
    border-bottom: 0;
    border-radius: 0 0 var(--rounded) var(--rounded);
  }
`;

export const SkillLabel = styled(Text)`
  font-weight: bold;
`;

export const SkillDescription = styled(Text)`
  font-style: italic;
`;
