import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/DesignSystem/Button';
import { Moves } from '@/components/Moves';
import { Character } from '@/utils/types/character';

import * as Styled from './styled';

const MAX_LENGTH = 500;

type DialogTextareaProps = {
  handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleMoveChange: (move: Move | null) => void;
  handlePost: () => void;
  innerRef: React.RefObject<HTMLTextAreaElement>;
  value?: string;
  nextPoster: Character;
  currentUserId: number;
  asGameMaster: boolean;
  move: Move | null;
};

export type Move = {
  id: string;
  meta?: Record<string, any>;
};

export function DialogTextarea({
  handleTextareaChange,
  handleMoveChange,
  handlePost,
  innerRef,
  value,
  nextPoster,
  currentUserId,
  asGameMaster,
  move,
}: DialogTextareaProps) {
  const isItMyTurn = currentUserId === nextPoster.userId;
  const maskRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const currentLength = value?.length || 0;

  const openTextarea = () => {
    isItMyTurn && setIsOpen(true);
  };

  const closeTextarea = () => {
    setIsOpen(false);
    // @todo scroll to bottom, somehow
  };

  const handleMaskClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === maskRef.current) {
      closeTextarea();
    }
  };

  const submit = () => {
    handlePost();
    closeTextarea();
  };

  const onMovePicked = (move: Move | null) => {
    handleMoveChange(move);
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
    const gameMasterPlaceholder = isItMyTurn
      ? "🖮 C'est à vous d'être Maître du Jeu"
      : `🖮 C'est à ${nextPoster.firstName} ${nextPoster.lastName} d'être Maître du Jeu`;
    const playerPlaceholder = isItMyTurn
      ? "🖮 C'est à vous de répondre"
      : `🖮 C'est à ${nextPoster.firstName} ${nextPoster.lastName} de répondre`;

    return (
      <Styled.Textarea
        placeholder={asGameMaster ? gameMasterPlaceholder : playerPlaceholder}
        onChange={handleTextareaChange}
        onClick={openTextarea}
        ref={innerRef}
        isOpen={isOpen}
        value={value}
        disabled={!isItMyTurn}
      ></Styled.Textarea>
    );
  }

  const isMoveValid = move ? move?.meta?.isValid : true;
  const hasText = value;
  const isFormDisabled = !isMoveValid || !hasText || currentLength > MAX_LENGTH;

  return (
    <>
      <Styled.Mask onClick={handleMaskClick} ref={maskRef}>
        <Styled.GameSection>
          {asGameMaster && <Styled.Help>Maître du Jeu</Styled.Help>}

          <Styled.Help>
            1. Décrivez votre réaction aux derniers évènements, puis votre prochaine action.
            <p>
              Utilisez des &quot;guillemets&quot; pour vos dialogues, et des *astérisques* pour les
              PNJs.
            </p>
          </Styled.Help>

          <Styled.Textarea
            placeholder=""
            onChange={handleTextareaChange}
            onClick={openTextarea}
            ref={innerRef}
            isOpen={isOpen}
            value={value}
          ></Styled.Textarea>

          <Styled.Help>
            2. <em>(Optionnel)</em> Choisissez une Tactique afin de progresser dans le scénario.
          </Styled.Help>

          <Moves onMovePicked={onMovePicked} />

          <Styled.Help>
            3. Envoyez votre message et résolvez votre Tactique éventuelle. Que la Force vous !
          </Styled.Help>

          <Styled.TextareaBar>
            <Button onClick={submit} disabled={isFormDisabled}>
              C&apos;est parti !
            </Button>
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
