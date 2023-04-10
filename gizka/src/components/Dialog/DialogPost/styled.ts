import Image from 'next/image';
import styled from 'styled-components';

export const DialogPost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 4rem 0;
  line-height: 2rem;
  font-size: 1.4rem;
  font-family: 'Kontrapunkt-Light';
  text-shadow: 0 0 3px var(--primary), 1px 1px 3px var(--primary);

  &:first-of-type {
    margin-top: 0;
    text-align: center;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const DialogInfos = styled.div`
  display: flex;
  align-items: center;
  margin-left: -1rem;
  gap: 0.5rem;
`;

export const DialogPostAuthor = styled.span<{ color: string }>`
  display: block;
  font-style: italic;
  font-weight: bold;
  color: ${({ color }) => color};
`;

export const DialogAvatar = styled(Image)<{ color: string }>`
  border: 1px solid ${({ color }) => color};
  width: 40px;
  height: 46px;
`;

export const DialogPostContent = styled.p<{ color: string }>`
  & strong {
    color: ${({ color }) => color};
  }
`;

const DiceBorderRadius = '5px';

export const DiceSkill = styled.div`
  display: inline-block;
  margin-right: auto;
  margin-left: 0;
  padding: 0 1rem;
  border-radius: ${DiceBorderRadius} ${DiceBorderRadius} 0 0;
`;

export const DiceValue = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 2px solid currentColor;
  border-radius: 0 ${DiceBorderRadius} 0 ${DiceBorderRadius};

  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--light);
  }
`;

export const DiceResult = styled.div`
  display: inline-block;
  margin-left: auto;
  margin-right: 0;
  padding: 0 1rem;
  border-radius: 0 0 ${DiceBorderRadius} ${DiceBorderRadius};
`;

export const Dice = styled.div<{ variant: 'success' | 'failure' }>`
  display: flex;
  flex-direction: column;
  color: var(--light);

  & ${DiceSkill}, & ${DiceResult} {
    background: ${({ variant }) =>
      variant === 'success' ? 'var(--success-05)' : 'var(--error-05)'};
  }

  & ${DiceValue} {
    border-color: ${({ variant }) =>
      variant === 'success' ? 'var(--success-05)' : 'var(--error-05)'};
  }
`;

export const D20 = styled.span`
  display: flex;
  align-items: center;
`;
