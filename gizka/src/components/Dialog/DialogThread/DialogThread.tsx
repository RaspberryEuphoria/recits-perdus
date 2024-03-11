import { useRef } from 'react';

import DownArrowIcon from '@/public/images/icons/down_arrow.svg';
import { Character } from '@/utils/types/character';
import { Post } from '@/utils/types/scenario';

import { DialogPost } from '../DialogPost';
import * as Styled from './styled';

type DialogThreadProps = {
  dialogs: Post[];
  introductionText: string;
  nextPoster: Character;
  isItMyTurn: boolean;
  characters: Record<string, Character>;
  openTextarea: () => void;
};

export function DialogThread({
  introductionText,
  isItMyTurn,
  characters,
  openTextarea,
  nextPoster,
  dialogs,
}: DialogThreadProps) {
  const threadRef = useRef<HTMLDivElement>(null);

  const placeholder = isItMyTurn
    ? "C'est à vous de jouer"
    : `C'est au tour de ${nextPoster.firstName} ${nextPoster.lastName}`;

  const scrollToBottom = () => {
    if (threadRef.current) threadRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  return (
    <Styled.Wrapper>
      <Styled.DialogThread ref={threadRef}>
        <DialogPost content={introductionText} characters={characters} />
        {dialogs.map((dialog) => (
          <DialogPost
            key={dialog.id}
            {...dialog}
            character={characters[dialog.characterId]}
            characters={characters}
          />
        ))}
      </Styled.DialogThread>

      <Styled.Footer>
        <Styled.SmallTextarea onClick={openTextarea} isDisabled={!isItMyTurn}>
          {placeholder}
        </Styled.SmallTextarea>
        <Styled.ArrowButton onClick={scrollToBottom}>
          <DownArrowIcon />
        </Styled.ArrowButton>
      </Styled.Footer>
    </Styled.Wrapper>
  );
}
