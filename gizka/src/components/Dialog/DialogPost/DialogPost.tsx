import { MoveOutcome } from '@/components/Moves/MoveOutcome';
import PencilIcon from '@/public/images/icons/pencil.svg';
import { getFullName } from '@/utils/character/helpers';
import { formatPostContent } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';
import { Move } from '@/utils/types/scenario';

import * as Styled from './styled';

type DialogPostProps = {
  id: number;
  character?: Character;
  characters: Record<string, Character>;
  content: string;
  illustration?: string;
  moves?: Array<Move>;
  isEditable: boolean;
  handlePostEdit?: (post: { id: number; content: string }) => void;
};

export function DialogPost({
  id,
  character,
  characters,
  content,
  illustration,
  moves,
  isEditable,
  handlePostEdit,
}: DialogPostProps) {
  if (!character) {
    return (
      <Styled.DialogPost id={`message-${id}`}>
        <span dangerouslySetInnerHTML={{ __html: content }} />
      </Styled.DialogPost>
    );
  }

  const textColor = character.textColor;
  const characterName = getFullName(character);

  return (
    <Styled.DialogPost id={`message-${id}`}>
      <Styled.DialogInfos>
        <Styled.DialogAvatar
          src={`${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/users/avatars/${character.avatar}`}
          alt="[Avatar manquant]"
          width={200}
          height={230}
          color={textColor}
        />
        <Styled.CharacterName color={character.textColor}>
          <Styled.DialogPostAuthor>
            {characterName}{' '}
            {isEditable && (
              <PencilIcon onClick={() => handlePostEdit && handlePostEdit({ id, content })} />
            )}
          </Styled.DialogPostAuthor>
        </Styled.CharacterName>
      </Styled.DialogInfos>
      <Styled.DialogPostContent
        dangerouslySetInnerHTML={{ __html: formatPostContent(content) }}
        color={textColor}
      />
      {illustration && (
        <Styled.DialogIllustrationContainer>
          <Styled.DialogIllustration
            src={`${process.env.NEXT_PUBLIC_IMAGES_PREFIX_URL}/posts/illustrations/${illustration}`}
            alt=""
            width={680}
            height={230}
            color={textColor}
            quality={100}
          />
        </Styled.DialogIllustrationContainer>
      )}
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
    <Styled.DialogMove result={move.moveResult}>
      <MoveOutcome move={move} character={character} characters={characters} />
    </Styled.DialogMove>
  );
}
