import styled from 'styled-components';

import StarMap from '@/public/images/background_starmap.png';
import { MoveResult as MoveRes } from '@/utils/types/scenario';

export const Container = styled.div<{ result: MoveRes }>`
  background: var(--secondary);
  border-radius: var(--rounded);
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  padding: var(--space-1);

  ${({ result }) => {
    switch (result) {
      case MoveRes.SUCCESS:
        return `
          box-shadow: 0 0 10px var(--success), inset 0 0 10px var(--success);
          border: 1px solid var(--success);
        `;
      case MoveRes.MIXED:
        return `
          box-shadow: 0 0 10px var(--mixed), inset 0 0 10px var(--mixed);
          border: 1px solid var(--mixed);
        `;
      case MoveRes.FAILURE:
        return `
          box-shadow: 0 0 10px var(--failure), inset 0 0 10px var(--failure);
          border: 1px solid var(--failure);
        `;
      default:
        return '';
    }
  }}
`;

export const MoveOutcome = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  font-size: 1.2rem;
  position: relative;
`;

export const MoveTitle = styled.p`
  text-align: right;
`;

export const DiceLabel = styled.span`
  color: var(--move);
  font-family: 'Exo 2';
  font-style: italic;
  font-weight: bold;
  text-transform: uppercase;
`;

export const MoveDices = styled.div`
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
  }
`;

export const DiceName = styled.span``;

export const MoveResult = styled.div`
  align-items: center;
  display: flex;
  gap: var(--space-05);
`;

export const ChallengeDices = styled.div`
  display: flex;
  gap: var(--space-05);
`;

export const VersusLabel = styled.span`
  color: var(--flashy);
  margin: 0 var(--space-1);
  font-family: 'Exo 2';
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
`;

export const MoveScore = styled.div<{ color: string }>`
  align-items: center;
  border: 3px dashed ${(props) => props.color};
  border-radius: 1rem;
  color: ${(props) => props.color};
  display: flex;
  font-family: 'Philosopher';
  font-size: 2rem;
  font-weight: bold;
  height: 55px;
  justify-content: center;
  width: 55px;
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

export const CharacterName = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: bold;
`;

export const Move = styled.span`
  color: var(--move);
  font-style: italic;
  text-shadow: var(--shadow);
`;
