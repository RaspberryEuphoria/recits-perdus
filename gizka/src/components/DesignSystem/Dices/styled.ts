import styled from 'styled-components';

import StarMap from '@/public/images/background_starmap.png';

export const DiceLabel = styled.span`
  color: var(--move);
  font-family: 'Exo 2';
  font-style: italic;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Dices = styled.div`
  align-items: center;
  border-radius: var(--rounded);
  border: 1px solid var(--dark-05);
  display: flex;
  justify-content: center;
  gap: var(--space-05);
  padding: var(--space-05) 0;
  position: relative;

  &::after {
    background: url(${StarMap.src}) center center / cover no-repeat;
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    pointer-events: none;
    z-index: 0;
  }
`;

export const ChallengeDices = styled.div`
  display: flex;
  gap: var(--space-05);
  z-index: 10;
`;

export const VersusLabel = styled.span`
  color: var(--flashy);
  margin: 0 var(--space-1);
  font-family: 'Exo 2';
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Score = styled.div<{ color: string }>`
  align-items: center;
  background: #dbe4f1;
  border: 3px solid var(--dark);
  border-radius: 10px;
  color: var(--dark);
  display: flex;
  font-family: 'Philosopher';
  font-size: 2rem;
  font-weight: bold;
  height: 55px;
  justify-content: center;
  position: relative;
  width: 55px;
  z-index: 10;

  &::after {
    background: #bbc0c7;
    bottom: -5px;
    border-radius: 0 0 10px 10px;
    border: 3px solid var(--dark);
    border-top: 2px solid var(--dark);
    content: '';
    display: block;
    height: 5px;
    left: -3px;
    position: absolute;
    width: 100%;
  }
`;

export const DestinyScore = styled.span`
  top: 0;
  right: 0;
  color: var(--malus);
  font-family: 'Philosopher';
  font-weight: bold;
  height: 65px;
  position: absolute;
  height: auto;
`;
