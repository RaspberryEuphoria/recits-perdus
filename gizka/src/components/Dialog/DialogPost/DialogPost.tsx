import { MoveOutcome } from '@/components/Moves/MoveOutcome';
import { getFullName } from '@/utils/character/helpers';
import { formatPostContent } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';
import { Move } from '@/utils/types/scenario';

import * as Styled from './styled';

type DialogPostProps = {
  character?: Character;
  characters: Record<string, Character>;
  content: string;
  moves?: Array<Move>;
  onMouseEnter?: (character: Character) => void;
  onMouseLeave?: (character: Character) => void;
};

export function DialogPost({
  character,
  characters,
  content,
  moves,
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

  if (!character) {
    return (
      <Styled.DialogPost>
        <span dangerouslySetInnerHTML={{ __html: content }} />
      </Styled.DialogPost>
    );
  }

  const textColor = character.textColor;
  const characterName = getFullName(character);

  return (
    <Styled.DialogPost onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Styled.DialogInfos>
        <Styled.DialogAvatar
          src={`${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/users/avatars/${character.avatar}`}
          alt="[Avatar manquant]"
          width={200}
          height={230}
          color={textColor}
        />
        <Styled.CharacterName color={character.textColor}>
          <Styled.DialogPostAuthor>{characterName}</Styled.DialogPostAuthor>
        </Styled.CharacterName>
      </Styled.DialogInfos>
      <Styled.DialogPostContent
        dangerouslySetInnerHTML={{ __html: formatPostContent(content) }}
        color={textColor}
      />
      {moves &&
        moves.map((move) => (
          <DialogMove key={move.id} character={character} characters={characters} move={move} />
        ))}
    </Styled.DialogPost>
  );
}

type DialogMoveProps = {
  character: Character;
  characters: Record<string, Character>;
  move: Move;
};

function DialogMove({ character, characters, move }: DialogMoveProps) {
  return (
    <Styled.DialogMove>
      <MoveOutcome move={move} character={character} characters={characters} />
    </Styled.DialogMove>
  );
}
