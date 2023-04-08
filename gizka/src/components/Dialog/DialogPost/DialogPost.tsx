import { TextColor } from '@/utils/constants';
import { Character } from '@/utils/types/character';

import styles from './DialogPost.module.css';
import * as Styled from './styled';

type DialogPostProps = {
  character?: Character;
  content: string;
  isGameMaster?: boolean;
  onMouseEnter?: (character: Character) => void;
  onMouseLeave?: (character: Character) => void;
};

export function DialogPost({
  character,
  content,
  isGameMaster,
  onMouseEnter,
  onMouseLeave,
}: DialogPostProps) {
  const handleMouseEnter = () => {
    if (onMouseEnter && character) {
      onMouseEnter(character);
    }
  };

  const handleMouseLeave = () => {
    if (onMouseLeave && character) {
      onMouseLeave(character);
    }
  };

  return (
    <Styled.DialogPost onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {character && (
        <span
          className={styles.author}
          style={{ color: isGameMaster ? TextColor.GameMaster : character.textColor }}
        >
          {isGameMaster ? 'Maître du jeu' : character.name}
        </span>
      )}
      <span dangerouslySetInnerHTML={{ __html: content }} />
    </Styled.DialogPost>
  );
}
