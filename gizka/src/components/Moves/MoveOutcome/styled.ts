import styled from 'styled-components';

import ChallengeFailed from '@/public/images/icons/challenge_failed.png';
import ChallengeSucceded from '@/public/images/icons/challenge_succeeded.png';
import D10Icon from '@/public/images/icons/d10.png';

export const MoveOutcome = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  font-size: 1.2rem;
  position: relative;
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
  font-family: 'Oxanium';
  font-size: 2rem;
  font-weight: bold;
  height: 65px;
  justify-content: center;
  margin-right: var(--space-1);
  width: 65px;
`;

export const DestinyScore = styled.span`
  top: 0;
  right: 0;
  color: var(--malus);
  font-family: 'Oxanium';
  font-weight: bold;
  height: 65px;
  position: absolute;
  height: auto;
`;

export const ChallengeDie = styled.div`
  align-items: start;
  background: url('${D10Icon.src}');
  background-size: cover;
  color: var(--dark);
  display: flex;
  font-family: 'Oxanium';
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

export const CharacterName = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: bold;
`;

export const Move = styled.span`
  color: var(--move);
  font-style: italic;
  text-shadow: var(--shadow);
`;
