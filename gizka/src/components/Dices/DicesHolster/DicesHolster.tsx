import { DataDices } from '@/pages/api/dices';

import { PlayDice } from '../PlayDice/PlayDice';
import * as Styled from './styled';

type DicesHolsterProps = {
  dices: DataDices;
  isActive?: boolean;
};

export function DicesHolster({ dices, isActive = false }: DicesHolsterProps) {
  return (
    <Styled.Holster isActive={isActive}>
      {dices.map((dice, i) => (
        <PlayDice key={i} {...dice} isActive={isActive} isDraggable />
      ))}
    </Styled.Holster>
  );
}
