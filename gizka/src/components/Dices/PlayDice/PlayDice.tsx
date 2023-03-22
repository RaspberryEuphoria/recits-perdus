import { DragItemsTypes } from '@/utils/constants';
import Image from 'next/image';
import { useDrag } from 'react-dnd';

import * as Styled from './styled';

type DicesHolsterProps = {
  value: number | string;
  isActive: boolean;
  isDraggable: boolean;
};

const DiceStyle = '01';

export function PlayDice({ value, isActive, isDraggable }: DicesHolsterProps) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: DragItemsTypes.DICE,
      item: { value },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  );

  if (!isDraggable) {
    return (
      <Styled.Dice isActive={isActive} isDraggable={false}>
        <div>
          <Image
            src={`/images/dices/Style_${DiceStyle}/D${value}_x1.png`}
            alt={`Valeur du dé : ${value}`}
            width="48"
            height="48"
          />
        </div>
      </Styled.Dice>
    );
  }

  return (
    <Styled.Dice
      ref={dragRef}
      isActive={isActive}
      isDraggable={isDraggable}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div>
        <Image
          src={`/images/dices/Style_${DiceStyle}/D${value}_x1.png`}
          alt={`Valeur du dé : ${value}`}
          width="48"
          height="48"
        />
      </div>
    </Styled.Dice>
  );
}
