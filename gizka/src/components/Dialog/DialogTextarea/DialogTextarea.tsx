import { PlayDice } from '@/components/Dices/PlayDice';
import { DicesHolster } from '@/components/Dices/DicesHolster';
import { DataDices, Dice } from '@/pages/api/dices';
import { DragItemsTypes } from '@/utils/constants';
import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import * as Styled from './styled';
import { Button } from '@/components/DesignSystem/Button';
import { Character } from '@/utils/types/character';

const MAX_LENGTH = 500;

type DialogTextareaProps = {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handlePost: () => void;
  innerRef: React.RefObject<HTMLTextAreaElement>;
  value?: string;
  dices: DataDices;
  nextPoster: Character;
  currentUserId: number;
};

export function DialogTextarea({
  handleChange,
  handlePost,
  innerRef,
  value,
  dices,
  nextPoster,
  currentUserId,
}: DialogTextareaProps) {
  const isItMyTurn = currentUserId === nextPoster.userId;
  const maskRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDice, setActiveDice] = useState<Dice | null>();
  const [isDiceDragged, setIsDiceDragged] = useState(false);
  const [, drop] = useDrop(() => ({
    accept: DragItemsTypes.DICE,
    collect: (monitor) => {
      if (monitor.canDrop()) {
        setIsDiceDragged(true);
      } else {
        setIsDiceDragged(false);
      }
    },
    drop: (dice: Dice) => {
      setActiveDice(dice);
      setIsDiceDragged(false);
    },
  }));
  const currentLength = value?.length || 0;

  const openTextarea = () => {
    isItMyTurn && setIsOpen(true);
  };

  const closeTextarea = () => {
    setIsOpen(false);
    setActiveDice(null);
    // scroll to bottom, somehow
  };

  const handleMaskClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === maskRef.current) {
      closeTextarea();
    }
  };

  const handleButtonClick = () => {
    handlePost();
    closeTextarea();
  };

  useEffect(() => {
    if (isOpen) {
      innerRef.current?.focus();
      innerRef.current?.setSelectionRange(
        innerRef.current?.value.length,
        innerRef.current?.value.length,
      );
    }
  }, [innerRef, isOpen]);

  if (!isOpen) {
    return (
      <Styled.Textarea
        placeholder={
          isItMyTurn ? "🖮 C'est à vous de répondre" : `🖮 C'est à ${nextPoster.name} de répondre`
        }
        onChange={handleChange}
        onClick={openTextarea}
        ref={innerRef}
        isOpen={isOpen}
        value={value}
        disabled={!isItMyTurn}
      ></Styled.Textarea>
    );
  }

  return (
    <>
      <Styled.Mask onClick={handleMaskClick} ref={maskRef}>
        {<DicesHolster isActive dices={dices} />}
        <Styled.GameSection>
          <Styled.Slots>
            {activeDice && (
              <Styled.Slot isActive={!!activeDice}>
                <div>Xoxo</div>
              </Styled.Slot>
            )}
            <Styled.Slot ref={drop} isActive={!!activeDice} isDiceDragged={isDiceDragged}>
              <PlayDice isActive isDraggable={false} value={activeDice?.value || ''} />
            </Styled.Slot>
          </Styled.Slots>
          <Styled.Textarea
            placeholder=""
            onChange={handleChange}
            onClick={openTextarea}
            ref={innerRef}
            isOpen={isOpen}
            value={value}
          ></Styled.Textarea>
          <Styled.TextareaBar>
            <Button onClick={handleButtonClick}>Envoyer</Button>
            {currentLength > 0 && (
              <Styled.Counter isOverLimit={currentLength === MAX_LENGTH}>
                {currentLength}/{MAX_LENGTH}
              </Styled.Counter>
            )}
          </Styled.TextareaBar>
        </Styled.GameSection>
      </Styled.Mask>
    </>
  );
}
