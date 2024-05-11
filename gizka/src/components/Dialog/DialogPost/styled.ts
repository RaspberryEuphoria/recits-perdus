import Image from 'next/image';
import styled from 'styled-components';

import HoloEffect from '@/public/images/holo_effect.png';
import { MoveResult } from '@/utils/types/scenario';

export const DialogPost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 4rem 0;
  line-height: 2rem;
  font-size: 1.4rem;
  font-family: 'Philosopher';

  // This is the Introduction
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

export const DialogPostAuthor = styled.span`
  align-items: center;
  display: flex;
  font-style: italic;
  gap: var(--space-05);

  & svg {
    width: 25px;
    height: 25px;
  }
`;

export const DialogAvatar = styled(Image)<{ color: string }>`
  border: 1px solid ${({ color }) => color};
  width: 40px;
  height: 46px;
`;

export const DialogIllustrationContainer = styled.div`
  border: 1px solid var(--flashy);
  border-radius: var(--rounded);
  box-shadow: 0 0 10px var(--flashy), inset 0 0 10px var(--flashy);
  position: relative;

  &::after {
    background-image: url(${HoloEffect.src});
    content: '';
    display: block;
    height: 100%;
    left: 0;
    opacity: 0.1;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

export const DialogIllustration = styled(Image)`
  border-radius: var(--rounded);
  display: block;
  filter: grayscale(30%);
  height: auto;
  width: 100%;
`;

export const DialogPostContent = styled.p<{ color: string }>`
  text-shadow: 0 0 3px var(--primary), 1px 1px 3px var(--primary);

  & strong {
    color: ${({ color }) => color};
  }

  & bold {
    font-weight: bold;
  }
`;

export const CharacterName = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: bold;
`;

export const DialogMove = styled.div<{ result: MoveResult }>`
  background: var(--secondary);
  border-radius: var(--rounded);
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  padding: var(--space-05) var(--space-1);

  ${({ result }) => {
    switch (result) {
      case MoveResult.SUCCESS:
        return `
          box-shadow: 0 0 10px var(--success), inset 0 0 10px var(--success);
          border: 1px solid var(--success);
        `;
      case MoveResult.MIXED:
        return `
          box-shadow: 0 0 10px var(--mixed), inset 0 0 10px var(--mixed);
          border: 1px solid var(--mixed);
        `;
      case MoveResult.FAILURE:
        return `
          box-shadow: 0 0 10px var(--failure), inset 0 0 10px var(--failure);
          border: 1px solid var(--failure);
        `;
      default:
        return '';
    }
  }}
`;
