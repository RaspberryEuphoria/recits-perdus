import D20Icon from '@/public/images/icons/d20.svg';
import { getFullName } from '@/utils/character/helpers';
import { TextColor } from '@/utils/constants';
import { formatPostContent } from '@/utils/scenario/helpers';
import { Character } from '@/utils/types/character';

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

  if (!character) {
    return (
      <Styled.DialogPost>
        <span dangerouslySetInnerHTML={{ __html: content }} />
      </Styled.DialogPost>
    );
  }

  const textColor = isGameMaster ? TextColor.GameMaster : character.textColor;

  const dice = {
    difficulty: 15,
    value: 11,
    skill: {
      name: 'Athlétisme',
      value: 5,
    },
    get total() {
      return this.value + this.skill.value;
    },
    get result() {
      return this.total >= this.difficulty ? 'success' : 'failure';
    },
  };

  return (
    <Styled.DialogPost onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Styled.DialogInfos>
        <Styled.DialogAvatar
          src={
            isGameMaster
              ? '/images/avatars/gamemaster-1.jpg'
              : `/images/users/avatars/${character.avatar}`
          }
          alt="bloblo"
          width={200}
          height={230}
          color={textColor}
        />
        <Styled.DialogPostAuthor color={textColor}>
          {isGameMaster ? 'Maître du jeu' : getFullName(character)}
        </Styled.DialogPostAuthor>
      </Styled.DialogInfos>
      <Styled.DialogPostContent
        dangerouslySetInnerHTML={{ __html: formatPostContent(content) }}
        color={textColor}
      />
      <Styled.Dice variant={dice.result}>
        <Styled.DiceSkill>
          {dice.skill.name} (+{dice.skill.value})
        </Styled.DiceSkill>
        <Styled.DiceValue>
          <span>{getFullName(character)} lance un dé :</span>
          <Styled.D20>
            <D20Icon /> {dice.value}
          </Styled.D20>
        </Styled.DiceValue>
        <Styled.DiceResult>
          = {dice.total}, {dice.result === 'success' ? 'réussite' : 'échec'}
        </Styled.DiceResult>
      </Styled.Dice>
    </Styled.DialogPost>
  );
}
