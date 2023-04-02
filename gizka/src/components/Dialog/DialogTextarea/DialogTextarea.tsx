import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/DesignSystem/Button';
import { Character } from '@/utils/types/character';

import * as Styled from './styled';

const MAX_LENGTH = 500;

type DialogTextareaProps = {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handlePost: () => void;
  innerRef: React.RefObject<HTMLTextAreaElement>;
  value?: string;
  nextPoster: Character;
  currentUserId: number;
};

export function DialogTextarea({
  handleChange,
  handlePost,
  innerRef,
  value,
  nextPoster,
  currentUserId,
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
        <Styled.GameSection>
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
