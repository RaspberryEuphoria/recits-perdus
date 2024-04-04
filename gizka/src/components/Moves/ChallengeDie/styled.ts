import styled from 'styled-components';

import ChallengeBurnedIcon from '@/public/images/icons/challenge_burned.png';
import ChallengeFailedIcon from '@/public/images/icons/challenge_failed.png';
import ChallengeSuccededIcon from '@/public/images/icons/challenge_succeeded.png';
import D10Icon from '@/public/images/icons/d10.png';

export const ChallengeDie = styled.div`
  align-items: start;
  background: url('${D10Icon.src}');
  background-size: cover;
  color: var(--dark);
  display: flex;
  font-family: 'Philosopher';
  font-size: 1.4rem;
  font-weight: bold;
  justify-content: center;
  padding-top: 15px;
  position: relative;
  height: 88px;
  width: 83px;
`;

export const ChallengeResult = styled.div<{ isSucces: boolean; isSavedByBurn: boolean }>`
  background-size: cover;
  bottom: 0;
  position: absolute;
  height: 40px;
  right: 0;
  width: 35px;

  ${({ isSucces, isSavedByBurn }) =>
    isSucces
      ? `
        background-image: url('${ChallengeSuccededIcon.src}');`
      : `
        background-image: url('${
          isSavedByBurn ? ChallengeBurnedIcon.src : ChallengeFailedIcon.src
        }');
      `}
`;
