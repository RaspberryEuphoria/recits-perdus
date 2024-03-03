import Image from 'next/image';
import styled from 'styled-components';

import ChallengeFailed from '@/public/images/icons/challenge_failed.png';
import ChallengeSucceded from '@/public/images/icons/challenge_succeeded.png';
import D10Icon from '@/public/images/icons/d10.png';

export const DialogPost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 4rem 0;
  line-height: 2rem;
  font-size: 1.4rem;
  font-family: 'Kontrapunkt-Light';

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
  text-shadow: 0 0 3px var(--primary), 1px 1px 3px var(--primary);

  & strong {
    color: ${({ color }) => color};
  }

  & bold {
    font-weight: bold;
  }
`;

export const MoveOutcome = styled.div`
  background: var(--secondary);
  border-radius: var(--rounded);
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  padding: var(--space-05) var(--space-1);
`;

export const MoveName = styled.span`
  color: var(--flashy);
  font-style: italic;
  text-shadow: 2px 2px 2px var(--dark);
`;

export const MoveResult = styled.div`
  align-items: center;
  display: flex;
  gap: var(--space-05);
`;

export const MoveScore = styled.div<{ color: string }>`
  align-items: center;
  border: 3px dashed ${(props) => props.color};
  border-radius: 1rem;
  color: ${(props) => props.color};
  display: flex;
  font-family: 'Kontrapunkt-Bold';
  font-size: 2rem;
  font-weight: bold;
  height: 65px;
  justify-content: center;
  margin-right: var(--space-1);
  width: 65px;
`;

export const ChallengeDie = styled.div`
  align-items: start;
  background: url('${D10Icon.src}');
  background-size: cover;
  color: var(--dark);
  display: flex;
  font-family: 'Kontrapunkt-Bold';
  font-size: 1.6rem;
  font-weight: bold;
  justify-content: center;
  padding-top: 10px;
  position: relative;
  height: 88px;
  width: 83px;
`;

export const ChallengeResult = styled.div<{ isSucces: boolean }>`
  background: url('${({ isSucces }) => (isSucces ? ChallengeSucceded.src : ChallengeFailed.src)}');
  background-size: cover;
  bottom: 0;
  position: absolute;
  height: 40px;
  right: 0;
  width: 35px;
`;

export const D20 = styled.span`
  display: flex;
  align-items: center;
`;
